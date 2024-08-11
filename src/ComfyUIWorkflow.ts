import { ComfyUIApiClient } from "./ComfyUIApiClient";
import { InvokedWorkflow } from "./InvokedWorkflow";
import { WorkflowOutputResolver } from "./client.types";
import { ComfyUINodeTypes } from "./schema/comfyui.node.typs";
import { WorkflowOutput, WorkflowPromptNode } from "./types";
import { IWorkflow } from "./types";

const deepClone: <T>(obj: T) => T = globalThis.structuredClone
  ? globalThis.structuredClone
  : (x) => JSON.parse(JSON.stringify(x));

type NodeOutput = [string, number];

type NodeClassInputs = Record<
  string,
  string | boolean | number | null | undefined | NodeOutput
>;

// { k: { [k:string]: unknown } } => { k: any }
type InputsFormat<T> = {
  [K in keyof T]: T[K] extends { [k: string]: unknown }
    ? NodeOutput
    : T[K] | NodeOutput;
};

interface ComfyUINodeClass<INP extends NodeClassInputs = NodeClassInputs> {
  (inputs: INP): NodeOutput[];
}

type BuiltinNodeClasses = {
  [K in keyof Required<ComfyUINodeTypes.NodeTypes>]: Required<
    Required<ComfyUINodeTypes.NodeTypes>[K]
  > extends {
    inputs: infer INP;
  }
    ? ComfyUINodeClass<InputsFormat<INP> & NodeClassInputs>
    : ComfyUINodeClass<NodeClassInputs>;
};

type InvokeOptions<T> = {
  resolver?: WorkflowOutputResolver<T>;
};

/**
 * A class for creating a workflow using a fluent API.
 * 
 * @example
 * ```typescript
  const workflow = new ComfyUIWorkflow();
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
export class ComfyUIWorkflow {
  protected _workflow: IWorkflow = {
    prompt: {},
  };
  protected _last_node_id = 0;

  public classes = this._createClassesProxy();

  protected _createClassesProxy() {
    const source = {} as BuiltinNodeClasses & Record<string, ComfyUINodeClass>;
    return new Proxy(source, {
      get: (target, p, receiver) => {
        if (p in target) {
          return (target as any)[p];
        }
        return (inputs: Record<string, any>) => {
          const node: WorkflowPromptNode = {
            class_type: p.toString(),
            inputs,
          };
          const id = (++this._last_node_id).toString();
          this._workflow.prompt[id] = node;
          return Array.from({ length: 10 }, (_, i) => {
            return [id, i];
          });
        };
      },
    });
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
   * A description of the entire function.
   *
   * @param {ComfyUIApiClient} client - description of parameter
   * @param {InvokeOptions<T>} [options] - description of parameter
   * @return {Promise<WorkflowOutput<T>>} description of return value
   */
  public invoke<T>(
    client: ComfyUIApiClient,
    options?: InvokeOptions<T>
  ): Promise<WorkflowOutput<T>>;
  public invoke(
    client: ComfyUIApiClient,
    options?: InvokeOptions<unknown>
  ): Promise<WorkflowOutput<unknown>>;
  public invoke(
    client: ComfyUIApiClient,
    options?: InvokeOptions<unknown>
  ): Promise<WorkflowOutput<unknown>> {
    const invoked = this.instance(client, options);
    invoked.enqueue();
    const result = invoked.wait();
    return result;
  }

  /**
   * Creates a new invoked workflow instance.
   *
   * @param {ComfyUIApiClient} client - The client used to run the prompt.
   * @param {InvokeOptions<T>} [options] - Optional invoke options.
   * @return {InvokedWorkflow<T>} The invoked workflow instance.
   */
  public instance<T>(
    client: ComfyUIApiClient,
    options?: InvokeOptions<T>
  ): InvokedWorkflow<T>;
  public instance(
    client: ComfyUIApiClient,
    options?: InvokeOptions<unknown>
  ): InvokedWorkflow;
  public instance(
    client: ComfyUIApiClient,
    options?: InvokeOptions<unknown>
  ): InvokedWorkflow {
    const workflow = this.workflow();
    const invoked = new InvokedWorkflow({
      workflow,
      client,
      resolver: options?.resolver,
    });
    return invoked;
  }

  /**
   * Invokes a workflow using the provided client with polling.
   *
   * @param {ComfyUIApiClient} client - The client used to run the prompt.
   * @param {InvokeOptions<T>} [options] - The options for invoking the workflow.
   * @return {Promise<WorkflowOutput<T>>} A promise that resolves with the result of the prompt.
   */
  public invoke_polling<T>(
    client: ComfyUIApiClient,
    options?: InvokeOptions<T>
  ): Promise<WorkflowOutput<T>>;
  public invoke_polling(
    client: ComfyUIApiClient,
    options?: InvokeOptions<unknown>
  ): Promise<WorkflowOutput>;
  public invoke_polling(
    client: ComfyUIApiClient,
    options?: InvokeOptions<unknown>
  ) {
    const { prompt, workflow } = this.workflow();
    return client.enqueue_polling(prompt, {
      workflow,
      resolver: options?.resolver,
    });
  }
}
