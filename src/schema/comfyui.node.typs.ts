export namespace ComfyUINodeTypes {
  export interface NodeTypes {
    CLIPLoader?: CLIPLoader;
    CLIPSetLastLayer?: CLIPSetLastLayer;
    CLIPTextEncode?: CLIPTextEncode;
    CLIPVisionEncode?: CLIPVisionEncode;
    CLIPVisionLoader?: CLIPVisionLoader;
    CheckpointLoader?: CheckpointLoader;
    CheckpointLoaderSimple?: CheckpointLoaderSimple;
    ConditioningAverage?: ConditioningAverage;
    ConditioningCombine?: ConditioningCombine;
    ConditioningConcat?: ConditioningConcat;
    ConditioningSetArea?: ConditioningSetArea;
    ConditioningSetAreaPercentage?: ConditioningSetAreaPercentage;
    ConditioningSetAreaStrength?: ConditioningSetAreaStrength;
    ConditioningSetMask?: ConditioningSetMask;
    ConditioningSetTimestepRange?: ConditioningSetTimestepRange;
    ConditioningZeroOut?: ConditioningZeroOut;
    ControlNetApply?: ControlNetApply;
    ControlNetApplyAdvanced?: ControlNetApplyAdvanced;
    ControlNetLoader?: ControlNetLoader;
    DiffControlNetLoader?: DiffControlNetLoader;
    DiffusersLoader?: DiffusersLoader;
    DualCLIPLoader?: DualCLIPLoader;
    EmptyImage?: EmptyImage;
    EmptyLatentImage?: EmptyLatentImage;
    GLIGENLoader?: GLIGENLoader;
    GLIGENTextBoxApply?: GLIGENTextBoxApply;
    ImageBatch?: ImageBatch;
    ImageInvert?: ImageInvert;
    ImagePadForOutpaint?: ImagePadForOutpaint;
    ImageScale?: ImageScale;
    ImageScaleBy?: ImageScaleBy;
    InpaintModelConditioning?: InpaintModelConditioning;
    KSampler?: KSampler;
    KSamplerAdvanced?: KSamplerAdvanced;
    LatentBlend?: LatentBlend;
    LatentComposite?: LatentComposite;
    LatentCrop?: LatentCrop;
    LatentFlip?: LatentFlip;
    LatentFromBatch?: LatentFromBatch;
    LatentRotate?: LatentRotate;
    LatentUpscale?: LatentUpscale;
    LatentUpscaleBy?: LatentUpscaleBy;
    LoadImage?: LoadImage;
    LoadImageMask?: LoadImageMask;
    LoadLatent?: LoadLatent;
    LoraLoader?: LoraLoader;
    LoraLoaderModelOnly?: LoraLoaderModelOnly;
    PreviewImage?: PreviewImage;
    RepeatLatentBatch?: RepeatLatentBatch;
    SaveImage?: SaveImage;
    SaveLatent?: SaveLatent;
    SetLatentNoiseMask?: SetLatentNoiseMask;
    StyleModelApply?: StyleModelApply;
    StyleModelLoader?: StyleModelLoader;
    UNETLoader?: UNETLoader;
    VAEDecode?: VAEDecode;
    VAEDecodeTiled?: VAEDecodeTiled;
    VAEEncode?: VAEEncode;
    VAEEncodeForInpaint?: VAEEncodeForInpaint;
    VAEEncodeTiled?: VAEEncodeTiled;
    VAELoader?: VAELoader;
    unCLIPCheckpointLoader?: UnCLIPCheckpointLoader;
    unCLIPConditioning?: UnCLIPConditioning;
  }
  export interface CLIPLoader {
    /**
     * INPUT_TYPES: clip_name
     */
    inputs?: {
      clip_name: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CLIP
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface CLIPSetLastLayer {
    /**
     * INPUT_TYPES: clip, stop_at_clip_layer
     */
    inputs?: {
      clip: {
        [k: string]: unknown;
      };
      stop_at_clip_layer: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CLIP
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface CLIPTextEncode {
    /**
     * INPUT_TYPES: text, clip
     */
    inputs?: {
      text: string;
      clip: {
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface CLIPVisionEncode {
    /**
     * INPUT_TYPES: clip_vision, image
     */
    inputs?: {
      clip_vision: {
        [k: string]: unknown;
      };
      image: {
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CLIP_VISION_OUTPUT
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface CLIPVisionLoader {
    /**
     * INPUT_TYPES: clip_name
     */
    inputs?: {
      clip_name: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CLIP_VISION
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface CheckpointLoader {
    /**
     * INPUT_TYPES: config_name, ckpt_name
     */
    inputs?: {
      config_name: string;
      ckpt_name: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL, CLIP, VAE
     */
    outputs?: [
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface CheckpointLoaderSimple {
    /**
     * INPUT_TYPES: ckpt_name
     */
    inputs?: {
      ckpt_name: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL, CLIP, VAE
     */
    outputs?: [
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface ConditioningAverage {
    /**
     * INPUT_TYPES: conditioning_to, conditioning_from, conditioning_to_strength
     */
    inputs?: {
      conditioning_to: {
        [k: string]: unknown;
      };
      conditioning_from: {
        [k: string]: unknown;
      };
      conditioning_to_strength: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface ConditioningCombine {
    /**
     * INPUT_TYPES: conditioning_1, conditioning_2
     */
    inputs?: {
      conditioning_1: {
        [k: string]: unknown;
      };
      conditioning_2: {
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface ConditioningConcat {
    /**
     * INPUT_TYPES: conditioning_to, conditioning_from
     */
    inputs?: {
      conditioning_to: {
        [k: string]: unknown;
      };
      conditioning_from: {
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface ConditioningSetArea {
    /**
     * INPUT_TYPES: conditioning, width, height, x, y, strength
     */
    inputs?: {
      conditioning: {
        [k: string]: unknown;
      };
      width: number;
      height: number;
      x: number;
      y: number;
      strength: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface ConditioningSetAreaPercentage {
    /**
     * INPUT_TYPES: conditioning, width, height, x, y, strength
     */
    inputs?: {
      conditioning: {
        [k: string]: unknown;
      };
      width: number;
      height: number;
      x: number;
      y: number;
      strength: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface ConditioningSetAreaStrength {
    /**
     * INPUT_TYPES: conditioning, strength
     */
    inputs?: {
      conditioning: {
        [k: string]: unknown;
      };
      strength: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface ConditioningSetMask {
    /**
     * INPUT_TYPES: conditioning, mask, strength, set_cond_area
     */
    inputs?: {
      conditioning: {
        [k: string]: unknown;
      };
      mask: {
        [k: string]: unknown;
      };
      strength: number;
      set_cond_area: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface ConditioningSetTimestepRange {
    /**
     * INPUT_TYPES: conditioning, start, end
     */
    inputs?: {
      conditioning: {
        [k: string]: unknown;
      };
      start: number;
      end: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface ConditioningZeroOut {
    /**
     * INPUT_TYPES: conditioning
     */
    inputs?: {
      conditioning: {
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface ControlNetApply {
    /**
     * INPUT_TYPES: conditioning, control_net, image, strength
     */
    inputs?: {
      conditioning: {
        [k: string]: unknown;
      };
      control_net: {
        [k: string]: unknown;
      };
      image: {
        [k: string]: unknown;
      };
      strength: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface ControlNetApplyAdvanced {
    /**
     * INPUT_TYPES: positive, negative, control_net, image, strength, start_percent, end_percent
     */
    inputs?: {
      positive: {
        [k: string]: unknown;
      };
      negative: {
        [k: string]: unknown;
      };
      control_net: {
        [k: string]: unknown;
      };
      image: {
        [k: string]: unknown;
      };
      strength: number;
      start_percent: number;
      end_percent: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING, CONDITIONING
     */
    outputs?: [
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface ControlNetLoader {
    /**
     * INPUT_TYPES: control_net_name
     */
    inputs?: {
      control_net_name: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONTROL_NET
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface DiffControlNetLoader {
    /**
     * INPUT_TYPES: model, control_net_name
     */
    inputs?: {
      model: {
        [k: string]: unknown;
      };
      control_net_name: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONTROL_NET
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface DiffusersLoader {
    /**
     * INPUT_TYPES: model_path
     */
    inputs?: {
      model_path: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL, CLIP, VAE
     */
    outputs?: [
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface DualCLIPLoader {
    /**
     * INPUT_TYPES: clip_name1, clip_name2
     */
    inputs?: {
      clip_name1: string;
      clip_name2: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CLIP
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface EmptyImage {
    /**
     * INPUT_TYPES: width, height, batch_size, color
     */
    inputs?: {
      width: number;
      height: number;
      batch_size: number;
      color: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface EmptyLatentImage {
    /**
     * INPUT_TYPES: width, height, batch_size
     */
    inputs?: {
      width: number;
      height: number;
      batch_size: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface GLIGENLoader {
    /**
     * INPUT_TYPES: gligen_name
     */
    inputs?: {
      gligen_name: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: GLIGEN
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface GLIGENTextBoxApply {
    /**
     * INPUT_TYPES: conditioning_to, clip, gligen_textbox_model, text, width, height, x, y
     */
    inputs?: {
      conditioning_to: {
        [k: string]: unknown;
      };
      clip: {
        [k: string]: unknown;
      };
      gligen_textbox_model: {
        [k: string]: unknown;
      };
      text: string;
      width: number;
      height: number;
      x: number;
      y: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface ImageBatch {
    /**
     * INPUT_TYPES: image1, image2
     */
    inputs?: {
      image1: {
        [k: string]: unknown;
      };
      image2: {
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface ImageInvert {
    /**
     * INPUT_TYPES: image
     */
    inputs?: {
      image: {
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface ImagePadForOutpaint {
    /**
     * INPUT_TYPES: image, left, top, right, bottom, feathering
     */
    inputs?: {
      image: {
        [k: string]: unknown;
      };
      left: number;
      top: number;
      right: number;
      bottom: number;
      feathering: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE, MASK
     */
    outputs?: [
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface ImageScale {
    /**
     * INPUT_TYPES: image, upscale_method, width, height, crop
     */
    inputs?: {
      image: {
        [k: string]: unknown;
      };
      upscale_method: string;
      width: number;
      height: number;
      crop: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface ImageScaleBy {
    /**
     * INPUT_TYPES: image, upscale_method, scale_by
     */
    inputs?: {
      image: {
        [k: string]: unknown;
      };
      upscale_method: string;
      scale_by: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface InpaintModelConditioning {
    /**
     * INPUT_TYPES: positive, negative, vae, pixels, mask
     */
    inputs?: {
      positive: {
        [k: string]: unknown;
      };
      negative: {
        [k: string]: unknown;
      };
      vae: {
        [k: string]: unknown;
      };
      pixels: {
        [k: string]: unknown;
      };
      mask: {
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING, CONDITIONING, LATENT
     */
    outputs?: [
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface KSampler {
    /**
     * INPUT_TYPES: model, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise
     */
    inputs?: {
      model: {
        [k: string]: unknown;
      };
      seed: number;
      steps: number;
      cfg: number;
      sampler_name: string;
      scheduler: string;
      positive: {
        [k: string]: unknown;
      };
      negative: {
        [k: string]: unknown;
      };
      latent_image: {
        [k: string]: unknown;
      };
      denoise: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface KSamplerAdvanced {
    /**
     * INPUT_TYPES: model, add_noise, noise_seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, start_at_step, end_at_step, return_with_leftover_noise
     */
    inputs?: {
      model: {
        [k: string]: unknown;
      };
      add_noise: string;
      noise_seed: number;
      steps: number;
      cfg: number;
      sampler_name: string;
      scheduler: string;
      positive: {
        [k: string]: unknown;
      };
      negative: {
        [k: string]: unknown;
      };
      latent_image: {
        [k: string]: unknown;
      };
      start_at_step: number;
      end_at_step: number;
      return_with_leftover_noise: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface LatentBlend {
    /**
     * INPUT_TYPES: samples1, samples2, blend_factor
     */
    inputs?: {
      samples1: {
        [k: string]: unknown;
      };
      samples2: {
        [k: string]: unknown;
      };
      blend_factor: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface LatentComposite {
    /**
     * INPUT_TYPES: samples_to, samples_from, x, y, feather
     */
    inputs?: {
      samples_to: {
        [k: string]: unknown;
      };
      samples_from: {
        [k: string]: unknown;
      };
      x: number;
      y: number;
      feather: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface LatentCrop {
    /**
     * INPUT_TYPES: samples, width, height, x, y
     */
    inputs?: {
      samples: {
        [k: string]: unknown;
      };
      width: number;
      height: number;
      x: number;
      y: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface LatentFlip {
    /**
     * INPUT_TYPES: samples, flip_method
     */
    inputs?: {
      samples: {
        [k: string]: unknown;
      };
      flip_method: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface LatentFromBatch {
    /**
     * INPUT_TYPES: samples, batch_index, length
     */
    inputs?: {
      samples: {
        [k: string]: unknown;
      };
      batch_index: number;
      length: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface LatentRotate {
    /**
     * INPUT_TYPES: samples, rotation
     */
    inputs?: {
      samples: {
        [k: string]: unknown;
      };
      rotation: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface LatentUpscale {
    /**
     * INPUT_TYPES: samples, upscale_method, width, height, crop
     */
    inputs?: {
      samples: {
        [k: string]: unknown;
      };
      upscale_method: string;
      width: number;
      height: number;
      crop: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface LatentUpscaleBy {
    /**
     * INPUT_TYPES: samples, upscale_method, scale_by
     */
    inputs?: {
      samples: {
        [k: string]: unknown;
      };
      upscale_method: string;
      scale_by: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface LoadImage {
    /**
     * INPUT_TYPES: image
     */
    inputs?: {
      image: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE, MASK
     */
    outputs?: [
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface LoadImageMask {
    /**
     * INPUT_TYPES: image, channel
     */
    inputs?: {
      image: string;
      channel: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface LoadLatent {
    /**
     * INPUT_TYPES: latent
     */
    inputs?: {
      latent: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface LoraLoader {
    /**
     * INPUT_TYPES: model, clip, lora_name, strength_model, strength_clip
     */
    inputs?: {
      model: {
        [k: string]: unknown;
      };
      clip: {
        [k: string]: unknown;
      };
      lora_name: string;
      strength_model: number;
      strength_clip: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL, CLIP
     */
    outputs?: [
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface LoraLoaderModelOnly {
    /**
     * INPUT_TYPES: model, lora_name, strength_model
     */
    inputs?: {
      model: {
        [k: string]: unknown;
      };
      lora_name: string;
      strength_model: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface PreviewImage {
    /**
     * INPUT_TYPES: images
     */
    inputs?: {
      images: {
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    [k: string]: unknown;
  }
  export interface RepeatLatentBatch {
    /**
     * INPUT_TYPES: samples, amount
     */
    inputs?: {
      samples: {
        [k: string]: unknown;
      };
      amount: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface SaveImage {
    /**
     * INPUT_TYPES: images, filename_prefix
     */
    inputs?: {
      images: {
        [k: string]: unknown;
      };
      filename_prefix: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  }
  export interface SaveLatent {
    /**
     * INPUT_TYPES: samples, filename_prefix
     */
    inputs?: {
      samples: {
        [k: string]: unknown;
      };
      filename_prefix: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  }
  export interface SetLatentNoiseMask {
    /**
     * INPUT_TYPES: samples, mask
     */
    inputs?: {
      samples: {
        [k: string]: unknown;
      };
      mask: {
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface StyleModelApply {
    /**
     * INPUT_TYPES: conditioning, style_model, clip_vision_output
     */
    inputs?: {
      conditioning: {
        [k: string]: unknown;
      };
      style_model: {
        [k: string]: unknown;
      };
      clip_vision_output: {
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface StyleModelLoader {
    /**
     * INPUT_TYPES: style_model_name
     */
    inputs?: {
      style_model_name: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: STYLE_MODEL
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface UNETLoader {
    /**
     * INPUT_TYPES: unet_name
     */
    inputs?: {
      unet_name: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface VAEDecode {
    /**
     * INPUT_TYPES: samples, vae
     */
    inputs?: {
      samples: {
        [k: string]: unknown;
      };
      vae: {
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface VAEDecodeTiled {
    /**
     * INPUT_TYPES: samples, vae, tile_size
     */
    inputs?: {
      samples: {
        [k: string]: unknown;
      };
      vae: {
        [k: string]: unknown;
      };
      tile_size: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface VAEEncode {
    /**
     * INPUT_TYPES: pixels, vae
     */
    inputs?: {
      pixels: {
        [k: string]: unknown;
      };
      vae: {
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface VAEEncodeForInpaint {
    /**
     * INPUT_TYPES: pixels, vae, mask, grow_mask_by
     */
    inputs?: {
      pixels: {
        [k: string]: unknown;
      };
      vae: {
        [k: string]: unknown;
      };
      mask: {
        [k: string]: unknown;
      };
      grow_mask_by: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface VAEEncodeTiled {
    /**
     * INPUT_TYPES: pixels, vae, tile_size
     */
    inputs?: {
      pixels: {
        [k: string]: unknown;
      };
      vae: {
        [k: string]: unknown;
      };
      tile_size: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface VAELoader {
    /**
     * INPUT_TYPES: vae_name
     */
    inputs?: {
      vae_name: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: VAE
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface UnCLIPCheckpointLoader {
    /**
     * INPUT_TYPES: ckpt_name
     */
    inputs?: {
      ckpt_name: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL, CLIP, VAE, CLIP_VISION
     */
    outputs?: [
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
  export interface UnCLIPConditioning {
    /**
     * INPUT_TYPES: conditioning, clip_vision_output, strength, noise_augmentation
     */
    inputs?: {
      conditioning: {
        [k: string]: unknown;
      };
      clip_vision_output: {
        [k: string]: unknown;
      };
      strength: number;
      noise_augmentation: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING
     */
    outputs?: [
      {
        [k: string]: unknown;
      }
    ];
    [k: string]: unknown;
  }
}
