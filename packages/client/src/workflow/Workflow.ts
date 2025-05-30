import { Client } from "../client/Client";
import { InvokedWorkflow } from "./InvokedWorkflow";
import { WorkflowOutputResolver } from "../client/types";
import { ComfyUINodeTypes } from "../schema/comfyui.node.types";
import { WorkflowOutput, WorkflowPromptNode } from "./types";
import { IWorkflow } from "./types";
import { ComfyUiWsTypes } from "../client/ws.types";

const deepClone: <T>(obj: T) => T = globalThis.structuredClone
  ? globalThis.structuredClone
  : (x) => JSON.parse(JSON.stringify(x));

export type NodeOutput = [string, number];

export type NodeClassInputs = Record<
  string,
  string | boolean | number | null | undefined | NodeOutput
>;

// { k: { [k:string]: unknown } } => { k: any }
type InputsFormat<T> = {
  [K in keyof T]: T[K] extends { [k: string]: unknown }
    ? NodeOutput
    : T[K] | NodeOutput;
};

export interface ComfyUINodeClass<
  INP extends NodeClassInputs = NodeClassInputs,
> {
  (inputs: INP): NodeOutput[];
}

export type BuiltinNodeClasses = {
  [K in keyof Required<ComfyUINodeTypes.NodeTypes>]: Required<
    Required<ComfyUINodeTypes.NodeTypes>[K]
  > extends {
    inputs: infer INP;
  }
    ? ComfyUINodeClass<InputsFormat<INP> & NodeClassInputs>
    : ComfyUINodeClass<NodeClassInputs>;
};

export type InvokeOptions<T> = {
  resolver?: WorkflowOutputResolver<T>;
  progress?: (p: ComfyUiWsTypes.Messages.Progress) => void;
  polling_ms?: number;
};

/**
 * A class for creating a workflow using a fluent API.
 *
 * @example
 * ```typescript
  const workflow = new Workflow();
  const {
    KSampler,
    CheckpointLoaderSimple,
    EmptyLatentImage,
    CLIPTextEncode,
    VAEDecode,
    SaveImage,
    NODE1,
  } = workflow.classes;

  const seed = Math.floor(Math.random() * 2 ** 32);
  const pos = "best quality, 1girl";
  const neg = "worst quality, bad anatomy, embedding:NG_DeepNegative_V1_75T";
  const model1_name = "lofi_v5.baked.fp16.safetensors";
  const model2_name = "case-h-beta.baked.fp16.safetensors";
  const sampler_settings = {
    seed,
    steps: 35,
    cfg: 4,
    sampler_name: "dpmpp_2m_sde_gpu",
    scheduler: "karras",
    denoise: 1,
  };

  const [model1, clip1, vae1] = CheckpointLoaderSimple({
    ckpt_name: model1_name,
  });
  const [model2, clip2, vae2] = CheckpointLoaderSimple({
    ckpt_name: model2_name,
  });

  const dress_case = [
    "white yoga",
    "black office",
    "pink sportswear",
    "cosplay",
  ];

  const generate_pipeline = (model, clip, vae, pos, neg) => {
    const [latent_image] = EmptyLatentImage({
      width: 640,
      height: 960,
      batch_size: 1,
    });
    const [positive] = CLIPTextEncode({ text: pos, clip });
    const [negative] = CLIPTextEncode({ text: neg, clip });
    const [samples] = KSampler({
      ...sampler_settings,
      model,
      positive,
      negative,
      latent_image,
    });
    const [image] = VAEDecode({ samples, vae });
    return image;
  };

  for (const cloth of dress_case) {
    const input_pos = `${pos}, ${cloth} dress`;
    const image = generate_pipeline(model1, clip1, vae1, input_pos, neg);
    SaveImage({
      images: image,
      filename_prefix: `${cloth}-lofi-v5`,
    });

    const input_pos2 = `${pos}, ${cloth} dress`;
    const image2 = generate_pipeline(model2, clip2, vae2, input_pos2, neg);
    SaveImage({
      images: image2,
      filename_prefix: `${cloth}-case-h-beta`,
    });
  }

  return workflow;
 * ```
 */
export class Workflow {
  protected _workflow: IWorkflow = {
    prompt: {},
  };
  protected _last_node_id = 0;

  public classes = this._createClassesProxy() as BuiltinNodeClasses &
    Record<string, ComfyUINodeClass>;

  protected _createClassesProxy() {
    const source = {};
    return new Proxy(source, {
      get: (target, p, receiver) => {
        if (p in target) {
          return (target as any)[p];
        }
        return (inputs: Record<string, any>) => {
          return this.node(p as any, inputs);
        };
      },
    });
  }

