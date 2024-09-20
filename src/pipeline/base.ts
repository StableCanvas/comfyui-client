import EventEmitter from "eventemitter3";
import { Client } from "../client/Client";
import { Workflow } from "../workflow/Workflow";
import { WorkflowOutput } from "../workflow/types";
import { NSPipeline } from "./types";
import { ComfyUIClientEvents } from "../client/ws.types";
import { Disposable } from "../utils/Disposable";
import { InvokedWorkflow } from "../workflow/InvokedWorkflow";

type PipeContext = NSPipeline.PipeContext;

/**
 * pipe to create a workflow
 */
export class BasePipe<
  CTX extends PipeContext = PipeContext,
> extends Disposable {
  static nextSeed() {
    return Math.floor(Math.random() * 2 ** 32);
  }
  static defaultContext: PipeContext = {
    seed: BasePipe.nextSeed(),
    steps: 35,
    cfg: 4,
    sampler_name: "dpmpp_2m_sde_gpu",
    scheduler: "karras",
    denoise: 1,
    width: 512,
    height: 512,
    batch_size: 1,
    ckpt_name: "",

    input_image: null,
    input_mask: null,
    grow_mask_by: 6,

    positive: "",
    negative: "",

    client: null,
  };
  protected context: CTX;
  protected _workflow = new Workflow();
  protected _invoked?: Promise<InvokedWorkflow>;

  constructor(context?: Partial<CTX>) {
    super();
    this.context = {
      ...BasePipe.defaultContext,
      ...context,
    } as CTX;
  }

  protected update(ctx: Record<string, any>) {
    Object.assign(this.context, ctx);
  }

  image(image: Buffer) {
    this.update({
      input_image: image,
    });
    return this;
  }

  mask(image: Buffer) {
    this.update({
      input_mask: image,
    });
    return this;
  }

  model(ckpt_name: string) {
    this.update({
      ckpt_name,
    });
    return this;
  }

  size(w: number, h: number) {
    this.update({
      width: w,
      height: h,
    });
    return this;
  }

  prompt(text: string) {
    this.update({
      positive: text,
    });
    return this;
  }

  negative(text: string) {
    this.update({
      negative: text,
    });
    return this;
  }

  steps(steps: number) {
    this.update({
      steps,
    });
    return this;
  }

  cfg(cfg: number) {
    this.update({
      cfg,
    });
    return this;
  }

  seed(seed = BasePipe.nextSeed()) {
    this.update({
      seed,
    });
    return this;
  }

  denoise(denoise: number) {
    this.update({
      denoise,
    });
    return this;
  }

  scheduler(scheduler: PipeContext["scheduler"]) {
    this.update({
      scheduler,
    });
    return this;
  }

  sampler(sampler_name: PipeContext["sampler_name"]) {
    this.update({
      sampler_name,
    });
    return this;
  }

  batch_size(batch_size: number) {
    this.update({
      batch_size,
    });
    return this;
  }

  with(client: Client) {
    this.update({
      client,
    });
    return this;
  }

  /**
   * Adds an event listener for the specified event type.
   */
  on<T extends EventEmitter.EventNames<ComfyUIClientEvents>>(
    type: T,
    callback: EventEmitter.EventListener<ComfyUIClientEvents, T>,
    options?: any,
  ) {
    const { _invoked: invoked } = this;
    if (!invoked) {
      throw new Error("workflow not invoked");
    }
    invoked.then((instance) => {
      instance.on(type, callback, options);
    });
    return this;
  }

  /**
   * Adds an once event listener for the specified event type.
   */
  once<T extends EventEmitter.EventNames<ComfyUIClientEvents>>(
    type: T,
    callback: EventEmitter.EventListener<ComfyUIClientEvents, T>,
    options?: any,
  ) {
    const { _invoked: invoked } = this;
    if (!invoked) {
      throw new Error("workflow not invoked");
    }
    invoked.then((instance) => {
      instance.once(type, callback, options);
    });
    return this;
  }

  protected build_latent(vae: any) {
    const { context, _workflow: workflow } = this;
    const cls = workflow.classes;
    const { width, height, batch_size } = context;
    const { input_image, input_mask, grow_mask_by } = this.context;
    if (!input_image) {
      return cls.EmptyLatentImage({
        width,
        height,
        batch_size,
      })[0];
    }
    const pixels = cls.ETN_LoadImageBase64({
      image: input_image.toString("base64"),
    })[0];
    if (!input_mask) {
      return cls.VAEEncode({
        pixels,
        vae,
      })[0];
    }
    const mask = cls.ETN_LoadMaskBase64({
      mask: input_mask.toString("base64"),
    })[0];
    return cls.VAEEncodeForInpaint({
      pixels,
      vae,
      mask,
      grow_mask_by,
    })[0];
  }

  protected build() {
    const { context, _workflow: workflow } = this;
    const cls = workflow.classes;
    const {
      seed,
      steps,
      cfg,
      scheduler,
      denoise,
      ckpt_name,
      positive,
      negative,
      sampler_name,
    } = context;
    const [model, clip, vae] = cls.CheckpointLoaderSimple({
      ckpt_name,
    });
    const enc = (text: string) => cls.CLIPTextEncode({ text, clip })[0];
    const [samples] = cls.KSampler({
      seed,
      steps,
      cfg,
      sampler_name,
      scheduler,
      denoise,
      model,
      positive: enc(positive),
      negative: enc(negative),
      latent_image: this.build_latent(vae),
    });

    return { samples, vae, cls };
  }

  protected _save(filename_prefix?: string) {
    const { samples, vae, cls } = this.build();

    const images = cls.VAEDecode({ samples, vae })[0];
    if (filename_prefix) {
      cls.SaveImage({
        filename_prefix,
        images,
      });
    } else {
      cls.SaveImageWebsocket({
        images,
      });
    }
  }

  async read_response(res: WorkflowOutput<unknown>) {
    const images = [] as {
      data: ArrayBuffer;
      mime: string;
    }[];
    for (const img of res.images) {
      switch (img.type) {
        case "buff": {
          images.push({
            data: img.data,
            mime: img.mime,
          });
          break;
        }
        case "url": {
          const { data: url } = img;
          const resp = await fetch(url);
          const mime = resp.headers.get("content-type") ?? "image/png";
          const blob = await resp.blob();
          images.push({
            data: await blob.arrayBuffer(),
            mime,
          });
          break;
        }
      }
    }
    return images;
  }

  save(filename_prefix?: string) {
    const {
      context: { client },
      _workflow: workflow,
    } = this;
    if (!client) {
      throw new Error("client is not defined");
    }
    this._save(filename_prefix);
    this._invoked = (async () => {
      const instance = workflow.instance(client);
      instance._connect(() => this.dispose());
      await instance.enqueue();
      return instance;
    })();
    return this;
  }

  async wait() {
    const { _invoked: invoked } = this;
    if (!invoked) {
      throw new Error("workflow not invoked");
    }
    const result = await (await invoked).wait();
    const images = await this.read_response(result);
    return {
      result,
      images,
    };
  }

  async wait_polling() {
    const { _invoked: invoked } = this;
    if (!invoked) {
      throw new Error("workflow not invoked");
    }
    const result = await (await invoked).wait_polling();
    const images = await this.read_response(result);
    return {
      result,
      images,
    };
  }
}
