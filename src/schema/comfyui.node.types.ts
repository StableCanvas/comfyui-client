export namespace ComfyUINodeTypes {
  export interface NodeTypes {
    KSampler?: KSampler;
    CheckpointLoaderSimple?: CheckpointLoaderSimple;
    CLIPTextEncode?: CLIPTextEncode;
    CLIPSetLastLayer?: CLIPSetLastLayer;
    VAEDecode?: VAEDecode;
    VAEEncode?: VAEEncode;
    VAEEncodeForInpaint?: VAEEncodeForInpaint;
    VAELoader?: VAELoader;
    EmptyLatentImage?: EmptyLatentImage;
    LatentUpscale?: LatentUpscale;
    LatentUpscaleBy?: LatentUpscaleBy;
    LatentFromBatch?: LatentFromBatch;
    RepeatLatentBatch?: RepeatLatentBatch;
    SaveImage?: SaveImage;
    PreviewImage?: PreviewImage;
    LoadImage?: LoadImage;
    LoadImageMask?: LoadImageMask;
    ImageScale?: ImageScale;
    ImageScaleBy?: ImageScaleBy;
    ImageInvert?: ImageInvert;
    ImageBatch?: ImageBatch;
    ImagePadForOutpaint?: ImagePadForOutpaint;
    EmptyImage?: EmptyImage;
    ConditioningAverage?: ConditioningAverage;
    ConditioningCombine?: ConditioningCombine;
    ConditioningConcat?: ConditioningConcat;
    ConditioningSetArea?: ConditioningSetArea;
    ConditioningSetAreaPercentage?: ConditioningSetAreaPercentage;
    ConditioningSetAreaStrength?: ConditioningSetAreaStrength;
    ConditioningSetMask?: ConditioningSetMask;
    KSamplerAdvanced?: KSamplerAdvanced;
    SetLatentNoiseMask?: SetLatentNoiseMask;
    LatentComposite?: LatentComposite;
    LatentBlend?: LatentBlend;
    LatentRotate?: LatentRotate;
    LatentFlip?: LatentFlip;
    LatentCrop?: LatentCrop;
    LoraLoader?: LoraLoader;
    CLIPLoader?: CLIPLoader;
    UNETLoader?: UNETLoader;
    DualCLIPLoader?: DualCLIPLoader;
    CLIPVisionEncode?: CLIPVisionEncode;
    StyleModelApply?: StyleModelApply;
    unCLIPConditioning?: unCLIPConditioning;
    ControlNetApply?: ControlNetApply;
    ControlNetApplyAdvanced?: ControlNetApplyAdvanced;
    ControlNetLoader?: ControlNetLoader;
    DiffControlNetLoader?: DiffControlNetLoader;
    StyleModelLoader?: StyleModelLoader;
    CLIPVisionLoader?: CLIPVisionLoader;
    VAEDecodeTiled?: VAEDecodeTiled;
    VAEEncodeTiled?: VAEEncodeTiled;
    unCLIPCheckpointLoader?: unCLIPCheckpointLoader;
    GLIGENLoader?: GLIGENLoader;
    GLIGENTextBoxApply?: GLIGENTextBoxApply;
    InpaintModelConditioning?: InpaintModelConditioning;
    CheckpointLoader?: CheckpointLoader;
    DiffusersLoader?: DiffusersLoader;
    LoadLatent?: LoadLatent;
    SaveLatent?: SaveLatent;
    ConditioningZeroOut?: ConditioningZeroOut;
    ConditioningSetTimestepRange?: ConditioningSetTimestepRange;
    LoraLoaderModelOnly?: LoraLoaderModelOnly;
    LatentAdd?: LatentAdd;
    LatentSubtract?: LatentSubtract;
    LatentMultiply?: LatentMultiply;
    LatentInterpolate?: LatentInterpolate;
    LatentBatch?: LatentBatch;
    LatentBatchSeedBehavior?: LatentBatchSeedBehavior;
    HypernetworkLoader?: HypernetworkLoader;
    UpscaleModelLoader?: UpscaleModelLoader;
    ImageUpscaleWithModel?: ImageUpscaleWithModel;
    ImageBlend?: ImageBlend;
    ImageBlur?: ImageBlur;
    ImageQuantize?: ImageQuantize;
    ImageSharpen?: ImageSharpen;
    ImageScaleToTotalPixels?: ImageScaleToTotalPixels;
    LatentCompositeMasked?: LatentCompositeMasked;
    ImageCompositeMasked?: ImageCompositeMasked;
    MaskToImage?: MaskToImage;
    ImageToMask?: ImageToMask;
    ImageColorToMask?: ImageColorToMask;
    SolidMask?: SolidMask;
    InvertMask?: InvertMask;
    CropMask?: CropMask;
    MaskComposite?: MaskComposite;
    FeatherMask?: FeatherMask;
    GrowMask?: GrowMask;
    ThresholdMask?: ThresholdMask;
    PorterDuffImageComposite?: PorterDuffImageComposite;
    SplitImageWithAlpha?: SplitImageWithAlpha;
    JoinImageWithAlpha?: JoinImageWithAlpha;
    RebatchLatents?: RebatchLatents;
    RebatchImages?: RebatchImages;
    ModelMergeSimple?: ModelMergeSimple;
    ModelMergeBlocks?: ModelMergeBlocks;
    ModelMergeSubtract?: ModelMergeSubtract;
    ModelMergeAdd?: ModelMergeAdd;
    CheckpointSave?: CheckpointSave;
    CLIPMergeSimple?: CLIPMergeSimple;
    CLIPMergeSubtract?: CLIPMergeSubtract;
    CLIPMergeAdd?: CLIPMergeAdd;
    CLIPSave?: CLIPSave;
    VAESave?: VAESave;
    TomePatchModel?: TomePatchModel;
    CLIPTextEncodeSDXLRefiner?: CLIPTextEncodeSDXLRefiner;
    CLIPTextEncodeSDXL?: CLIPTextEncodeSDXL;
    Canny?: Canny;
    FreeU?: FreeU;
    FreeU_V2?: FreeU_V2;
    SamplerCustom?: SamplerCustom;
    BasicScheduler?: BasicScheduler;
    KarrasScheduler?: KarrasScheduler;
    ExponentialScheduler?: ExponentialScheduler;
    PolyexponentialScheduler?: PolyexponentialScheduler;
    VPScheduler?: VPScheduler;
    BetaSamplingScheduler?: BetaSamplingScheduler;
    SDTurboScheduler?: SDTurboScheduler;
    KSamplerSelect?: KSamplerSelect;
    SamplerEulerAncestral?: SamplerEulerAncestral;
    SamplerEulerAncestralCFGPP?: SamplerEulerAncestralCFGPP;
    SamplerLMS?: SamplerLMS;
    SamplerDPMPP_3M_SDE?: SamplerDPMPP_3M_SDE;
    SamplerDPMPP_2M_SDE?: SamplerDPMPP_2M_SDE;
    SamplerDPMPP_SDE?: SamplerDPMPP_SDE;
    SamplerDPMPP_2S_Ancestral?: SamplerDPMPP_2S_Ancestral;
    SamplerDPMAdaptative?: SamplerDPMAdaptative;
    SplitSigmas?: SplitSigmas;
    SplitSigmasDenoise?: SplitSigmasDenoise;
    FlipSigmas?: FlipSigmas;
    CFGGuider?: CFGGuider;
    DualCFGGuider?: DualCFGGuider;
    BasicGuider?: BasicGuider;
    RandomNoise?: RandomNoise;
    DisableNoise?: DisableNoise;
    AddNoise?: AddNoise;
    SamplerCustomAdvanced?: SamplerCustomAdvanced;
    HyperTile?: HyperTile;
    ModelSamplingDiscrete?: ModelSamplingDiscrete;
    ModelSamplingContinuousEDM?: ModelSamplingContinuousEDM;
    ModelSamplingContinuousV?: ModelSamplingContinuousV;
    ModelSamplingStableCascade?: ModelSamplingStableCascade;
    ModelSamplingSD3?: ModelSamplingSD3;
    ModelSamplingAuraFlow?: ModelSamplingAuraFlow;
    ModelSamplingFlux?: ModelSamplingFlux;
    RescaleCFG?: RescaleCFG;
    PatchModelAddDownscale?: PatchModelAddDownscale;
    ImageCrop?: ImageCrop;
    RepeatImageBatch?: RepeatImageBatch;
    ImageFromBatch?: ImageFromBatch;
    SaveAnimatedWEBP?: SaveAnimatedWEBP;
    SaveAnimatedPNG?: SaveAnimatedPNG;
    ImageOnlyCheckpointLoader?: ImageOnlyCheckpointLoader;
    SVD_img2vid_Conditioning?: SVD_img2vid_Conditioning;
    VideoLinearCFGGuidance?: VideoLinearCFGGuidance;
    VideoTriangleCFGGuidance?: VideoTriangleCFGGuidance;
    ImageOnlyCheckpointSave?: ImageOnlyCheckpointSave;
    SelfAttentionGuidance?: SelfAttentionGuidance;
    PerpNeg?: PerpNeg;
    PerpNegGuider?: PerpNegGuider;
    StableZero123_Conditioning?: StableZero123_Conditioning;
    StableZero123_Conditioning_Batched?: StableZero123_Conditioning_Batched;
    SV3D_Conditioning?: SV3D_Conditioning;
    SD_4XUpscale_Conditioning?: SD_4XUpscale_Conditioning;
    PhotoMakerLoader?: PhotoMakerLoader;
    PhotoMakerEncode?: PhotoMakerEncode;
    CLIPTextEncodeControlnet?: CLIPTextEncodeControlnet;
    Morphology?: Morphology;
    StableCascade_EmptyLatentImage?: StableCascade_EmptyLatentImage;
    StableCascade_StageB_Conditioning?: StableCascade_StageB_Conditioning;
    StableCascade_StageC_VAEEncode?: StableCascade_StageC_VAEEncode;
    StableCascade_SuperResolutionControlnet?: StableCascade_SuperResolutionControlnet;
    DifferentialDiffusion?: DifferentialDiffusion;
    InstructPixToPixConditioning?: InstructPixToPixConditioning;
    ModelMergeSD1?: ModelMergeSD1;
    ModelMergeSD2?: ModelMergeSD2;
    ModelMergeSDXL?: ModelMergeSDXL;
    ModelMergeSD3_2B?: ModelMergeSD3_2B;
    ModelMergeFlux1?: ModelMergeFlux1;
    PerturbedAttentionGuidance?: PerturbedAttentionGuidance;
    AlignYourStepsScheduler?: AlignYourStepsScheduler;
    UNetSelfAttentionMultiply?: UNetSelfAttentionMultiply;
    UNetCrossAttentionMultiply?: UNetCrossAttentionMultiply;
    CLIPAttentionMultiply?: CLIPAttentionMultiply;
    UNetTemporalAttentionMultiply?: UNetTemporalAttentionMultiply;
    SamplerLCMUpscale?: SamplerLCMUpscale;
    SamplerEulerCFGpp?: SamplerEulerCFGpp;
    WebcamCapture?: WebcamCapture;
    EmptyLatentAudio?: EmptyLatentAudio;
    VAEEncodeAudio?: VAEEncodeAudio;
    VAEDecodeAudio?: VAEDecodeAudio;
    SaveAudio?: SaveAudio;
    LoadAudio?: LoadAudio;
    PreviewAudio?: PreviewAudio;
    TripleCLIPLoader?: TripleCLIPLoader;
    EmptySD3LatentImage?: EmptySD3LatentImage;
    CLIPTextEncodeSD3?: CLIPTextEncodeSD3;
    ControlNetApplySD3?: ControlNetApplySD3;
    GITSScheduler?: GITSScheduler;
    SetUnionControlNetType?: SetUnionControlNetType;
    CLIPTextEncodeHunyuanDiT?: CLIPTextEncodeHunyuanDiT;
    CLIPTextEncodeFlux?: CLIPTextEncodeFlux;
    FluxGuidance?: FluxGuidance;
  }

  export interface KSampler {
    /**
     * INPUT_TYPES: model, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise
     */
    inputs?: {
      model: unknown;
      seed: number;
      steps: number;
      cfg: number;
      sampler_name: string;
      scheduler: string;
      positive: unknown;
      negative: unknown;
      latent_image: unknown;
      denoise: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [unknown];
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
    outputs?: [unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface CLIPTextEncode {
    /**
     * INPUT_TYPES: text, clip
     */
    inputs?: {
      text: string;
      clip: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface CLIPSetLastLayer {
    /**
     * INPUT_TYPES: clip, stop_at_clip_layer
     */
    inputs?: {
      clip: unknown;
      stop_at_clip_layer: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CLIP
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface VAEDecode {
    /**
     * INPUT_TYPES: samples, vae
     */
    inputs?: {
      samples: unknown;
      vae: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface VAEEncode {
    /**
     * INPUT_TYPES: pixels, vae
     */
    inputs?: {
      pixels: unknown;
      vae: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface VAEEncodeForInpaint {
    /**
     * INPUT_TYPES: pixels, vae, mask, grow_mask_by
     */
    inputs?: {
      pixels: unknown;
      vae: unknown;
      mask: unknown;
      grow_mask_by: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [unknown];
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
    outputs?: [unknown];
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
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface LatentUpscale {
    /**
     * INPUT_TYPES: samples, upscale_method, width, height, crop
     */
    inputs?: {
      samples: unknown;
      upscale_method: string;
      width: number;
      height: number;
      crop: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface LatentUpscaleBy {
    /**
     * INPUT_TYPES: samples, upscale_method, scale_by
     */
    inputs?: {
      samples: unknown;
      upscale_method: string;
      scale_by: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface LatentFromBatch {
    /**
     * INPUT_TYPES: samples, batch_index, length
     */
    inputs?: {
      samples: unknown;
      batch_index: number;
      length: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface RepeatLatentBatch {
    /**
     * INPUT_TYPES: samples, amount
     */
    inputs?: {
      samples: unknown;
      amount: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface SaveImage {
    /**
     * INPUT_TYPES: images, filename_prefix
     */
    inputs?: {
      images: unknown;
      filename_prefix: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  }

  export interface PreviewImage {
    /**
     * INPUT_TYPES: images
     */
    inputs?: {
      images: unknown;
      [k: string]: unknown;
    };
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
    outputs?: [unknown, unknown];
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
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ImageScale {
    /**
     * INPUT_TYPES: image, upscale_method, width, height, crop
     */
    inputs?: {
      image: unknown;
      upscale_method: string;
      width: number;
      height: number;
      crop: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ImageScaleBy {
    /**
     * INPUT_TYPES: image, upscale_method, scale_by
     */
    inputs?: {
      image: unknown;
      upscale_method: string;
      scale_by: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ImageInvert {
    /**
     * INPUT_TYPES: image
     */
    inputs?: {
      image: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ImageBatch {
    /**
     * INPUT_TYPES: image1, image2
     */
    inputs?: {
      image1: unknown;
      image2: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ImagePadForOutpaint {
    /**
     * INPUT_TYPES: image, left, top, right, bottom, feathering
     */
    inputs?: {
      image: unknown;
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
    outputs?: [unknown, unknown];
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
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ConditioningAverage {
    /**
     * INPUT_TYPES: conditioning_to, conditioning_from, conditioning_to_strength
     */
    inputs?: {
      conditioning_to: unknown;
      conditioning_from: unknown;
      conditioning_to_strength: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ConditioningCombine {
    /**
     * INPUT_TYPES: conditioning_1, conditioning_2
     */
    inputs?: {
      conditioning_1: unknown;
      conditioning_2: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ConditioningConcat {
    /**
     * INPUT_TYPES: conditioning_to, conditioning_from
     */
    inputs?: {
      conditioning_to: unknown;
      conditioning_from: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ConditioningSetArea {
    /**
     * INPUT_TYPES: conditioning, width, height, x, y, strength
     */
    inputs?: {
      conditioning: unknown;
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
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ConditioningSetAreaPercentage {
    /**
     * INPUT_TYPES: conditioning, width, height, x, y, strength
     */
    inputs?: {
      conditioning: unknown;
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
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ConditioningSetAreaStrength {
    /**
     * INPUT_TYPES: conditioning, strength
     */
    inputs?: {
      conditioning: unknown;
      strength: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ConditioningSetMask {
    /**
     * INPUT_TYPES: conditioning, mask, strength, set_cond_area
     */
    inputs?: {
      conditioning: unknown;
      mask: unknown;
      strength: number;
      set_cond_area: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface KSamplerAdvanced {
    /**
     * INPUT_TYPES: model, add_noise, noise_seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, start_at_step, end_at_step, return_with_leftover_noise
     */
    inputs?: {
      model: unknown;
      add_noise: string;
      noise_seed: number;
      steps: number;
      cfg: number;
      sampler_name: string;
      scheduler: string;
      positive: unknown;
      negative: unknown;
      latent_image: unknown;
      start_at_step: number;
      end_at_step: number;
      return_with_leftover_noise: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface SetLatentNoiseMask {
    /**
     * INPUT_TYPES: samples, mask
     */
    inputs?: {
      samples: unknown;
      mask: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface LatentComposite {
    /**
     * INPUT_TYPES: samples_to, samples_from, x, y, feather
     */
    inputs?: {
      samples_to: unknown;
      samples_from: unknown;
      x: number;
      y: number;
      feather: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface LatentBlend {
    /**
     * INPUT_TYPES: samples1, samples2, blend_factor
     */
    inputs?: {
      samples1: unknown;
      samples2: unknown;
      blend_factor: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface LatentRotate {
    /**
     * INPUT_TYPES: samples, rotation
     */
    inputs?: {
      samples: unknown;
      rotation: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface LatentFlip {
    /**
     * INPUT_TYPES: samples, flip_method
     */
    inputs?: {
      samples: unknown;
      flip_method: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface LatentCrop {
    /**
     * INPUT_TYPES: samples, width, height, x, y
     */
    inputs?: {
      samples: unknown;
      width: number;
      height: number;
      x: number;
      y: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface LoraLoader {
    /**
     * INPUT_TYPES: model, clip, lora_name, strength_model, strength_clip
     */
    inputs?: {
      model: unknown;
      clip: unknown;
      lora_name: string;
      strength_model: number;
      strength_clip: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL, CLIP
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface CLIPLoader {
    /**
     * INPUT_TYPES: clip_name, type
     */
    inputs?: {
      clip_name: string;
      type: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CLIP
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface UNETLoader {
    /**
     * INPUT_TYPES: unet_name, weight_dtype
     */
    inputs?: {
      unet_name: string;
      weight_dtype: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface DualCLIPLoader {
    /**
     * INPUT_TYPES: clip_name1, clip_name2, type
     */
    inputs?: {
      clip_name1: string;
      clip_name2: string;
      type: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CLIP
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface CLIPVisionEncode {
    /**
     * INPUT_TYPES: clip_vision, image
     */
    inputs?: {
      clip_vision: unknown;
      image: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CLIP_VISION_OUTPUT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface StyleModelApply {
    /**
     * INPUT_TYPES: conditioning, style_model, clip_vision_output
     */
    inputs?: {
      conditioning: unknown;
      style_model: unknown;
      clip_vision_output: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface unCLIPConditioning {
    /**
     * INPUT_TYPES: conditioning, clip_vision_output, strength, noise_augmentation
     */
    inputs?: {
      conditioning: unknown;
      clip_vision_output: unknown;
      strength: number;
      noise_augmentation: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ControlNetApply {
    /**
     * INPUT_TYPES: conditioning, control_net, image, strength
     */
    inputs?: {
      conditioning: unknown;
      control_net: unknown;
      image: unknown;
      strength: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ControlNetApplyAdvanced {
    /**
     * INPUT_TYPES: positive, negative, control_net, image, strength, start_percent, end_percent
     */
    inputs?: {
      positive: unknown;
      negative: unknown;
      control_net: unknown;
      image: unknown;
      strength: number;
      start_percent: number;
      end_percent: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING, CONDITIONING
     */
    outputs?: [unknown, unknown];
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
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface DiffControlNetLoader {
    /**
     * INPUT_TYPES: model, control_net_name
     */
    inputs?: {
      model: unknown;
      control_net_name: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONTROL_NET
     */
    outputs?: [unknown];
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
    outputs?: [unknown];
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
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface VAEDecodeTiled {
    /**
     * INPUT_TYPES: samples, vae, tile_size
     */
    inputs?: {
      samples: unknown;
      vae: unknown;
      tile_size: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface VAEEncodeTiled {
    /**
     * INPUT_TYPES: pixels, vae, tile_size
     */
    inputs?: {
      pixels: unknown;
      vae: unknown;
      tile_size: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface unCLIPCheckpointLoader {
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
    outputs?: [unknown, unknown, unknown, unknown];
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
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface GLIGENTextBoxApply {
    /**
     * INPUT_TYPES: conditioning_to, clip, gligen_textbox_model, text, width, height, x, y
     */
    inputs?: {
      conditioning_to: unknown;
      clip: unknown;
      gligen_textbox_model: unknown;
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
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface InpaintModelConditioning {
    /**
     * INPUT_TYPES: positive, negative, vae, pixels, mask
     */
    inputs?: {
      positive: unknown;
      negative: unknown;
      vae: unknown;
      pixels: unknown;
      mask: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING, CONDITIONING, LATENT
     */
    outputs?: [unknown, unknown, unknown];
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
    outputs?: [unknown, unknown, unknown];
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
    outputs?: [unknown, unknown, unknown];
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
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface SaveLatent {
    /**
     * INPUT_TYPES: samples, filename_prefix
     */
    inputs?: {
      samples: unknown;
      filename_prefix: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  }

  export interface ConditioningZeroOut {
    /**
     * INPUT_TYPES: conditioning
     */
    inputs?: {
      conditioning: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ConditioningSetTimestepRange {
    /**
     * INPUT_TYPES: conditioning, start, end
     */
    inputs?: {
      conditioning: unknown;
      start: number;
      end: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface LoraLoaderModelOnly {
    /**
     * INPUT_TYPES: model, lora_name, strength_model
     */
    inputs?: {
      model: unknown;
      lora_name: string;
      strength_model: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface LatentAdd {
    /**
     * INPUT_TYPES: samples1, samples2
     */
    inputs?: {
      samples1: unknown;
      samples2: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface LatentSubtract {
    /**
     * INPUT_TYPES: samples1, samples2
     */
    inputs?: {
      samples1: unknown;
      samples2: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface LatentMultiply {
    /**
     * INPUT_TYPES: samples, multiplier
     */
    inputs?: {
      samples: unknown;
      multiplier: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface LatentInterpolate {
    /**
     * INPUT_TYPES: samples1, samples2, ratio
     */
    inputs?: {
      samples1: unknown;
      samples2: unknown;
      ratio: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface LatentBatch {
    /**
     * INPUT_TYPES: samples1, samples2
     */
    inputs?: {
      samples1: unknown;
      samples2: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface LatentBatchSeedBehavior {
    /**
     * INPUT_TYPES: samples, seed_behavior
     */
    inputs?: {
      samples: unknown;
      seed_behavior: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface HypernetworkLoader {
    /**
     * INPUT_TYPES: model, hypernetwork_name, strength
     */
    inputs?: {
      model: unknown;
      hypernetwork_name: string;
      strength: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface UpscaleModelLoader {
    /**
     * INPUT_TYPES: model_name
     */
    inputs?: {
      model_name: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: UPSCALE_MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ImageUpscaleWithModel {
    /**
     * INPUT_TYPES: upscale_model, image
     */
    inputs?: {
      upscale_model: unknown;
      image: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ImageBlend {
    /**
     * INPUT_TYPES: image1, image2, blend_factor, blend_mode
     */
    inputs?: {
      image1: unknown;
      image2: unknown;
      blend_factor: number;
      blend_mode: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ImageBlur {
    /**
     * INPUT_TYPES: image, blur_radius, sigma
     */
    inputs?: {
      image: unknown;
      blur_radius: number;
      sigma: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ImageQuantize {
    /**
     * INPUT_TYPES: image, colors, dither
     */
    inputs?: {
      image: unknown;
      colors: number;
      dither: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ImageSharpen {
    /**
     * INPUT_TYPES: image, sharpen_radius, sigma, alpha
     */
    inputs?: {
      image: unknown;
      sharpen_radius: number;
      sigma: number;
      alpha: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ImageScaleToTotalPixels {
    /**
     * INPUT_TYPES: image, upscale_method, megapixels
     */
    inputs?: {
      image: unknown;
      upscale_method: string;
      megapixels: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface LatentCompositeMasked {
    /**
     * INPUT_TYPES: destination, source, x, y, resize_source
     */
    inputs?: {
      destination: unknown;
      source: unknown;
      x: number;
      y: number;
      resize_source: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ImageCompositeMasked {
    /**
     * INPUT_TYPES: destination, source, x, y, resize_source
     */
    inputs?: {
      destination: unknown;
      source: unknown;
      x: number;
      y: number;
      resize_source: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface MaskToImage {
    /**
     * INPUT_TYPES: mask
     */
    inputs?: {
      mask: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ImageToMask {
    /**
     * INPUT_TYPES: image, channel
     */
    inputs?: {
      image: unknown;
      channel: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ImageColorToMask {
    /**
     * INPUT_TYPES: image, color
     */
    inputs?: {
      image: unknown;
      color: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface SolidMask {
    /**
     * INPUT_TYPES: value, width, height
     */
    inputs?: {
      value: number;
      width: number;
      height: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface InvertMask {
    /**
     * INPUT_TYPES: mask
     */
    inputs?: {
      mask: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface CropMask {
    /**
     * INPUT_TYPES: mask, x, y, width, height
     */
    inputs?: {
      mask: unknown;
      x: number;
      y: number;
      width: number;
      height: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface MaskComposite {
    /**
     * INPUT_TYPES: destination, source, x, y, operation
     */
    inputs?: {
      destination: unknown;
      source: unknown;
      x: number;
      y: number;
      operation: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface FeatherMask {
    /**
     * INPUT_TYPES: mask, left, top, right, bottom
     */
    inputs?: {
      mask: unknown;
      left: number;
      top: number;
      right: number;
      bottom: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface GrowMask {
    /**
     * INPUT_TYPES: mask, expand, tapered_corners
     */
    inputs?: {
      mask: unknown;
      expand: number;
      tapered_corners: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ThresholdMask {
    /**
     * INPUT_TYPES: mask, value
     */
    inputs?: {
      mask: unknown;
      value: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface PorterDuffImageComposite {
    /**
     * INPUT_TYPES: source, source_alpha, destination, destination_alpha, mode
     */
    inputs?: {
      source: unknown;
      source_alpha: unknown;
      destination: unknown;
      destination_alpha: unknown;
      mode: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE, MASK
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface SplitImageWithAlpha {
    /**
     * INPUT_TYPES: image
     */
    inputs?: {
      image: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE, MASK
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface JoinImageWithAlpha {
    /**
     * INPUT_TYPES: image, alpha
     */
    inputs?: {
      image: unknown;
      alpha: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface RebatchLatents {
    /**
     * INPUT_TYPES: latents, batch_size
     */
    inputs?: {
      latents: unknown;
      batch_size: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface RebatchImages {
    /**
     * INPUT_TYPES: images, batch_size
     */
    inputs?: {
      images: unknown;
      batch_size: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ModelMergeSimple {
    /**
     * INPUT_TYPES: model1, model2, ratio
     */
    inputs?: {
      model1: unknown;
      model2: unknown;
      ratio: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ModelMergeBlocks {
    /**
     * INPUT_TYPES: model1, model2, input, middle, out
     */
    inputs?: {
      model1: unknown;
      model2: unknown;
      input: number;
      middle: number;
      out: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ModelMergeSubtract {
    /**
     * INPUT_TYPES: model1, model2, multiplier
     */
    inputs?: {
      model1: unknown;
      model2: unknown;
      multiplier: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ModelMergeAdd {
    /**
     * INPUT_TYPES: model1, model2
     */
    inputs?: {
      model1: unknown;
      model2: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface CheckpointSave {
    /**
     * INPUT_TYPES: model, clip, vae, filename_prefix
     */
    inputs?: {
      model: unknown;
      clip: unknown;
      vae: unknown;
      filename_prefix: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  }

  export interface CLIPMergeSimple {
    /**
     * INPUT_TYPES: clip1, clip2, ratio
     */
    inputs?: {
      clip1: unknown;
      clip2: unknown;
      ratio: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CLIP
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface CLIPMergeSubtract {
    /**
     * INPUT_TYPES: clip1, clip2, multiplier
     */
    inputs?: {
      clip1: unknown;
      clip2: unknown;
      multiplier: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CLIP
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface CLIPMergeAdd {
    /**
     * INPUT_TYPES: clip1, clip2
     */
    inputs?: {
      clip1: unknown;
      clip2: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CLIP
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface CLIPSave {
    /**
     * INPUT_TYPES: clip, filename_prefix
     */
    inputs?: {
      clip: unknown;
      filename_prefix: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  }

  export interface VAESave {
    /**
     * INPUT_TYPES: vae, filename_prefix
     */
    inputs?: {
      vae: unknown;
      filename_prefix: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  }

  export interface TomePatchModel {
    /**
     * INPUT_TYPES: model, ratio
     */
    inputs?: {
      model: unknown;
      ratio: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface CLIPTextEncodeSDXLRefiner {
    /**
     * INPUT_TYPES: ascore, width, height, text, clip
     */
    inputs?: {
      ascore: number;
      width: number;
      height: number;
      text: string;
      clip: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface CLIPTextEncodeSDXL {
    /**
     * INPUT_TYPES: width, height, crop_w, crop_h, target_width, target_height, text_g, clip, text_l
     */
    inputs?: {
      width: number;
      height: number;
      crop_w: number;
      crop_h: number;
      target_width: number;
      target_height: number;
      text_g: string;
      clip: unknown;
      text_l: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface Canny {
    /**
     * INPUT_TYPES: image, low_threshold, high_threshold
     */
    inputs?: {
      image: unknown;
      low_threshold: number;
      high_threshold: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface FreeU {
    /**
     * INPUT_TYPES: model, b1, b2, s1, s2
     */
    inputs?: {
      model: unknown;
      b1: number;
      b2: number;
      s1: number;
      s2: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface FreeU_V2 {
    /**
     * INPUT_TYPES: model, b1, b2, s1, s2
     */
    inputs?: {
      model: unknown;
      b1: number;
      b2: number;
      s1: number;
      s2: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface SamplerCustom {
    /**
     * INPUT_TYPES: model, add_noise, noise_seed, cfg, positive, negative, sampler, sigmas, latent_image
     */
    inputs?: {
      model: unknown;
      add_noise: unknown;
      noise_seed: number;
      cfg: number;
      positive: unknown;
      negative: unknown;
      sampler: unknown;
      sigmas: unknown;
      latent_image: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT, LATENT
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface BasicScheduler {
    /**
     * INPUT_TYPES: model, scheduler, steps, denoise
     */
    inputs?: {
      model: unknown;
      scheduler: string;
      steps: number;
      denoise: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SIGMAS
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface KarrasScheduler {
    /**
     * INPUT_TYPES: steps, sigma_max, sigma_min, rho
     */
    inputs?: {
      steps: number;
      sigma_max: number;
      sigma_min: number;
      rho: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SIGMAS
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ExponentialScheduler {
    /**
     * INPUT_TYPES: steps, sigma_max, sigma_min
     */
    inputs?: {
      steps: number;
      sigma_max: number;
      sigma_min: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SIGMAS
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface PolyexponentialScheduler {
    /**
     * INPUT_TYPES: steps, sigma_max, sigma_min, rho
     */
    inputs?: {
      steps: number;
      sigma_max: number;
      sigma_min: number;
      rho: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SIGMAS
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface VPScheduler {
    /**
     * INPUT_TYPES: steps, beta_d, beta_min, eps_s
     */
    inputs?: {
      steps: number;
      beta_d: number;
      beta_min: number;
      eps_s: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SIGMAS
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface BetaSamplingScheduler {
    /**
     * INPUT_TYPES: model, steps, alpha, beta
     */
    inputs?: {
      model: unknown;
      steps: number;
      alpha: number;
      beta: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SIGMAS
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface SDTurboScheduler {
    /**
     * INPUT_TYPES: model, steps, denoise
     */
    inputs?: {
      model: unknown;
      steps: number;
      denoise: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SIGMAS
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface KSamplerSelect {
    /**
     * INPUT_TYPES: sampler_name
     */
    inputs?: {
      sampler_name: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SAMPLER
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface SamplerEulerAncestral {
    /**
     * INPUT_TYPES: eta, s_noise
     */
    inputs?: {
      eta: number;
      s_noise: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SAMPLER
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface SamplerEulerAncestralCFGPP {
    /**
     * INPUT_TYPES: eta, s_noise
     */
    inputs?: {
      eta: number;
      s_noise: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SAMPLER
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface SamplerLMS {
    /**
     * INPUT_TYPES: order
     */
    inputs?: {
      order: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SAMPLER
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface SamplerDPMPP_3M_SDE {
    /**
     * INPUT_TYPES: eta, s_noise, noise_device
     */
    inputs?: {
      eta: number;
      s_noise: number;
      noise_device: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SAMPLER
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface SamplerDPMPP_2M_SDE {
    /**
     * INPUT_TYPES: solver_type, eta, s_noise, noise_device
     */
    inputs?: {
      solver_type: string;
      eta: number;
      s_noise: number;
      noise_device: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SAMPLER
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface SamplerDPMPP_SDE {
    /**
     * INPUT_TYPES: eta, s_noise, r, noise_device
     */
    inputs?: {
      eta: number;
      s_noise: number;
      r: number;
      noise_device: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SAMPLER
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface SamplerDPMPP_2S_Ancestral {
    /**
     * INPUT_TYPES: eta, s_noise
     */
    inputs?: {
      eta: number;
      s_noise: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SAMPLER
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface SamplerDPMAdaptative {
    /**
     * INPUT_TYPES: order, rtol, atol, h_init, pcoeff, icoeff, dcoeff, accept_safety, eta, s_noise
     */
    inputs?: {
      order: number;
      rtol: number;
      atol: number;
      h_init: number;
      pcoeff: number;
      icoeff: number;
      dcoeff: number;
      accept_safety: number;
      eta: number;
      s_noise: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SAMPLER
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface SplitSigmas {
    /**
     * INPUT_TYPES: sigmas, step
     */
    inputs?: {
      sigmas: unknown;
      step: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SIGMAS, SIGMAS
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface SplitSigmasDenoise {
    /**
     * INPUT_TYPES: sigmas, denoise
     */
    inputs?: {
      sigmas: unknown;
      denoise: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SIGMAS, SIGMAS
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface FlipSigmas {
    /**
     * INPUT_TYPES: sigmas
     */
    inputs?: {
      sigmas: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SIGMAS
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface CFGGuider {
    /**
     * INPUT_TYPES: model, positive, negative, cfg
     */
    inputs?: {
      model: unknown;
      positive: unknown;
      negative: unknown;
      cfg: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: GUIDER
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface DualCFGGuider {
    /**
     * INPUT_TYPES: model, cond1, cond2, negative, cfg_conds, cfg_cond2_negative
     */
    inputs?: {
      model: unknown;
      cond1: unknown;
      cond2: unknown;
      negative: unknown;
      cfg_conds: number;
      cfg_cond2_negative: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: GUIDER
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface BasicGuider {
    /**
     * INPUT_TYPES: model, conditioning
     */
    inputs?: {
      model: unknown;
      conditioning: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: GUIDER
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface RandomNoise {
    /**
     * INPUT_TYPES: noise_seed
     */
    inputs?: {
      noise_seed: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: NOISE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface DisableNoise {
    /**
     * INPUT_TYPES:
     */
    inputs?: {
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: NOISE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface AddNoise {
    /**
     * INPUT_TYPES: model, noise, sigmas, latent_image
     */
    inputs?: {
      model: unknown;
      noise: unknown;
      sigmas: unknown;
      latent_image: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface SamplerCustomAdvanced {
    /**
     * INPUT_TYPES: noise, guider, sampler, sigmas, latent_image
     */
    inputs?: {
      noise: unknown;
      guider: unknown;
      sampler: unknown;
      sigmas: unknown;
      latent_image: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT, LATENT
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface HyperTile {
    /**
     * INPUT_TYPES: model, tile_size, swap_size, max_depth, scale_depth
     */
    inputs?: {
      model: unknown;
      tile_size: number;
      swap_size: number;
      max_depth: number;
      scale_depth: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ModelSamplingDiscrete {
    /**
     * INPUT_TYPES: model, sampling, zsnr
     */
    inputs?: {
      model: unknown;
      sampling: string;
      zsnr: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ModelSamplingContinuousEDM {
    /**
     * INPUT_TYPES: model, sampling, sigma_max, sigma_min
     */
    inputs?: {
      model: unknown;
      sampling: string;
      sigma_max: number;
      sigma_min: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ModelSamplingContinuousV {
    /**
     * INPUT_TYPES: model, sampling, sigma_max, sigma_min
     */
    inputs?: {
      model: unknown;
      sampling: string;
      sigma_max: number;
      sigma_min: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ModelSamplingStableCascade {
    /**
     * INPUT_TYPES: model, shift
     */
    inputs?: {
      model: unknown;
      shift: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ModelSamplingSD3 {
    /**
     * INPUT_TYPES: model, shift
     */
    inputs?: {
      model: unknown;
      shift: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ModelSamplingAuraFlow {
    /**
     * INPUT_TYPES: model, shift
     */
    inputs?: {
      model: unknown;
      shift: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ModelSamplingFlux {
    /**
     * INPUT_TYPES: model, max_shift, base_shift, width, height
     */
    inputs?: {
      model: unknown;
      max_shift: number;
      base_shift: number;
      width: number;
      height: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface RescaleCFG {
    /**
     * INPUT_TYPES: model, multiplier
     */
    inputs?: {
      model: unknown;
      multiplier: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface PatchModelAddDownscale {
    /**
     * INPUT_TYPES: model, block_number, downscale_factor, start_percent, end_percent, downscale_after_skip, downscale_method, upscale_method
     */
    inputs?: {
      model: unknown;
      block_number: number;
      downscale_factor: number;
      start_percent: number;
      end_percent: number;
      downscale_after_skip: unknown;
      downscale_method: string;
      upscale_method: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ImageCrop {
    /**
     * INPUT_TYPES: image, width, height, x, y
     */
    inputs?: {
      image: unknown;
      width: number;
      height: number;
      x: number;
      y: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface RepeatImageBatch {
    /**
     * INPUT_TYPES: image, amount
     */
    inputs?: {
      image: unknown;
      amount: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ImageFromBatch {
    /**
     * INPUT_TYPES: image, batch_index, length
     */
    inputs?: {
      image: unknown;
      batch_index: number;
      length: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface SaveAnimatedWEBP {
    /**
     * INPUT_TYPES: images, filename_prefix, fps, lossless, quality, method
     */
    inputs?: {
      images: unknown;
      filename_prefix: string;
      fps: number;
      lossless: unknown;
      quality: number;
      method: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  }

  export interface SaveAnimatedPNG {
    /**
     * INPUT_TYPES: images, filename_prefix, fps, compress_level
     */
    inputs?: {
      images: unknown;
      filename_prefix: string;
      fps: number;
      compress_level: number;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  }

  export interface ImageOnlyCheckpointLoader {
    /**
     * INPUT_TYPES: ckpt_name
     */
    inputs?: {
      ckpt_name: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL, CLIP_VISION, VAE
     */
    outputs?: [unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface SVD_img2vid_Conditioning {
    /**
     * INPUT_TYPES: clip_vision, init_image, vae, width, height, video_frames, motion_bucket_id, fps, augmentation_level
     */
    inputs?: {
      clip_vision: unknown;
      init_image: unknown;
      vae: unknown;
      width: number;
      height: number;
      video_frames: number;
      motion_bucket_id: number;
      fps: number;
      augmentation_level: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING, CONDITIONING, LATENT
     */
    outputs?: [unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface VideoLinearCFGGuidance {
    /**
     * INPUT_TYPES: model, min_cfg
     */
    inputs?: {
      model: unknown;
      min_cfg: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface VideoTriangleCFGGuidance {
    /**
     * INPUT_TYPES: model, min_cfg
     */
    inputs?: {
      model: unknown;
      min_cfg: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ImageOnlyCheckpointSave {
    /**
     * INPUT_TYPES: model, clip_vision, vae, filename_prefix
     */
    inputs?: {
      model: unknown;
      clip_vision: unknown;
      vae: unknown;
      filename_prefix: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  }

  export interface SelfAttentionGuidance {
    /**
     * INPUT_TYPES: model, scale, blur_sigma
     */
    inputs?: {
      model: unknown;
      scale: number;
      blur_sigma: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface PerpNeg {
    /**
     * INPUT_TYPES: model, empty_conditioning, neg_scale
     */
    inputs?: {
      model: unknown;
      empty_conditioning: unknown;
      neg_scale: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface PerpNegGuider {
    /**
     * INPUT_TYPES: model, positive, negative, empty_conditioning, cfg, neg_scale
     */
    inputs?: {
      model: unknown;
      positive: unknown;
      negative: unknown;
      empty_conditioning: unknown;
      cfg: number;
      neg_scale: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: GUIDER
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface StableZero123_Conditioning {
    /**
     * INPUT_TYPES: clip_vision, init_image, vae, width, height, batch_size, elevation, azimuth
     */
    inputs?: {
      clip_vision: unknown;
      init_image: unknown;
      vae: unknown;
      width: number;
      height: number;
      batch_size: number;
      elevation: number;
      azimuth: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING, CONDITIONING, LATENT
     */
    outputs?: [unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface StableZero123_Conditioning_Batched {
    /**
     * INPUT_TYPES: clip_vision, init_image, vae, width, height, batch_size, elevation, azimuth, elevation_batch_increment, azimuth_batch_increment
     */
    inputs?: {
      clip_vision: unknown;
      init_image: unknown;
      vae: unknown;
      width: number;
      height: number;
      batch_size: number;
      elevation: number;
      azimuth: number;
      elevation_batch_increment: number;
      azimuth_batch_increment: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING, CONDITIONING, LATENT
     */
    outputs?: [unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface SV3D_Conditioning {
    /**
     * INPUT_TYPES: clip_vision, init_image, vae, width, height, video_frames, elevation
     */
    inputs?: {
      clip_vision: unknown;
      init_image: unknown;
      vae: unknown;
      width: number;
      height: number;
      video_frames: number;
      elevation: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING, CONDITIONING, LATENT
     */
    outputs?: [unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface SD_4XUpscale_Conditioning {
    /**
     * INPUT_TYPES: images, positive, negative, scale_ratio, noise_augmentation
     */
    inputs?: {
      images: unknown;
      positive: unknown;
      negative: unknown;
      scale_ratio: number;
      noise_augmentation: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING, CONDITIONING, LATENT
     */
    outputs?: [unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface PhotoMakerLoader {
    /**
     * INPUT_TYPES: photomaker_model_name
     */
    inputs?: {
      photomaker_model_name: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: PHOTOMAKER
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface PhotoMakerEncode {
    /**
     * INPUT_TYPES: photomaker, image, clip, text
     */
    inputs?: {
      photomaker: unknown;
      image: unknown;
      clip: unknown;
      text: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface CLIPTextEncodeControlnet {
    /**
     * INPUT_TYPES: clip, conditioning, text
     */
    inputs?: {
      clip: unknown;
      conditioning: unknown;
      text: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface Morphology {
    /**
     * INPUT_TYPES: image, operation, kernel_size
     */
    inputs?: {
      image: unknown;
      operation: string;
      kernel_size: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface StableCascade_EmptyLatentImage {
    /**
     * INPUT_TYPES: width, height, compression, batch_size
     */
    inputs?: {
      width: number;
      height: number;
      compression: number;
      batch_size: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT, LATENT
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface StableCascade_StageB_Conditioning {
    /**
     * INPUT_TYPES: conditioning, stage_c
     */
    inputs?: {
      conditioning: unknown;
      stage_c: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface StableCascade_StageC_VAEEncode {
    /**
     * INPUT_TYPES: image, vae, compression
     */
    inputs?: {
      image: unknown;
      vae: unknown;
      compression: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT, LATENT
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface StableCascade_SuperResolutionControlnet {
    /**
     * INPUT_TYPES: image, vae
     */
    inputs?: {
      image: unknown;
      vae: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE, LATENT, LATENT
     */
    outputs?: [unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface DifferentialDiffusion {
    /**
     * INPUT_TYPES: model
     */
    inputs?: {
      model: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface InstructPixToPixConditioning {
    /**
     * INPUT_TYPES: positive, negative, vae, pixels
     */
    inputs?: {
      positive: unknown;
      negative: unknown;
      vae: unknown;
      pixels: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING, CONDITIONING, LATENT
     */
    outputs?: [unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface ModelMergeSD1 {
    /**
     * INPUT_TYPES: model1, model2, time_embed., label_emb., input_blocks.0., input_blocks.1., input_blocks.2., input_blocks.3., input_blocks.4., input_blocks.5., input_blocks.6., input_blocks.7., input_blocks.8., input_blocks.9., input_blocks.10., input_blocks.11., middle_block.0., middle_block.1., middle_block.2., output_blocks.0., output_blocks.1., output_blocks.2., output_blocks.3., output_blocks.4., output_blocks.5., output_blocks.6., output_blocks.7., output_blocks.8., output_blocks.9., output_blocks.10., output_blocks.11., out.
     */
    inputs?: {
      model1: unknown;
      model2: unknown;
      ["time_embed."]: number;
      ["label_emb."]: number;
      ["input_blocks.0."]: number;
      ["input_blocks.1."]: number;
      ["input_blocks.2."]: number;
      ["input_blocks.3."]: number;
      ["input_blocks.4."]: number;
      ["input_blocks.5."]: number;
      ["input_blocks.6."]: number;
      ["input_blocks.7."]: number;
      ["input_blocks.8."]: number;
      ["input_blocks.9."]: number;
      ["input_blocks.10."]: number;
      ["input_blocks.11."]: number;
      ["middle_block.0."]: number;
      ["middle_block.1."]: number;
      ["middle_block.2."]: number;
      ["output_blocks.0."]: number;
      ["output_blocks.1."]: number;
      ["output_blocks.2."]: number;
      ["output_blocks.3."]: number;
      ["output_blocks.4."]: number;
      ["output_blocks.5."]: number;
      ["output_blocks.6."]: number;
      ["output_blocks.7."]: number;
      ["output_blocks.8."]: number;
      ["output_blocks.9."]: number;
      ["output_blocks.10."]: number;
      ["output_blocks.11."]: number;
      ["out."]: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ModelMergeSD2 {
    /**
     * INPUT_TYPES: model1, model2, time_embed., label_emb., input_blocks.0., input_blocks.1., input_blocks.2., input_blocks.3., input_blocks.4., input_blocks.5., input_blocks.6., input_blocks.7., input_blocks.8., input_blocks.9., input_blocks.10., input_blocks.11., middle_block.0., middle_block.1., middle_block.2., output_blocks.0., output_blocks.1., output_blocks.2., output_blocks.3., output_blocks.4., output_blocks.5., output_blocks.6., output_blocks.7., output_blocks.8., output_blocks.9., output_blocks.10., output_blocks.11., out.
     */
    inputs?: {
      model1: unknown;
      model2: unknown;
      ["time_embed."]: number;
      ["label_emb."]: number;
      ["input_blocks.0."]: number;
      ["input_blocks.1."]: number;
      ["input_blocks.2."]: number;
      ["input_blocks.3."]: number;
      ["input_blocks.4."]: number;
      ["input_blocks.5."]: number;
      ["input_blocks.6."]: number;
      ["input_blocks.7."]: number;
      ["input_blocks.8."]: number;
      ["input_blocks.9."]: number;
      ["input_blocks.10."]: number;
      ["input_blocks.11."]: number;
      ["middle_block.0."]: number;
      ["middle_block.1."]: number;
      ["middle_block.2."]: number;
      ["output_blocks.0."]: number;
      ["output_blocks.1."]: number;
      ["output_blocks.2."]: number;
      ["output_blocks.3."]: number;
      ["output_blocks.4."]: number;
      ["output_blocks.5."]: number;
      ["output_blocks.6."]: number;
      ["output_blocks.7."]: number;
      ["output_blocks.8."]: number;
      ["output_blocks.9."]: number;
      ["output_blocks.10."]: number;
      ["output_blocks.11."]: number;
      ["out."]: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ModelMergeSDXL {
    /**
     * INPUT_TYPES: model1, model2, time_embed., label_emb., input_blocks.0, input_blocks.1, input_blocks.2, input_blocks.3, input_blocks.4, input_blocks.5, input_blocks.6, input_blocks.7, input_blocks.8, middle_block.0, middle_block.1, middle_block.2, output_blocks.0, output_blocks.1, output_blocks.2, output_blocks.3, output_blocks.4, output_blocks.5, output_blocks.6, output_blocks.7, output_blocks.8, out.
     */
    inputs?: {
      model1: unknown;
      model2: unknown;
      ["time_embed."]: number;
      ["label_emb."]: number;
      ["input_blocks.0"]: number;
      ["input_blocks.1"]: number;
      ["input_blocks.2"]: number;
      ["input_blocks.3"]: number;
      ["input_blocks.4"]: number;
      ["input_blocks.5"]: number;
      ["input_blocks.6"]: number;
      ["input_blocks.7"]: number;
      ["input_blocks.8"]: number;
      ["middle_block.0"]: number;
      ["middle_block.1"]: number;
      ["middle_block.2"]: number;
      ["output_blocks.0"]: number;
      ["output_blocks.1"]: number;
      ["output_blocks.2"]: number;
      ["output_blocks.3"]: number;
      ["output_blocks.4"]: number;
      ["output_blocks.5"]: number;
      ["output_blocks.6"]: number;
      ["output_blocks.7"]: number;
      ["output_blocks.8"]: number;
      ["out."]: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ModelMergeSD3_2B {
    /**
     * INPUT_TYPES: model1, model2, pos_embed., x_embedder., context_embedder., y_embedder., t_embedder., joint_blocks.0., joint_blocks.1., joint_blocks.2., joint_blocks.3., joint_blocks.4., joint_blocks.5., joint_blocks.6., joint_blocks.7., joint_blocks.8., joint_blocks.9., joint_blocks.10., joint_blocks.11., joint_blocks.12., joint_blocks.13., joint_blocks.14., joint_blocks.15., joint_blocks.16., joint_blocks.17., joint_blocks.18., joint_blocks.19., joint_blocks.20., joint_blocks.21., joint_blocks.22., joint_blocks.23., final_layer.
     */
    inputs?: {
      model1: unknown;
      model2: unknown;
      ["pos_embed."]: number;
      ["x_embedder."]: number;
      ["context_embedder."]: number;
      ["y_embedder."]: number;
      ["t_embedder."]: number;
      ["joint_blocks.0."]: number;
      ["joint_blocks.1."]: number;
      ["joint_blocks.2."]: number;
      ["joint_blocks.3."]: number;
      ["joint_blocks.4."]: number;
      ["joint_blocks.5."]: number;
      ["joint_blocks.6."]: number;
      ["joint_blocks.7."]: number;
      ["joint_blocks.8."]: number;
      ["joint_blocks.9."]: number;
      ["joint_blocks.10."]: number;
      ["joint_blocks.11."]: number;
      ["joint_blocks.12."]: number;
      ["joint_blocks.13."]: number;
      ["joint_blocks.14."]: number;
      ["joint_blocks.15."]: number;
      ["joint_blocks.16."]: number;
      ["joint_blocks.17."]: number;
      ["joint_blocks.18."]: number;
      ["joint_blocks.19."]: number;
      ["joint_blocks.20."]: number;
      ["joint_blocks.21."]: number;
      ["joint_blocks.22."]: number;
      ["joint_blocks.23."]: number;
      ["final_layer."]: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ModelMergeFlux1 {
    /**
     * INPUT_TYPES: model1, model2, img_in., time_in., guidance_in, vector_in., txt_in., double_blocks.0., double_blocks.1., double_blocks.2., double_blocks.3., double_blocks.4., double_blocks.5., double_blocks.6., double_blocks.7., double_blocks.8., double_blocks.9., double_blocks.10., double_blocks.11., double_blocks.12., double_blocks.13., double_blocks.14., double_blocks.15., double_blocks.16., double_blocks.17., double_blocks.18., single_blocks.0., single_blocks.1., single_blocks.2., single_blocks.3., single_blocks.4., single_blocks.5., single_blocks.6., single_blocks.7., single_blocks.8., single_blocks.9., single_blocks.10., single_blocks.11., single_blocks.12., single_blocks.13., single_blocks.14., single_blocks.15., single_blocks.16., single_blocks.17., single_blocks.18., single_blocks.19., single_blocks.20., single_blocks.21., single_blocks.22., single_blocks.23., single_blocks.24., single_blocks.25., single_blocks.26., single_blocks.27., single_blocks.28., single_blocks.29., single_blocks.30., single_blocks.31., single_blocks.32., single_blocks.33., single_blocks.34., single_blocks.35., single_blocks.36., single_blocks.37., final_layer.
     */
    inputs?: {
      model1: unknown;
      model2: unknown;
      ["img_in."]: number;
      ["time_in."]: number;
      guidance_in: number;
      ["vector_in."]: number;
      ["txt_in."]: number;
      ["double_blocks.0."]: number;
      ["double_blocks.1."]: number;
      ["double_blocks.2."]: number;
      ["double_blocks.3."]: number;
      ["double_blocks.4."]: number;
      ["double_blocks.5."]: number;
      ["double_blocks.6."]: number;
      ["double_blocks.7."]: number;
      ["double_blocks.8."]: number;
      ["double_blocks.9."]: number;
      ["double_blocks.10."]: number;
      ["double_blocks.11."]: number;
      ["double_blocks.12."]: number;
      ["double_blocks.13."]: number;
      ["double_blocks.14."]: number;
      ["double_blocks.15."]: number;
      ["double_blocks.16."]: number;
      ["double_blocks.17."]: number;
      ["double_blocks.18."]: number;
      ["single_blocks.0."]: number;
      ["single_blocks.1."]: number;
      ["single_blocks.2."]: number;
      ["single_blocks.3."]: number;
      ["single_blocks.4."]: number;
      ["single_blocks.5."]: number;
      ["single_blocks.6."]: number;
      ["single_blocks.7."]: number;
      ["single_blocks.8."]: number;
      ["single_blocks.9."]: number;
      ["single_blocks.10."]: number;
      ["single_blocks.11."]: number;
      ["single_blocks.12."]: number;
      ["single_blocks.13."]: number;
      ["single_blocks.14."]: number;
      ["single_blocks.15."]: number;
      ["single_blocks.16."]: number;
      ["single_blocks.17."]: number;
      ["single_blocks.18."]: number;
      ["single_blocks.19."]: number;
      ["single_blocks.20."]: number;
      ["single_blocks.21."]: number;
      ["single_blocks.22."]: number;
      ["single_blocks.23."]: number;
      ["single_blocks.24."]: number;
      ["single_blocks.25."]: number;
      ["single_blocks.26."]: number;
      ["single_blocks.27."]: number;
      ["single_blocks.28."]: number;
      ["single_blocks.29."]: number;
      ["single_blocks.30."]: number;
      ["single_blocks.31."]: number;
      ["single_blocks.32."]: number;
      ["single_blocks.33."]: number;
      ["single_blocks.34."]: number;
      ["single_blocks.35."]: number;
      ["single_blocks.36."]: number;
      ["single_blocks.37."]: number;
      ["final_layer."]: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface PerturbedAttentionGuidance {
    /**
     * INPUT_TYPES: model, scale
     */
    inputs?: {
      model: unknown;
      scale: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface AlignYourStepsScheduler {
    /**
     * INPUT_TYPES: model_type, steps, denoise
     */
    inputs?: {
      model_type: string;
      steps: number;
      denoise: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SIGMAS
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface UNetSelfAttentionMultiply {
    /**
     * INPUT_TYPES: model, q, k, v, out
     */
    inputs?: {
      model: unknown;
      q: number;
      k: number;
      v: number;
      out: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface UNetCrossAttentionMultiply {
    /**
     * INPUT_TYPES: model, q, k, v, out
     */
    inputs?: {
      model: unknown;
      q: number;
      k: number;
      v: number;
      out: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface CLIPAttentionMultiply {
    /**
     * INPUT_TYPES: clip, q, k, v, out
     */
    inputs?: {
      clip: unknown;
      q: number;
      k: number;
      v: number;
      out: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CLIP
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface UNetTemporalAttentionMultiply {
    /**
     * INPUT_TYPES: model, self_structural, self_temporal, cross_structural, cross_temporal
     */
    inputs?: {
      model: unknown;
      self_structural: number;
      self_temporal: number;
      cross_structural: number;
      cross_temporal: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface SamplerLCMUpscale {
    /**
     * INPUT_TYPES: scale_ratio, scale_steps, upscale_method
     */
    inputs?: {
      scale_ratio: number;
      scale_steps: number;
      upscale_method: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SAMPLER
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface SamplerEulerCFGpp {
    /**
     * INPUT_TYPES: version
     */
    inputs?: {
      version: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SAMPLER
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface WebcamCapture {
    /**
     * INPUT_TYPES: image, width, height, capture_on_queue
     */
    inputs?: {
      image: unknown;
      width: number;
      height: number;
      capture_on_queue: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface EmptyLatentAudio {
    /**
     * INPUT_TYPES: seconds
     */
    inputs?: {
      seconds: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface VAEEncodeAudio {
    /**
     * INPUT_TYPES: audio, vae
     */
    inputs?: {
      audio: unknown;
      vae: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface VAEDecodeAudio {
    /**
     * INPUT_TYPES: samples, vae
     */
    inputs?: {
      samples: unknown;
      vae: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: AUDIO
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface SaveAudio {
    /**
     * INPUT_TYPES: audio, filename_prefix
     */
    inputs?: {
      audio: unknown;
      filename_prefix: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  }

  export interface LoadAudio {
    /**
     * INPUT_TYPES: audio
     */
    inputs?: {
      audio: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: AUDIO
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface PreviewAudio {
    /**
     * INPUT_TYPES: audio
     */
    inputs?: {
      audio: unknown;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  }

  export interface TripleCLIPLoader {
    /**
     * INPUT_TYPES: clip_name1, clip_name2, clip_name3
     */
    inputs?: {
      clip_name1: string;
      clip_name2: string;
      clip_name3: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CLIP
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface EmptySD3LatentImage {
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
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface CLIPTextEncodeSD3 {
    /**
     * INPUT_TYPES: clip, clip_l, clip_g, t5xxl, empty_padding
     */
    inputs?: {
      clip: unknown;
      clip_l: string;
      clip_g: string;
      t5xxl: string;
      empty_padding: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ControlNetApplySD3 {
    /**
     * INPUT_TYPES: positive, negative, control_net, vae, image, strength, start_percent, end_percent
     */
    inputs?: {
      positive: unknown;
      negative: unknown;
      control_net: unknown;
      vae: unknown;
      image: unknown;
      strength: number;
      start_percent: number;
      end_percent: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING, CONDITIONING
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface GITSScheduler {
    /**
     * INPUT_TYPES: coeff, steps, denoise
     */
    inputs?: {
      coeff: number;
      steps: number;
      denoise: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SIGMAS
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface SetUnionControlNetType {
    /**
     * INPUT_TYPES: control_net, type
     */
    inputs?: {
      control_net: unknown;
      type: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONTROL_NET
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface CLIPTextEncodeHunyuanDiT {
    /**
     * INPUT_TYPES: clip, bert, mt5xl
     */
    inputs?: {
      clip: unknown;
      bert: string;
      mt5xl: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface CLIPTextEncodeFlux {
    /**
     * INPUT_TYPES: clip, clip_l, t5xxl, guidance
     */
    inputs?: {
      clip: unknown;
      clip_l: string;
      t5xxl: string;
      guidance: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface FluxGuidance {
    /**
     * INPUT_TYPES: conditioning, guidance
     */
    inputs?: {
      conditioning: unknown;
      guidance: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }
}
