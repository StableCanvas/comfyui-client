const deepClone: <T>(obj: T) => T = globalThis.structuredClone
  ? globalThis.structuredClone
  : (x) => JSON.parse(JSON.stringify(x));

type NodeOutput = [string, number];

type WorkFlowPromptNode = {
  class_type: string;
  inputs: Record<string, any>;
};

type Workflow = {
  prompt: WorkFlowPromptNode[];

  // TODO
  workflow?: {
    nodes: [];
    links: [];
    groups: [];
    config: {};
    extra: {};
    version: 0.4;
  };
};

export class ComfyUIWorkflow {
  private _workflow: Workflow = {
    prompt: [],
  };

  public classes = this._createClassesProxy();

  private _createClassesProxy() {
    const source = {} as Record<
      string,
      (inputs: Record<string, any>) => NodeOutput[]
    >;
    return new Proxy(source, {
      get: (target, p, receiver) => {
        return (inputs: Record<string, any>) => {
          const node: WorkFlowPromptNode = {
            class_type: p.toString(),
            inputs,
          };
          this._workflow.prompt.push(node);
          const id = this._workflow.prompt.length - 1;
          return Array.from({ length: 10 }, (_, i) => {
            return [id.toString(), i];
          });
        };
      },
    });
  }

  /**
   * Resets the workflow by clearing the prompt and setting the workflow to undefined.
   */
  public reset() {
    this._workflow.prompt = [];
    this._workflow.workflow = undefined;
  }

  /**
   * Returns the current workflow object.
   *
   * @return {Workflow} The current workflow object.
   */
  public end() {
    return deepClone(this._workflow);
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
