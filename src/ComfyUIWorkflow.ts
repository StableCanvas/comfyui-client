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
  const workflow1 = new ComfyUIWorkflow();
  const {
    CLIPTextEncode,
    CheckpointLoaderSimple,
    EmptyLatentImage,
    KSampler,
    SaveImage,
    VAEDecode,
  } = workflow1.classes;

  const [model, clip, vae] = CheckpointLoaderSimple({
    ckpt_name: "v1-5-pruned-emaonly.ckpt",
  });
  const [conditioning] = CLIPTextEncode({
    text: "beautiful scenery nature glass bottle landscape, , purple galaxy bottle,",
    clip,
  });
  const [conditioning2] = CLIPTextEncode({
    text: "text, watermark",
    clip,
  });
  let [latent] = EmptyLatentImage({
    width: 512,
    height: 512,
    batch_size: 1,
  });
  [latent] = KSampler({
    model,
    seed: 156680208700286,
    steps: 20,
    cfg: 8,
    sampler_name: "euler",
    scheduler: "normal",
    positive: conditioning,
    negative: conditioning2,
    latent,
    denoise: 1,
  });
  const [image] = VAEDecode({ latent, vae });
  SaveImage({
    images: image,
    filename_prefix: "ComfyUI",
  });
  const workflow = workflow1.end();
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

// #usage case:
// const main = () => {
//   const workflow1 = new ComfyUIWorkflow();
//   const {
//     CLIPTextEncode,
//     CheckpointLoaderSimple,
//     EmptyLatentImage,
//     KSampler,
//     SaveImage,
//     VAEDecode,
//     AnythingNode,
//   } = workflow1.classes;

//   // const [output1] = AnythingNode({
//   //   hello: "x",
//   // });
//   const [model, clip, vae] = CheckpointLoaderSimple({
//     ckpt_name: "v1-5-pruned-emaonly.ckpt",
//   });
//   const [conditioning] = CLIPTextEncode({
//     text: "beautiful scenery nature glass bottle landscape, , purple galaxy bottle,",
//     clip,
//   });
//   const [conditioning2] = CLIPTextEncode({
//     text: "text, watermark",
//     clip,
//   });
//   let [latent_image] = EmptyLatentImage({
//     width: 512,
//     height: 512,
//     batch_size: 1,
//   });
//   let [samples] = KSampler({
//     model,
//     seed: 156680208700286,
//     steps: 20,
//     cfg: 8,
//     sampler_name: "euler",
//     scheduler: "normal",
//     positive: conditioning,
//     negative: conditioning2,
//     latent_image,
//     denoise: 1,
//   });
//   const [image] = VAEDecode({ samples, vae });
//   SaveImage({
//     images: image,
//     filename_prefix: "ComfyUI",
//   });

//   const workflow = workflow1.end();
//   console.log(workflow);
// };