  public node<
    T extends keyof ComfyUINodeTypes.NodeTypes | (string & {}),
    C extends T extends keyof ComfyUINodeTypes.NodeTypes
      ? Required<Required<ComfyUINodeTypes.NodeTypes>[T]>
      : unknown,
  >(
    node_name: T,
    inputs: C extends { inputs: infer INP } ? INP : Record<string, unknown>,
  ): Iterable<NodeOutput>;
  public node(
    node_name: string,
    inputs: Record<string, unknown>,
  ): Iterable<NodeOutput> {
    const node: WorkflowPromptNode = {
      class_type: node_name,
      inputs,
    } as any;
    const id = (++this._last_node_id).toString();
    this._workflow.prompt[id] = node;

    function* outputs() {
      let i = 0;
      while (true) {
        yield [id, i++] as NodeOutput;
      }
    }

    const gen = outputs() as any;

    for (let index = 0; index < 24; index++) {
      gen[index] = [id, index] as NodeOutput;
    }

    return gen;
  }

  /**
   * Resets the workflow by clearing the prompt and setting the workflow to undefined.
   */
  public reset() {
    this._workflow.prompt = {};
    this._workflow.workflow = undefined;
    this._last_node_id = 0;
  }

  /**
   * Returns the current workflow object.
   *
   * @return {IWorkflow} The current workflow object.
   *
   * @deprecated use `workflow` instead
   */
  public end() {
    return this.workflow();
  }

  /**
   * Returns the current workflow object.
   *
   * @return {IWorkflow} The current workflow object.
   */
  public workflow() {
    return deepClone(this._workflow);
  }

  /**
   * Guard function to check if the client's WebSocket is connected before attempting to invoke the workflow.
   *
   * @throws {Error} If the WebSocket is not connected.
   *
   * @param {Client} client - The client to check.
   *
   * @private
   */
  protected _ws_connected_guard(client: Client) {
    if (!client.socket || client.socket.readyState !== client.WebSocket.OPEN) {
      const current_state = {
        [client.WebSocket.CLOSED]: "CLOSED",
        [client.WebSocket.CONNECTING]: "CONNECTING",
        [client.WebSocket.OPEN]: "OPEN",
        [client.WebSocket.CLOSING]: "CLOSING",
        [-1]: "UNKNOWN",
      }[client.socket?.readyState ?? -1];
      throw new Error(
        `WebSocket is not connected, cannot invoke workflow. readyState=${current_state}`,
      );
    }
  }

  /**
   * Invokes the workflow with the provided client and options.
   *
   * @param {Client} client - The client to use for the invocation.
   * @param {InvokeOptions<T>} [options] - Optional invoke options.
   * @return {Promise<WorkflowOutput<T>>} A promise resolving to the workflow output.
   */
  public invoke<T>(
    client: Client,
    options?: InvokeOptions<T>,
  ): Promise<WorkflowOutput<T>>;
  public invoke(
    client: Client,
    options?: InvokeOptions<unknown>,
  ): Promise<WorkflowOutput<unknown>>;
  public async invoke(
    client: Client,
    options?: InvokeOptions<unknown>,
  ): Promise<WorkflowOutput<unknown>> {
    this._ws_connected_guard(client);
    const invoked = this.instance(client, options);
    await invoked.enqueue();
    const result = invoked.wait();
    return result;
  }

  /**
   * Creates a new invoked workflow instance.
   *
   * @param {Client} client - The client used to run the prompt.
   * @param {InvokeOptions<T>} [options] - Optional invoke options.
   * @return {InvokedWorkflow<T>} The invoked workflow instance.
   */
  public instance<T>(
    client: Client,
    options?: InvokeOptions<T>,
  ): InvokedWorkflow<T>;
  public instance(
    client: Client,
    options?: InvokeOptions<unknown>,
  ): InvokedWorkflow;
  public instance(
    client: Client,
    options?: InvokeOptions<unknown>,
  ): InvokedWorkflow {
    const workflow = this.workflow();
    const invoked = new InvokedWorkflow({
      workflow,
      client,
      resolver: options?.resolver,
      progress: options?.progress,
    });
    return invoked;
  }

  /**
   * Invokes a workflow using the provided client with polling.
   *
   * @param {Client} client - The client used to run the prompt.
   * @param {InvokeOptions<T>} [options] - The options for invoking the workflow.
   * @return {Promise<WorkflowOutput<T>>} A promise that resolves with the result of the prompt.
   */
  public invoke_polling<T>(
    client: Client,
    options?: InvokeOptions<T>,
  ): Promise<WorkflowOutput<T>>;
  public invoke_polling(
    client: Client,
    options?: InvokeOptions<unknown>,
  ): Promise<WorkflowOutput>;
  public invoke_polling(client: Client, options?: InvokeOptions<unknown>) {
    if (typeof options?.progress === "function") {
      throw new Error("progress option is not supported in polling mode");
    }
    const { prompt, workflow } = this.workflow();
    return client.enqueue_polling(prompt, {
      workflow,
      resolver: options?.resolver,
      polling_ms: options?.polling_ms,
    });
  }
}
