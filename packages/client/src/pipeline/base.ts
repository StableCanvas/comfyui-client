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
  /**
   * Generates a random seed value.
   *
   * @return {number} A random integer seed value between 0 and 2^32 - 1.
   */
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

  /**
   * Updates the context with the provided image buffer.
   *
   * @param {Buffer} image - The image buffer to update the context with.
   * @return {this} The current instance of the class for method chaining.
   */
  image(image: Buffer) {
    this.update({
      input_image: image,
    });
    return this;
  }

  /**
   * Updates the context with the provided mask buffer.
   *
   * @param {Buffer} image - The mask buffer to update the context with.
   * @return {this} The current instance of the class for method chaining.
   */
  mask(image: Buffer) {
    this.update({
      input_mask: image,
    });
    return this;
  }

  /**
   * Updates the context with the provided model checkpoint name.
   *
   * @param {string} ckpt_name - The name of the model checkpoint to update the context with.
   * @return {this} The current instance of the class for method chaining.
   */
  model(ckpt_name: string) {
    this.update({
      ckpt_name,
    });
    return this;
  }

  /**
   * Updates the context with the provided width and height, and returns the current instance of the class for method chaining.
   *
   * @param {number} w - The width to update the context with.
   * @param {number} h - The height to update the context with.
   * @return {this} The current instance of the class for method chaining.
   */
  size(w: number, h: number) {
    this.update({
      width: w,
      height: h,
    });
    return this;
  }

  /**
   * Updates the context with the provided text as the positive prompt.
   *
   * @param {string} text - The text to update the context with.
   * @return {this} The current instance of the class for method chaining.
   */
  prompt(text: string) {
    this.update({
      positive: text,
    });
    return this;
  }

  /**
   * Updates the context with the provided text as the negative prompt.
   *
   * @param {string} text - The text to update the context with.
   * @return {this} The current instance of the class for method chaining.
   */
  negative(text: string) {
    this.update({
      negative: text,
    });
    return this;
  }

  /**
   * Updates the context with the provided steps and returns the current instance of the class for method chaining.
   *
   * @param {number} steps - The number of steps to update the context with.
   * @return {this} The current instance of the class for method chaining.
   */
  steps(steps: number) {
    this.update({
      steps,
    });
    return this;
  }

  /**
   * Updates the context with the provided cfg value.
   *
   * @param {number} cfg - The cfg value to update the context with.
   * @return {this} The current instance of the class for method chaining.
   */
  cfg(cfg: number) {
    this.update({
      cfg,
    });
    return this;
  }

  /**
   * Updates the context with the provided seed value or generates a random seed value if none is provided.
   *
   * @param {number} [seed=BasePipe.nextSeed()] - The seed value to update the context with. If not provided, a random seed value will be generated.
   * @return {this} The current instance of the class for method chaining.
   */
  seed(seed = BasePipe.nextSeed()) {
    this.update({
      seed,
    });
    return this;
  }

  /**
   * Updates the context with the provided denoise value and returns the current instance of the class for method chaining.
   *
   * @param {number} denoise - The denoise value to update the context with.
   * @return {this} The current instance of the class for method chaining.
   */
  denoise(denoise: number) {
    this.update({
      denoise,
    });
    return this;
  }

  /**
   * Updates the context with the provided scheduler value and returns the current instance of the class for method chaining.
   *
   * @param {PipeContext["scheduler"]} scheduler - The scheduler value to update the context with.
   * @return {this} The current instance of the class for method chaining.
   */
  scheduler(scheduler: PipeContext["scheduler"]) {
    this.update({
      scheduler,
    });
    return this;
  }

  /**
   * Updates the context with the provided sampler name and returns the current instance of the class for method chaining.
   *
   * @param {PipeContext["sampler_name"]} sampler_name - The sampler name to update the context with.
   * @return {this} The current instance of the class for method chaining.
   */
  sampler(sampler_name: PipeContext["sampler_name"]) {
    this.update({
      sampler_name,
    });
    return this;
  }

  /**
   * Updates the context with the provided batch size and returns the current instance of the class for method chaining.
   *
   * @param {number} batch_size - The batch size to update the context with.
   * @return {this} The current instance of the class for method chaining.
   */
  batch_size(batch_size: number) {
    this.update({
      batch_size,
    });
    return this;
  }

  /**
   * Updates the context with the provided client and returns the current instance of the class for method chaining.
   *
   * @param {Client} client - The client to update the context with.
   * @return {this} The current instance of the class for method chaining.
   */
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

  protected async read_response(res: WorkflowOutput<unknown>) {
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

  /**
   * Saves the workflow by invoking the workflow instance and enqueuing it.
   *
   * @param {string} [filename_prefix] - The prefix for the saved filename. if not provided, the workflow will be saved as a websocket connection.
   * @return {this} - Returns the instance of the class for method chaining.
   * @throws {Error} - Throws an error if the client is not defined.
   */
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

  /**
   * Waits for the workflow to complete and returns the result and the images.
   *
   * @return {Promise<{result: WorkflowOutput<unknown>, images: {data: ArrayBuffer, mime: string}[]}>} - A promise that resolves to an object containing the result of the workflow and the images.
   * @throws {Error} - Throws an error if the workflow has not been invoked.
   */
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

  /**
   * Waits for the workflow to complete and returns the result and the images.
   *
   * *This function does not rely on WebSocket Events, so it maybe will lose events output by WebSocket node
   *
   * @return {Promise<{result: WorkflowOutput<unknown>, images: {data: ArrayBuffer, mime: string}[]}>} - A promise that resolves to an object containing the result of the workflow and the images.
   * @throws {Error} - Throws an error if the workflow has not been invoked.
   */
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
