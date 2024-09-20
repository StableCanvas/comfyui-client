import { BasePipe } from "./base";
import { NSPipeline } from "./types";

interface EfficientPipeContext extends NSPipeline.PipeContext {
  vae_name: string;
  clip_skip: number;
  token_normalization: "none" | "mean" | "length" | "length+mean";
  weight_interpretation:
    | "comfy"
    | "A1111"
    | "compel"
    | "comfy++"
    | "down_weight";

  loras: {
    name: string;
    weight: number;
    model_strength: number;
    clip_strength: number;
  }[];
  control_net_blocks: {
    image: Buffer;
    name: string;
    strength: number;
    start: number;
    end: number;
  }[];
}

/**
 * pipe to create a workflow
 *
 * required https://github.com/jags111/efficiency-nodes-comfyui
 */
export class EfficientPipe extends BasePipe<EfficientPipeContext> {
  static defaultContext: EfficientPipeContext = {
    ...BasePipe.defaultContext,
    vae_name: "Baked VAE",
    clip_skip: -2,
    token_normalization: "none",
    weight_interpretation: "A1111",

    loras: [],
    control_net_blocks: [],
  };

  constructor(context?: Partial<EfficientPipeContext>) {
    super();
    this.context = {
      ...EfficientPipe.defaultContext,
      ...context,
    } as EfficientPipeContext;
  }

  /**
   * Adds a LoRA (Low-Rank Adaptation) to the EfficientPipe context.
   *
   * @param {string} name - The name of the LoRA.
   * @param {object} options - Optional configuration for the LoRA.
   * @param {number} [options.weight=1] - The weight of the LoRA.
   * @param {number} [options.strength=1] - The strength of the LoRA.
   * @param {number} [options.clip_strength=1] - The clip strength of the LoRA.
   * @return {EfficientPipe} The EfficientPipe instance for chaining.
   */
  lora(
    name: string,
    {
      weight = 1,
      strength = 1,
      clip_strength = 1,
    }: { weight?: number; strength?: number; clip_strength?: number } = {},
  ) {
    this.context.loras.push({
      name,
      weight,
      model_strength: strength,
      clip_strength,
    });
    return this;
  }

  /**
   * Adds a control net block to the EfficientPipe context.
   *
   * @param {string} name - The name of the control net block.
   * @param {Buffer} image - The image data of the control net block.
   * @param {object} options - Optional configuration for the control net block.
   * @param {number} [options.strength=1] - The strength of the control net block.
   * @param {number} [options.start=0] - The start value of the control net block.
   * @param {number} [options.end=1] - The end value of the control net block.
   * @return {EfficientPipe} The EfficientPipe instance for chaining.
   */
  cnet(
    name: string,
    image: Buffer,
    {
      strength = 1,
      start = 0,
      end = 1,
    }: {
      strength?: number;
      start?: number;
      end?: number;
    } = {},
  ) {
    this.context.control_net_blocks.push({
      image,
      name,
      strength,
      start,
      end,
    });
    return this;
  }

  protected build_lora_stack() {
    const { loras } = this.context;
    if (loras.length === 0) {
      return undefined;
    }
    const { _workflow: workflow } = this;
    const cls = workflow.classes;
    const params: any = {
      lora_count: loras.length,
    };
    for (let idx = 0; idx < 50; idx++) {
      const lora = loras[idx];
      if (!lora) {
        params[`lora_name_${idx}`] = "None";
        params[`lora_wt_${idx}`] = 1;
        params[`model_str_${idx}`] = 1;
        params[`clip_str_${idx}`] = 1;
        continue;
      }
      const { name, weight, model_strength, clip_strength } = lora;
      params[`lora_name_${idx}`] = name;
      params[`lora_wt_${idx}`] = weight;
      params[`model_str_${idx}`] = model_strength;
      params[`clip_str_${idx}`] = clip_strength;
    }

    const [stack] = cls["LoRA Stacker"]({
      input_mode: "advanced",
      ...params,
    });
    return stack;
  }

  protected build_cnet_block(
    {
      image,
      name,
      strength,
      start,
      end,
    }: EfficientPipeContext["control_net_blocks"][number],
    stack: any,
  ) {
    const { _workflow: workflow } = this;
    const { ControlNetLoader, ETN_LoadImageBase64 } = workflow.classes;
    const cls = workflow.classes;
    const [model] = ControlNetLoader({
      control_net_name: name,
    });
    const [img] = ETN_LoadImageBase64({
      image: image.toString("base64"),
    });
    const [stack_out] = cls["Control Net Stacker"]({
      control_net: model,
      image: img,
      strength,
      start_percent: start,
      end_percent: end,
      cnet_stack: stack,
    });
    return stack_out;
  }

  protected build_cnet_stack() {
    const { control_net_blocks } = this.context;
    if (control_net_blocks.length === 0) {
      return undefined;
    }
    let stack = undefined as any;
    for (const cnet of control_net_blocks) {
      stack = this.build_cnet_block(cnet, stack);
    }
    return stack;
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
      vae_name,
      clip_skip,
      token_normalization,
      weight_interpretation,
      width,
      height,
      batch_size,
    } = context;
    const [model, cond_pos, cond_neg, latent, vae, clip, deps] = cls[
      "Efficient Loader"
    ]({
      ckpt_name,
      vae_name,
      clip_skip,
      token_normalization,
      weight_interpretation,
      empty_latent_height: height,
      empty_latent_width: width,
      batch_size,
      positive,
      negative,

      lora_stack: this.build_lora_stack(),
      cnet_stack: this.build_cnet_stack(),

      // NOTE: All lora loads use stack instead of here
      lora_name: "None",
      lora_model_strength: 1,
      lora_clip_strength: 1,
    });

    const [samples] = cls.KSampler({
      seed,
      steps,
      cfg,
      sampler_name,
      scheduler,
      denoise,
      model,
      positive: cond_pos,
      negative: cond_neg,
      latent_image: this.build_latent(vae),
    });

    return { samples, vae, cls };
  }
}
