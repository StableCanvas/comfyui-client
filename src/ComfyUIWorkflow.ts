import { ComfyUIApiClient } from "./ComfyUIApiClient";
import { ComfyUINodeTypes } from "./schema/comfyui.node.typs";
import { WorkflowOutput } from "./types";

const deepClone: <T>(obj: T) => T = globalThis.structuredClone
  ? globalThis.structuredClone
  : (x) => JSON.parse(JSON.stringify(x));

type NodeOutput = [string, number];

type WorkflowPromptNode = {
  class_type: string;
  inputs: Record<string, any>;
};

interface IWorkflow {
  // id => node
  prompt: Record<string, WorkflowPromptNode>;

  // TODO
  workflow?: {
    nodes: [];
    links: [];
    groups: [];
    config: {};
    extra: {};
    version: 0.4;
  };
}

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
   */
  public end() {
    return deepClone(this._workflow);
  }

  /**
   * Invoke this workflow using the provided client.
   *
   * @param {ComfyUIApiClient} client - The client used to run the prompt.
   * @return {Promise<WorkflowOutput>} A promise that resolves with the result of the prompt.
   */
  public invoke(client: ComfyUIApiClient) {
    const { prompt, workflow } = this.end();
    const invoked = new InvokedWorkflow({ prompt, workflow }, client);
    const result = invoked.waitForCompletion();
    return result;
  }

  /**
   * Invokes the workflow using the provided client with polling.
   *
   * @param {ComfyUIApiClient} client - The client used to run the prompt.
   * @return {Promise<WorkflowOutput>} A promise that resolves with the result of the prompt.
   */
  public invoke_polling(client: ComfyUIApiClient) {
    const { prompt, workflow } = this.end();
    return client.enqueue_polling(prompt, { workflow });
  }
}

export class InvokedWorkflow {
  protected _task_id: Promise<string>;
  protected _enqueue_req: ReturnType<ComfyUIApiClient["_enqueue_prompt"]>;

  protected _result: WorkflowOutput = {
    images: [],
    prompt_id: "",
  };

  executed = false;

  constructor(public workflow: IWorkflow, public client: ComfyUIApiClient) {
    const { prompt, workflow: wf } = this.workflow;
    this._enqueue_req = this.client._enqueue_prompt(prompt, { workflow: wf });
    this._task_id = this._enqueue_req.then((data) => data.prompt_id);

    this._enqueue_req.then((data) => {
      this._result.prompt_id = data.prompt_id;
    });
  }

  protected load_result_data(data: any) {
    const { output: executed_output } = data;
    const { images = [] } = executed_output || {};

    // collect url images
    for (const image of images) {
      const { filename, subfolder, type } = image || {};
      if (!filename || !subfolder || type !== "output") {
        continue;
      }
      this._result.images.push({
        type: "url",
        data: this.client.viewURL(filename, subfolder, type),
      });
    }
  }

  public async waitForCompletion() {
    const task_id = await this._task_id;
    return new Promise<WorkflowOutput>((resolve, reject) => {
      const offEvent2 = this.client.on("image_data", (data) => {
        if (this.executed) {
          return;
        }
        this._result.images.push({
          type: "buff",
          data,
        });
      });
      const offEvent1 = this.client.on("executed", (data) => {
        if (data.prompt_id !== task_id) {
          return;
        }
        this.load_result_data(data);
        this.executed = true;
        resolve(this._result);
        offEvent1();
        offEvent2();
      });
    });
  }
}
