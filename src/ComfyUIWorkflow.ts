import { ComfyUIApiClient } from "./ComfyUIApiClient";
import { ComfyUINodeTypes } from "./schema/comfyui.node.typs";

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

interface ComfyUINodeClass<INP extends NodeClassInputs = NodeClassInputs> {
  (inputs: INP): NodeOutput[];
}

// TODO type => class
// type BuiltinNodeClasses = {
//   [K in keyof ComfyUINodeTypes.NodeTypes]: ComfyUINodeClass<
//     NonNullable<NonNullable<ComfyUINodeTypes.NodeTypes[K]>["inputs"]>
//   >;
// };

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
    const source = {} as
      | Record<keyof ComfyUINodeTypes.NodeTypes, ComfyUINodeClass> &
          Record<string, ComfyUINodeClass>;
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
   * @return {Promise<any>} A promise that resolves with the result of the prompt.
   */
  public invoke(client: ComfyUIApiClient) {
    const { prompt, workflow } = this.end();
    return client.runPrompt(prompt, { workflow });
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
//   } = workflow1.classes;

//   // 这里输出的 model => ["1", 0] 表示是 第一个节点的第一个输出
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
//   let [latent] = EmptyLatentImage({
//     width: 512,
//     height: 512,
//     batch_size: 1,
//   });
//   [latent] = KSampler({
//     model,
//     seed: 156680208700286,
//     steps: 20,
//     cfg: 8,
//     sampler_name: "euler",
//     scheduler: "normal",
//     positive: conditioning,
//     negative: conditioning2,
//     latent,
//     denoise: 1,
//   });
//   const [image] = VAEDecode({ latent, vae });
//   SaveImage({
//     images: image,
//     filename_prefix: "ComfyUI",
//   });

//   const workflow = workflow1.end();
//   console.log(workflow);
// };
