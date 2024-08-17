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
    TimestepKeyframe?: TimestepKeyframe;
    LatentKeyframe?: LatentKeyframe;
    LatentKeyframeGroup?: LatentKeyframeGroup;
    LatentKeyframeBatchedGroup?: LatentKeyframeBatchedGroup;
    LatentKeyframeTiming?: LatentKeyframeTiming;
    ACN_AdvancedControlNetApply?: ACN_AdvancedControlNetApply;
    ControlNetLoaderAdvanced?: ControlNetLoaderAdvanced;
    DiffControlNetLoaderAdvanced?: DiffControlNetLoaderAdvanced;
    ScaledSoftControlNetWeights?: ScaledSoftControlNetWeights;
    ScaledSoftMaskedUniversalWeights?: ScaledSoftMaskedUniversalWeights;
    SoftControlNetWeights?: SoftControlNetWeights;
    CustomControlNetWeights?: CustomControlNetWeights;
    SoftT2IAdapterWeights?: SoftT2IAdapterWeights;
    CustomT2IAdapterWeights?: CustomT2IAdapterWeights;
    ACN_DefaultUniversalWeights?: ACN_DefaultUniversalWeights;
    ACN_SparseCtrlRGBPreprocessor?: ACN_SparseCtrlRGBPreprocessor;
    ACN_SparseCtrlLoaderAdvanced?: ACN_SparseCtrlLoaderAdvanced;
    ACN_SparseCtrlMergedLoaderAdvanced?: ACN_SparseCtrlMergedLoaderAdvanced;
    ACN_SparseCtrlIndexMethodNode?: ACN_SparseCtrlIndexMethodNode;
    ACN_SparseCtrlSpreadMethodNode?: ACN_SparseCtrlSpreadMethodNode;
    ACN_ReferencePreprocessor?: ACN_ReferencePreprocessor;
    ACN_ReferenceControlNet?: ACN_ReferenceControlNet;
    ACN_ReferenceControlNetFinetune?: ACN_ReferenceControlNetFinetune;
    LoadImagesFromDirectory?: LoadImagesFromDirectory;
    ADE_AnimateDiffLoRALoader?: ADE_AnimateDiffLoRALoader;
    ADE_AnimateDiffSamplingSettings?: ADE_AnimateDiffSamplingSettings;
    ADE_AnimateDiffKeyframe?: ADE_AnimateDiffKeyframe;
    ADE_MultivalDynamic?: ADE_MultivalDynamic;
    ADE_MultivalScaledMask?: ADE_MultivalScaledMask;
    ADE_StandardStaticContextOptions?: ADE_StandardStaticContextOptions;
    ADE_StandardUniformContextOptions?: ADE_StandardUniformContextOptions;
    ADE_LoopedUniformContextOptions?: ADE_LoopedUniformContextOptions;
    ADE_ViewsOnlyContextOptions?: ADE_ViewsOnlyContextOptions;
    ADE_BatchedContextOptions?: ADE_BatchedContextOptions;
    ADE_AnimateDiffUniformContextOptions?: ADE_AnimateDiffUniformContextOptions;
    ADE_StandardStaticViewOptions?: ADE_StandardStaticViewOptions;
    ADE_StandardUniformViewOptions?: ADE_StandardUniformViewOptions;
    ADE_LoopedUniformViewOptions?: ADE_LoopedUniformViewOptions;
    ADE_IterationOptsDefault?: ADE_IterationOptsDefault;
    ADE_IterationOptsFreeInit?: ADE_IterationOptsFreeInit;
    ADE_RegisterLoraHook?: ADE_RegisterLoraHook;
    ADE_RegisterLoraHookModelOnly?: ADE_RegisterLoraHookModelOnly;
    ADE_RegisterModelAsLoraHook?: ADE_RegisterModelAsLoraHook;
    ADE_RegisterModelAsLoraHookModelOnly?: ADE_RegisterModelAsLoraHookModelOnly;
    ADE_CombineLoraHooks?: ADE_CombineLoraHooks;
    ADE_CombineLoraHooksFour?: ADE_CombineLoraHooksFour;
    ADE_CombineLoraHooksEight?: ADE_CombineLoraHooksEight;
    ADE_SetLoraHookKeyframe?: ADE_SetLoraHookKeyframe;
    ADE_AttachLoraHookToCLIP?: ADE_AttachLoraHookToCLIP;
    ADE_LoraHookKeyframe?: ADE_LoraHookKeyframe;
    ADE_LoraHookKeyframeInterpolation?: ADE_LoraHookKeyframeInterpolation;
    ADE_LoraHookKeyframeFromStrengthList?: ADE_LoraHookKeyframeFromStrengthList;
    ADE_AttachLoraHookToConditioning?: ADE_AttachLoraHookToConditioning;
    ADE_PairedConditioningSetMask?: ADE_PairedConditioningSetMask;
    ADE_ConditioningSetMask?: ADE_ConditioningSetMask;
    ADE_PairedConditioningSetMaskAndCombine?: ADE_PairedConditioningSetMaskAndCombine;
    ADE_ConditioningSetMaskAndCombine?: ADE_ConditioningSetMaskAndCombine;
    ADE_PairedConditioningSetUnmaskedAndCombine?: ADE_PairedConditioningSetUnmaskedAndCombine;
    ADE_ConditioningSetUnmaskedAndCombine?: ADE_ConditioningSetUnmaskedAndCombine;
    ADE_TimestepsConditioning?: ADE_TimestepsConditioning;
    ADE_NoiseLayerAdd?: ADE_NoiseLayerAdd;
    ADE_NoiseLayerAddWeighted?: ADE_NoiseLayerAddWeighted;
    ADE_NoiseLayerReplace?: ADE_NoiseLayerReplace;
    ADE_AnimateDiffSettings?: ADE_AnimateDiffSettings;
    ADE_AdjustPESweetspotStretch?: ADE_AdjustPESweetspotStretch;
    ADE_AdjustPEFullStretch?: ADE_AdjustPEFullStretch;
    ADE_AdjustPEManual?: ADE_AdjustPEManual;
    ADE_AdjustWeightAllAdd?: ADE_AdjustWeightAllAdd;
    ADE_AdjustWeightAllMult?: ADE_AdjustWeightAllMult;
    ADE_AdjustWeightIndivAdd?: ADE_AdjustWeightIndivAdd;
    ADE_AdjustWeightIndivMult?: ADE_AdjustWeightIndivMult;
    ADE_AdjustWeightIndivAttnAdd?: ADE_AdjustWeightIndivAttnAdd;
    ADE_AdjustWeightIndivAttnMult?: ADE_AdjustWeightIndivAttnMult;
    ADE_CustomCFG?: ADE_CustomCFG;
    ADE_CustomCFGKeyframe?: ADE_CustomCFGKeyframe;
    ADE_SigmaSchedule?: ADE_SigmaSchedule;
    ADE_RawSigmaSchedule?: ADE_RawSigmaSchedule;
    ADE_SigmaScheduleWeightedAverage?: ADE_SigmaScheduleWeightedAverage;
    ADE_SigmaScheduleWeightedAverageInterp?: ADE_SigmaScheduleWeightedAverageInterp;
    ADE_SigmaScheduleSplitAndCombine?: ADE_SigmaScheduleSplitAndCombine;
    ADE_AnimateDiffUnload?: ADE_AnimateDiffUnload;
    ADE_EmptyLatentImageLarge?: ADE_EmptyLatentImageLarge;
    CheckpointLoaderSimpleWithNoiseSelect?: CheckpointLoaderSimpleWithNoiseSelect;
    ADE_AnimateDiffLoaderGen1?: ADE_AnimateDiffLoaderGen1;
    ADE_AnimateDiffLoaderWithContext?: ADE_AnimateDiffLoaderWithContext;
    ADE_UseEvolvedSampling?: ADE_UseEvolvedSampling;
    ADE_ApplyAnimateDiffModelSimple?: ADE_ApplyAnimateDiffModelSimple;
    ADE_ApplyAnimateDiffModel?: ADE_ApplyAnimateDiffModel;
    ADE_LoadAnimateDiffModel?: ADE_LoadAnimateDiffModel;
    ADE_ApplyAnimateLCMI2VModel?: ADE_ApplyAnimateLCMI2VModel;
    ADE_LoadAnimateLCMI2VModel?: ADE_LoadAnimateLCMI2VModel;
    ADE_UpscaleAndVAEEncode?: ADE_UpscaleAndVAEEncode;
    ADE_InjectI2VIntoAnimateDiffModel?: ADE_InjectI2VIntoAnimateDiffModel;
    ADE_ApplyAnimateDiffModelWithCameraCtrl?: ADE_ApplyAnimateDiffModelWithCameraCtrl;
    ADE_LoadAnimateDiffModelWithCameraCtrl?: ADE_LoadAnimateDiffModelWithCameraCtrl;
    ADE_CameraCtrlAnimateDiffKeyframe?: ADE_CameraCtrlAnimateDiffKeyframe;
    ADE_LoadCameraPoses?: ADE_LoadCameraPoses;
    ADE_CameraPoseBasic?: ADE_CameraPoseBasic;
    ADE_CameraPoseCombo?: ADE_CameraPoseCombo;
    ADE_CameraPoseAdvanced?: ADE_CameraPoseAdvanced;
    ADE_CameraManualPoseAppend?: ADE_CameraManualPoseAppend;
    ADE_ReplaceCameraParameters?: ADE_ReplaceCameraParameters;
    ADE_ReplaceOriginalPoseAspectRatio?: ADE_ReplaceOriginalPoseAspectRatio;
    AnimateDiffLoaderV1?: AnimateDiffLoaderV1;
    ADE_AnimateDiffLoaderV1Advanced?: ADE_AnimateDiffLoaderV1Advanced;
    ADE_AnimateDiffCombine?: ADE_AnimateDiffCombine;
    ADE_AnimateDiffModelSettings_Release?: ADE_AnimateDiffModelSettings_Release;
    ADE_AnimateDiffModelSettingsSimple?: ADE_AnimateDiffModelSettingsSimple;
    ADE_AnimateDiffModelSettings?: ADE_AnimateDiffModelSettings;
    ADE_AnimateDiffModelSettingsAdvancedAttnStrengths?: ADE_AnimateDiffModelSettingsAdvancedAttnStrengths;
    INTConstant?: INTConstant;
    FloatConstant?: FloatConstant;
    StringConstant?: StringConstant;
    StringConstantMultiline?: StringConstantMultiline;
    ConditioningMultiCombine?: ConditioningMultiCombine;
    ConditioningSetMaskAndCombine?: ConditioningSetMaskAndCombine;
    ConditioningSetMaskAndCombine3?: ConditioningSetMaskAndCombine3;
    ConditioningSetMaskAndCombine4?: ConditioningSetMaskAndCombine4;
    ConditioningSetMaskAndCombine5?: ConditioningSetMaskAndCombine5;
    CondPassThrough?: CondPassThrough;
    BatchCLIPSeg?: BatchCLIPSeg;
    ColorToMask?: ColorToMask;
    CreateGradientMask?: CreateGradientMask;
    CreateTextMask?: CreateTextMask;
    CreateAudioMask?: CreateAudioMask;
    CreateFadeMask?: CreateFadeMask;
    CreateFadeMaskAdvanced?: CreateFadeMaskAdvanced;
    CreateFluidMask?: CreateFluidMask;
    CreateShapeMask?: CreateShapeMask;
    CreateVoronoiMask?: CreateVoronoiMask;
    CreateMagicMask?: CreateMagicMask;
    GetMaskSizeAndCount?: GetMaskSizeAndCount;
    GrowMaskWithBlur?: GrowMaskWithBlur;
    MaskBatchMulti?: MaskBatchMulti;
    OffsetMask?: OffsetMask;
    RemapMaskRange?: RemapMaskRange;
    ResizeMask?: ResizeMask;
    RoundMask?: RoundMask;
    AddLabel?: AddLabel;
    ColorMatch?: ColorMatch;
    CrossFadeImages?: CrossFadeImages;
    GetImageRangeFromBatch?: GetImageRangeFromBatch;
    GetImageSizeAndCount?: GetImageSizeAndCount;
    ImageAndMaskPreview?: ImageAndMaskPreview;
    ImageBatchMulti?: ImageBatchMulti;
    ImageBatchRepeatInterleaving?: ImageBatchRepeatInterleaving;
    ImageBatchTestPattern?: ImageBatchTestPattern;
    ImageConcanate?: ImageConcanate;
    ImageGrabPIL?: ImageGrabPIL;
    ImageGridComposite2x2?: ImageGridComposite2x2;
    ImageGridComposite3x3?: ImageGridComposite3x3;
    ImageNormalize_Neg1_To_1?: ImageNormalize_Neg1_To_1;
    ImagePass?: ImagePass;
    ImagePadForOutpaintMasked?: ImagePadForOutpaintMasked;
    ImageUpscaleWithModelBatched?: ImageUpscaleWithModelBatched;
    InsertImagesToBatchIndexed?: InsertImagesToBatchIndexed;
    MergeImageChannels?: MergeImageChannels;
    RemapImageRange?: RemapImageRange;
    ReverseImageBatch?: ReverseImageBatch;
    ReplaceImagesInBatch?: ReplaceImagesInBatch;
    SaveImageWithAlpha?: SaveImageWithAlpha;
    SplitImageChannels?: SplitImageChannels;
    BatchCropFromMask?: BatchCropFromMask;
    BatchCropFromMaskAdvanced?: BatchCropFromMaskAdvanced;
    FilterZeroMasksAndCorrespondingImages?: FilterZeroMasksAndCorrespondingImages;
    InsertImageBatchByIndexes?: InsertImageBatchByIndexes;
    BatchUncrop?: BatchUncrop;
    BatchUncropAdvanced?: BatchUncropAdvanced;
    SplitBboxes?: SplitBboxes;
    BboxToInt?: BboxToInt;
    BboxVisualize?: BboxVisualize;
    GenerateNoise?: GenerateNoise;
    FlipSigmasAdjusted?: FlipSigmasAdjusted;
    InjectNoiseToLatent?: InjectNoiseToLatent;
    CustomSigmas?: CustomSigmas;
    WidgetToString?: WidgetToString;
    DummyLatentOut?: DummyLatentOut;
    GetLatentsFromBatchIndexed?: GetLatentsFromBatchIndexed;
    ScaleBatchPromptSchedule?: ScaleBatchPromptSchedule;
    CameraPoseVisualizer?: CameraPoseVisualizer;
    JoinStrings?: JoinStrings;
    JoinStringMulti?: JoinStringMulti;
    Sleep?: Sleep;
    VRAM_Debug?: VRAM_Debug;
    SomethingToString?: SomethingToString;
    EmptyLatentImagePresets?: EmptyLatentImagePresets;
    NormalizedAmplitudeToMask?: NormalizedAmplitudeToMask;
    NormalizedAmplitudeToFloatList?: NormalizedAmplitudeToFloatList;
    OffsetMaskByNormalizedAmplitude?: OffsetMaskByNormalizedAmplitude;
    ImageTransformByNormalizedAmplitude?: ImageTransformByNormalizedAmplitude;
    SplineEditor?: SplineEditor;
    CreateShapeMaskOnPath?: CreateShapeMaskOnPath;
    WeightScheduleExtend?: WeightScheduleExtend;
    MaskOrImageToWeight?: MaskOrImageToWeight;
    WeightScheduleConvert?: WeightScheduleConvert;
    FloatToMask?: FloatToMask;
    FloatToSigmas?: FloatToSigmas;
    PlotCoordinates?: PlotCoordinates;
    InterpolateCoords?: InterpolateCoords;
    StabilityAPI_SD3?: StabilityAPI_SD3;
    SoundReactive?: SoundReactive;
    StableZero123_BatchSchedule?: StableZero123_BatchSchedule;
    SV3D_BatchSchedule?: SV3D_BatchSchedule;
    LoadResAdapterNormalization?: LoadResAdapterNormalization;
    Superprompt?: Superprompt;
    GLIGENTextBoxApplyBatchCoords?: GLIGENTextBoxApplyBatchCoords;
    Intrinsic_lora_sampling?: Intrinsic_lora_sampling;
    CreateInstanceDiffusionTracking?: CreateInstanceDiffusionTracking;
    AppendInstanceDiffusionTracking?: AppendInstanceDiffusionTracking;
    DrawInstanceDiffusionTracking?: DrawInstanceDiffusionTracking;
    ETN_LoadImageBase64?: ETN_LoadImageBase64;
    ETN_LoadMaskBase64?: ETN_LoadMaskBase64;
    ETN_SendImageWebSocket?: ETN_SendImageWebSocket;
    ETN_CropImage?: ETN_CropImage;
    ETN_ApplyMaskToImage?: ETN_ApplyMaskToImage;
    ETN_TileLayout?: ETN_TileLayout;
    ETN_ExtractImageTile?: ETN_ExtractImageTile;
    ETN_ExtractMaskTile?: ETN_ExtractMaskTile;
    ETN_GenerateTileMask?: ETN_GenerateTileMask;
    ETN_MergeImageTile?: ETN_MergeImageTile;
    ETN_BackgroundRegion?: ETN_BackgroundRegion;
    ETN_DefineRegion?: ETN_DefineRegion;
    ETN_ListRegionMasks?: ETN_ListRegionMasks;
    ETN_AttentionMask?: ETN_AttentionMask;
    Robust_Video_Matting?: Robust_Video_Matting;
    BRIAAI_Matting?: BRIAAI_Matting;
    AnimeFace_SemSegPreprocessor?: AnimeFace_SemSegPreprocessor;
    BinaryPreprocessor?: BinaryPreprocessor;
    CannyEdgePreprocessor?: CannyEdgePreprocessor;
    ColorPreprocessor?: ColorPreprocessor;
    DensePosePreprocessor?: DensePosePreprocessor;
    DepthAnythingPreprocessor?: DepthAnythingPreprocessor;
    Zoe_DepthAnythingPreprocessor?: Zoe_DepthAnythingPreprocessor;
    DiffusionEdge_Preprocessor?: DiffusionEdge_Preprocessor;
    DSINE_NormalMapPreprocessor?: DSINE_NormalMapPreprocessor;
    DWPreprocessor?: DWPreprocessor;
    AnimalPosePreprocessor?: AnimalPosePreprocessor;
    HEDPreprocessor?: HEDPreprocessor;
    FakeScribblePreprocessor?: FakeScribblePreprocessor;
    InpaintPreprocessor?: InpaintPreprocessor;
    LeReS_DepthMapPreprocessor?: LeReS_DepthMapPreprocessor;
    LineArtPreprocessor?: LineArtPreprocessor;
    AnimeLineArtPreprocessor?: AnimeLineArtPreprocessor;
    LineartStandardPreprocessor?: LineartStandardPreprocessor;
    Manga2Anime_LineArt_Preprocessor?: Manga2Anime_LineArt_Preprocessor;
    MediaPipe_FaceMeshPreprocessor?: MediaPipe_FaceMeshPreprocessor;
    MeshGraphormer_DepthMapPreprocessor?: MeshGraphormer_DepthMapPreprocessor;
    MeshGraphormer_ImpactDetector_DepthMapPreprocessor?: MeshGraphormer_ImpactDetector_DepthMapPreprocessor;
    MiDaS_NormalMapPreprocessor?: MiDaS_NormalMapPreprocessor;
    MiDaS_DepthMapPreprocessor?: MiDaS_DepthMapPreprocessor;
    M_LSDPreprocessor?: M_LSDPreprocessor;
    BAE_NormalMapPreprocessor?: BAE_NormalMapPreprocessor;
    OneFormer_COCO_SemSegPreprocessor?: OneFormer_COCO_SemSegPreprocessor;
    OneFormer_ADE20K_SemSegPreprocessor?: OneFormer_ADE20K_SemSegPreprocessor;
    OpenposePreprocessor?: OpenposePreprocessor;
    PiDiNetPreprocessor?: PiDiNetPreprocessor;
    SavePoseKpsAsJsonFile?: SavePoseKpsAsJsonFile;
    FacialPartColoringFromPoseKps?: FacialPartColoringFromPoseKps;
    ImageLuminanceDetector?: ImageLuminanceDetector;
    ImageIntensityDetector?: ImageIntensityDetector;
    ScribblePreprocessor?: ScribblePreprocessor;
    Scribble_XDoG_Preprocessor?: Scribble_XDoG_Preprocessor;
    Scribble_PiDiNet_Preprocessor?: Scribble_PiDiNet_Preprocessor;
    SAMPreprocessor?: SAMPreprocessor;
    ShufflePreprocessor?: ShufflePreprocessor;
    TEEDPreprocessor?: TEEDPreprocessor;
    TilePreprocessor?: TilePreprocessor;
    UniFormer_SemSegPreprocessor?: UniFormer_SemSegPreprocessor;
    SemSegPreprocessor?: SemSegPreprocessor;
    Unimatch_OptFlowPreprocessor?: Unimatch_OptFlowPreprocessor;
    MaskOptFlow?: MaskOptFlow;
    Zoe_DepthMapPreprocessor?: Zoe_DepthMapPreprocessor;
    AIO_Preprocessor?: AIO_Preprocessor;
    ControlNetPreprocessorSelector?: ControlNetPreprocessorSelector;
    PixelPerfectResolution?: PixelPerfectResolution;
    ImageGenResolutionFromImage?: ImageGenResolutionFromImage;
    ImageGenResolutionFromLatent?: ImageGenResolutionFromLatent;
    HintImageEnchance?: HintImageEnchance;
    GetImageSize_?: GetImageSize_;
    ImageResize_?: ImageResize_;
    ImageCrop_?: ImageCrop_;
    ImageFlip_?: ImageFlip_;
    ImageDesaturate_?: ImageDesaturate_;
    ImagePosterize_?: ImagePosterize_;
    ImageCASharpening_?: ImageCASharpening_;
    ImageSeamCarving_?: ImageSeamCarving_;
    ImageEnhanceDifference_?: ImageEnhanceDifference_;
    ImageExpandBatch_?: ImageExpandBatch_;
    ImageFromBatch_?: ImageFromBatch_;
    ImageListToBatch_?: ImageListToBatch_;
    ImageCompositeFromMaskBatch_?: ImageCompositeFromMaskBatch_;
    ExtractKeyframes_?: ExtractKeyframes_;
    ImageApplyLUT_?: ImageApplyLUT_;
    PixelOEPixelize_?: PixelOEPixelize_;
    MaskBlur_?: MaskBlur_;
    MaskFlip_?: MaskFlip_;
    MaskPreview_?: MaskPreview_;
    MaskBatch_?: MaskBatch_;
    MaskExpandBatch_?: MaskExpandBatch_;
    TransitionMask_?: TransitionMask_;
    MaskFromColor_?: MaskFromColor_;
    MaskFromBatch_?: MaskFromBatch_;
    MaskBoundingBox_?: MaskBoundingBox_;
    MaskFromSegmentation_?: MaskFromSegmentation_;
    MaskFromRGBCMYBW_?: MaskFromRGBCMYBW_;
    MaskSmooth_?: MaskSmooth_;
    MaskFromList_?: MaskFromList_;
    SimpleMath_?: SimpleMath_;
    ConsoleDebug_?: ConsoleDebug_;
    DebugTensorShape_?: DebugTensorShape_;
    ModelCompile_?: ModelCompile_;
    BatchCount_?: BatchCount_;
    KSamplerVariationsStochastic_?: KSamplerVariationsStochastic_;
    KSamplerVariationsWithNoise_?: KSamplerVariationsWithNoise_;
    CLIPTextEncodeSDXL_?: CLIPTextEncodeSDXL_;
    SDXLEmptyLatentSizePicker_?: SDXLEmptyLatentSizePicker_;
    DrawText_?: DrawText_;
    RemBGSession_?: RemBGSession_;
    ImageRemoveBackground_?: ImageRemoveBackground_;
    RemoveLatentMask_?: RemoveLatentMask_;
    ConditioningCombineMultiple_?: ConditioningCombineMultiple_;
    ImageBatchMultiple_?: ImageBatchMultiple_;
    KSampler__Efficient_?: KSampler__Efficient_;
    KSampler_Adv___Efficient_?: KSampler_Adv___Efficient_;
    KSampler_SDXL__Eff__?: KSampler_SDXL__Eff__;
    Efficient_Loader?: Efficient_Loader;
    Eff__Loader_SDXL?: Eff__Loader_SDXL;
    LoRA_Stacker?: LoRA_Stacker;
    Control_Net_Stacker?: Control_Net_Stacker;
    Apply_ControlNet_Stack?: Apply_ControlNet_Stack;
    Unpack_SDXL_Tuple?: Unpack_SDXL_Tuple;
    Pack_SDXL_Tuple?: Pack_SDXL_Tuple;
    XY_Plot?: XY_Plot;
    XY_Input__Seeds___Batch?: XY_Input__Seeds___Batch;
    XY_Input__Add_Return_Noise?: XY_Input__Add_Return_Noise;
    XY_Input__Steps?: XY_Input__Steps;
    XY_Input__CFG_Scale?: XY_Input__CFG_Scale;
    XY_Input__Sampler_Scheduler?: XY_Input__Sampler_Scheduler;
    XY_Input__Denoise?: XY_Input__Denoise;
    XY_Input__VAE?: XY_Input__VAE;
    XY_Input__Prompt_S_R?: XY_Input__Prompt_S_R;
    XY_Input__Aesthetic_Score?: XY_Input__Aesthetic_Score;
    XY_Input__Refiner_On_Off?: XY_Input__Refiner_On_Off;
    XY_Input__Checkpoint?: XY_Input__Checkpoint;
    XY_Input__Clip_Skip?: XY_Input__Clip_Skip;
    XY_Input__LoRA?: XY_Input__LoRA;
    XY_Input__LoRA_Plot?: XY_Input__LoRA_Plot;
    XY_Input__LoRA_Stacks?: XY_Input__LoRA_Stacks;
    XY_Input__Control_Net?: XY_Input__Control_Net;
    XY_Input__Control_Net_Plot?: XY_Input__Control_Net_Plot;
    XY_Input__Manual_XY_Entry?: XY_Input__Manual_XY_Entry;
    Join_XY_Inputs_of_Same_Type?: Join_XY_Inputs_of_Same_Type;
    Image_Overlay?: Image_Overlay;
    Noise_Control_Script?: Noise_Control_Script;
    HighRes_Fix_Script?: HighRes_Fix_Script;
    Tiled_Upscaler_Script?: Tiled_Upscaler_Script;
    LoRA_Stack_to_String_converter?: LoRA_Stack_to_String_converter;
    Evaluate_Integers?: Evaluate_Integers;
    Evaluate_Floats?: Evaluate_Floats;
    Evaluate_Strings?: Evaluate_Strings;
    SaveImageWebsocket?: SaveImageWebsocket;
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
    /** NO_OUTPUTS */
    outputs?: [];
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
    /** NO_OUTPUTS */
    outputs?: [];
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
    /** NO_OUTPUTS */
    outputs?: [];
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
    /** NO_OUTPUTS */
    outputs?: [];
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
    /** NO_OUTPUTS */
    outputs?: [];
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
    /** NO_OUTPUTS */
    outputs?: [];
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
    /** NO_OUTPUTS */
    outputs?: [];
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
    /** NO_OUTPUTS */
    outputs?: [];
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
    /** NO_OUTPUTS */
    outputs?: [];
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
    /** NO_OUTPUTS */
    outputs?: [];
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
    /** NO_OUTPUTS */
    outputs?: [];
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

  export interface TimestepKeyframe {
    /**
     * INPUT_TYPES: start_percent
     */
    inputs?: {
      start_percent: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: TIMESTEP_KEYFRAME
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface LatentKeyframe {
    /**
     * INPUT_TYPES: batch_index, strength
     */
    inputs?: {
      batch_index: number;
      strength: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT_KEYFRAME
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface LatentKeyframeGroup {
    /**
     * INPUT_TYPES: index_strengths
     */
    inputs?: {
      index_strengths: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT_KEYFRAME
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface LatentKeyframeBatchedGroup {
    /**
     * INPUT_TYPES: float_strengths
     */
    inputs?: {
      float_strengths: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT_KEYFRAME
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface LatentKeyframeTiming {
    /**
     * INPUT_TYPES: batch_index_from, batch_index_to_excl, strength_from, strength_to, interpolation
     */
    inputs?: {
      batch_index_from: number;
      batch_index_to_excl: number;
      strength_from: number;
      strength_to: number;
      interpolation: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT_KEYFRAME
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ACN_AdvancedControlNetApply {
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
     * RETURN_TYPES: CONDITIONING, CONDITIONING, MODEL
     */
    outputs?: [unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface ControlNetLoaderAdvanced {
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

  export interface DiffControlNetLoaderAdvanced {
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

  export interface ScaledSoftControlNetWeights {
    /**
     * INPUT_TYPES: base_multiplier, flip_weights
     */
    inputs?: {
      base_multiplier: number;
      flip_weights: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONTROL_NET_WEIGHTS, TIMESTEP_KEYFRAME
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface ScaledSoftMaskedUniversalWeights {
    /**
     * INPUT_TYPES: mask, min_base_multiplier, max_base_multiplier
     */
    inputs?: {
      mask: unknown;
      min_base_multiplier: number;
      max_base_multiplier: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONTROL_NET_WEIGHTS, TIMESTEP_KEYFRAME
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface SoftControlNetWeights {
    /**
     * INPUT_TYPES: weight_00, weight_01, weight_02, weight_03, weight_04, weight_05, weight_06, weight_07, weight_08, weight_09, weight_10, weight_11, weight_12, flip_weights
     */
    inputs?: {
      weight_00: number;
      weight_01: number;
      weight_02: number;
      weight_03: number;
      weight_04: number;
      weight_05: number;
      weight_06: number;
      weight_07: number;
      weight_08: number;
      weight_09: number;
      weight_10: number;
      weight_11: number;
      weight_12: number;
      flip_weights: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONTROL_NET_WEIGHTS, TIMESTEP_KEYFRAME
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface CustomControlNetWeights {
    /**
     * INPUT_TYPES: weight_00, weight_01, weight_02, weight_03, weight_04, weight_05, weight_06, weight_07, weight_08, weight_09, weight_10, weight_11, weight_12, flip_weights
     */
    inputs?: {
      weight_00: number;
      weight_01: number;
      weight_02: number;
      weight_03: number;
      weight_04: number;
      weight_05: number;
      weight_06: number;
      weight_07: number;
      weight_08: number;
      weight_09: number;
      weight_10: number;
      weight_11: number;
      weight_12: number;
      flip_weights: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONTROL_NET_WEIGHTS, TIMESTEP_KEYFRAME
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface SoftT2IAdapterWeights {
    /**
     * INPUT_TYPES: weight_00, weight_01, weight_02, weight_03, flip_weights
     */
    inputs?: {
      weight_00: number;
      weight_01: number;
      weight_02: number;
      weight_03: number;
      flip_weights: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONTROL_NET_WEIGHTS, TIMESTEP_KEYFRAME
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface CustomT2IAdapterWeights {
    /**
     * INPUT_TYPES: weight_00, weight_01, weight_02, weight_03, flip_weights
     */
    inputs?: {
      weight_00: number;
      weight_01: number;
      weight_02: number;
      weight_03: number;
      flip_weights: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONTROL_NET_WEIGHTS, TIMESTEP_KEYFRAME
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface ACN_DefaultUniversalWeights {
    /**
     * INPUT_TYPES:
     */
    inputs?: {
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONTROL_NET_WEIGHTS, TIMESTEP_KEYFRAME
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface ACN_SparseCtrlRGBPreprocessor {
    /**
     * INPUT_TYPES: image, vae, latent_size
     */
    inputs?: {
      image: unknown;
      vae: unknown;
      latent_size: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ACN_SparseCtrlLoaderAdvanced {
    /**
     * INPUT_TYPES: sparsectrl_name, use_motion, motion_strength, motion_scale
     */
    inputs?: {
      sparsectrl_name: string;
      use_motion: unknown;
      motion_strength: number;
      motion_scale: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONTROL_NET
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ACN_SparseCtrlMergedLoaderAdvanced {
    /**
     * INPUT_TYPES: sparsectrl_name, control_net_name, use_motion, motion_strength, motion_scale
     */
    inputs?: {
      sparsectrl_name: string;
      control_net_name: string;
      use_motion: unknown;
      motion_strength: number;
      motion_scale: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONTROL_NET
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ACN_SparseCtrlIndexMethodNode {
    /**
     * INPUT_TYPES: indexes
     */
    inputs?: {
      indexes: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SPARSE_METHOD
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ACN_SparseCtrlSpreadMethodNode {
    /**
     * INPUT_TYPES: spread
     */
    inputs?: {
      spread: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SPARSE_METHOD
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ACN_ReferencePreprocessor {
    /**
     * INPUT_TYPES: image, vae, latent_size
     */
    inputs?: {
      image: unknown;
      vae: unknown;
      latent_size: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ACN_ReferenceControlNet {
    /**
     * INPUT_TYPES: reference_type, style_fidelity, ref_weight
     */
    inputs?: {
      reference_type: string;
      style_fidelity: number;
      ref_weight: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONTROL_NET
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ACN_ReferenceControlNetFinetune {
    /**
     * INPUT_TYPES: attn_style_fidelity, attn_ref_weight, attn_strength, adain_style_fidelity, adain_ref_weight, adain_strength
     */
    inputs?: {
      attn_style_fidelity: number;
      attn_ref_weight: number;
      attn_strength: number;
      adain_style_fidelity: number;
      adain_ref_weight: number;
      adain_strength: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONTROL_NET
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface LoadImagesFromDirectory {
    /**
     * INPUT_TYPES: directory
     */
    inputs?: {
      directory: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE, MASK, INT
     */
    outputs?: [unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface ADE_AnimateDiffLoRALoader {
    /**
     * INPUT_TYPES: lora_name, strength
     */
    inputs?: {
      lora_name: string;
      strength: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MOTION_LORA
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_AnimateDiffSamplingSettings {
    /**
     * INPUT_TYPES: batch_offset, noise_type, seed_gen, seed_offset
     */
    inputs?: {
      batch_offset: number;
      noise_type: string;
      seed_gen: string;
      seed_offset: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SAMPLE_SETTINGS
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_AnimateDiffKeyframe {
    /**
     * INPUT_TYPES: start_percent
     */
    inputs?: {
      start_percent: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: AD_KEYFRAMES
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_MultivalDynamic {
    /**
     * INPUT_TYPES: float_val
     */
    inputs?: {
      float_val: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MULTIVAL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_MultivalScaledMask {
    /**
     * INPUT_TYPES: min_float_val, max_float_val, mask
     */
    inputs?: {
      min_float_val: number;
      max_float_val: number;
      mask: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MULTIVAL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_StandardStaticContextOptions {
    /**
     * INPUT_TYPES: context_length, context_overlap
     */
    inputs?: {
      context_length: number;
      context_overlap: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONTEXT_OPTIONS
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_StandardUniformContextOptions {
    /**
     * INPUT_TYPES: context_length, context_stride, context_overlap
     */
    inputs?: {
      context_length: number;
      context_stride: number;
      context_overlap: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONTEXT_OPTIONS
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_LoopedUniformContextOptions {
    /**
     * INPUT_TYPES: context_length, context_stride, context_overlap, closed_loop
     */
    inputs?: {
      context_length: number;
      context_stride: number;
      context_overlap: number;
      closed_loop: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONTEXT_OPTIONS
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_ViewsOnlyContextOptions {
    /**
     * INPUT_TYPES: view_opts_req
     */
    inputs?: {
      view_opts_req: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONTEXT_OPTIONS
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_BatchedContextOptions {
    /**
     * INPUT_TYPES: context_length
     */
    inputs?: {
      context_length: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONTEXT_OPTIONS
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_AnimateDiffUniformContextOptions {
    /**
     * INPUT_TYPES: context_length, context_stride, context_overlap, context_schedule, closed_loop
     */
    inputs?: {
      context_length: number;
      context_stride: number;
      context_overlap: number;
      context_schedule: string;
      closed_loop: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONTEXT_OPTIONS
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_StandardStaticViewOptions {
    /**
     * INPUT_TYPES: view_length, view_overlap
     */
    inputs?: {
      view_length: number;
      view_overlap: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: VIEW_OPTS
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_StandardUniformViewOptions {
    /**
     * INPUT_TYPES: view_length, view_stride, view_overlap
     */
    inputs?: {
      view_length: number;
      view_stride: number;
      view_overlap: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: VIEW_OPTS
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_LoopedUniformViewOptions {
    /**
     * INPUT_TYPES: view_length, view_stride, view_overlap, closed_loop
     */
    inputs?: {
      view_length: number;
      view_stride: number;
      view_overlap: number;
      closed_loop: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: VIEW_OPTS
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_IterationOptsDefault {
    /**
     * INPUT_TYPES: iterations
     */
    inputs?: {
      iterations: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: ITERATION_OPTS
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_IterationOptsFreeInit {
    /**
     * INPUT_TYPES: iterations, filter, d_s, d_t, n_butterworth, sigma_step, apply_to_1st_iter, init_type
     */
    inputs?: {
      iterations: number;
      filter: string;
      d_s: number;
      d_t: number;
      n_butterworth: number;
      sigma_step: number;
      apply_to_1st_iter: unknown;
      init_type: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: ITERATION_OPTS
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_RegisterLoraHook {
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
     * RETURN_TYPES: MODEL, CLIP, LORA_HOOK
     */
    outputs?: [unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface ADE_RegisterLoraHookModelOnly {
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
     * RETURN_TYPES: MODEL, LORA_HOOK
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface ADE_RegisterModelAsLoraHook {
    /**
     * INPUT_TYPES: model, clip, ckpt_name, strength_model, strength_clip
     */
    inputs?: {
      model: unknown;
      clip: unknown;
      ckpt_name: string;
      strength_model: number;
      strength_clip: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL, CLIP, LORA_HOOK
     */
    outputs?: [unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface ADE_RegisterModelAsLoraHookModelOnly {
    /**
     * INPUT_TYPES: model, ckpt_name, strength_model
     */
    inputs?: {
      model: unknown;
      ckpt_name: string;
      strength_model: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL, LORA_HOOK
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface ADE_CombineLoraHooks {
    /**
     * INPUT_TYPES:
     */
    inputs?: {
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LORA_HOOK
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_CombineLoraHooksFour {
    /**
     * INPUT_TYPES:
     */
    inputs?: {
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LORA_HOOK
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_CombineLoraHooksEight {
    /**
     * INPUT_TYPES:
     */
    inputs?: {
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LORA_HOOK
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_SetLoraHookKeyframe {
    /**
     * INPUT_TYPES: lora_hook, hook_kf
     */
    inputs?: {
      lora_hook: unknown;
      hook_kf: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LORA_HOOK
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_AttachLoraHookToCLIP {
    /**
     * INPUT_TYPES: clip, lora_hook
     */
    inputs?: {
      clip: unknown;
      lora_hook: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CLIP
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_LoraHookKeyframe {
    /**
     * INPUT_TYPES: strength_model, start_percent, guarantee_steps
     */
    inputs?: {
      strength_model: number;
      start_percent: number;
      guarantee_steps: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LORA_HOOK_KEYFRAMES
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_LoraHookKeyframeInterpolation {
    /**
     * INPUT_TYPES: start_percent, end_percent, strength_start, strength_end, interpolation, intervals, print_keyframes
     */
    inputs?: {
      start_percent: number;
      end_percent: number;
      strength_start: number;
      strength_end: number;
      interpolation: string;
      intervals: number;
      print_keyframes: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LORA_HOOK_KEYFRAMES
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_LoraHookKeyframeFromStrengthList {
    /**
     * INPUT_TYPES: strengths_float, start_percent, end_percent, print_keyframes
     */
    inputs?: {
      strengths_float: number;
      start_percent: number;
      end_percent: number;
      print_keyframes: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LORA_HOOK_KEYFRAMES
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_AttachLoraHookToConditioning {
    /**
     * INPUT_TYPES: conditioning, lora_hook
     */
    inputs?: {
      conditioning: unknown;
      lora_hook: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_PairedConditioningSetMask {
    /**
     * INPUT_TYPES: positive_ADD, negative_ADD, strength, set_cond_area
     */
    inputs?: {
      positive_ADD: unknown;
      negative_ADD: unknown;
      strength: number;
      set_cond_area: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING, CONDITIONING
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface ADE_ConditioningSetMask {
    /**
     * INPUT_TYPES: cond_ADD, strength, set_cond_area
     */
    inputs?: {
      cond_ADD: unknown;
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

  export interface ADE_PairedConditioningSetMaskAndCombine {
    /**
     * INPUT_TYPES: positive, negative, positive_ADD, negative_ADD, strength, set_cond_area
     */
    inputs?: {
      positive: unknown;
      negative: unknown;
      positive_ADD: unknown;
      negative_ADD: unknown;
      strength: number;
      set_cond_area: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING, CONDITIONING
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface ADE_ConditioningSetMaskAndCombine {
    /**
     * INPUT_TYPES: cond, cond_ADD, strength, set_cond_area
     */
    inputs?: {
      cond: unknown;
      cond_ADD: unknown;
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

  export interface ADE_PairedConditioningSetUnmaskedAndCombine {
    /**
     * INPUT_TYPES: positive, negative, positive_DEFAULT, negative_DEFAULT
     */
    inputs?: {
      positive: unknown;
      negative: unknown;
      positive_DEFAULT: unknown;
      negative_DEFAULT: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING, CONDITIONING
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface ADE_ConditioningSetUnmaskedAndCombine {
    /**
     * INPUT_TYPES: cond, cond_DEFAULT
     */
    inputs?: {
      cond: unknown;
      cond_DEFAULT: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_TimestepsConditioning {
    /**
     * INPUT_TYPES: start_percent, end_percent
     */
    inputs?: {
      start_percent: number;
      end_percent: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: TIMESTEPS_COND
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_NoiseLayerAdd {
    /**
     * INPUT_TYPES: batch_offset, noise_type, seed_gen_override, seed_offset, noise_weight
     */
    inputs?: {
      batch_offset: number;
      noise_type: string;
      seed_gen_override: string;
      seed_offset: number;
      noise_weight: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: NOISE_LAYERS
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_NoiseLayerAddWeighted {
    /**
     * INPUT_TYPES: batch_offset, noise_type, seed_gen_override, seed_offset, noise_weight, balance_multiplier
     */
    inputs?: {
      batch_offset: number;
      noise_type: string;
      seed_gen_override: string;
      seed_offset: number;
      noise_weight: number;
      balance_multiplier: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: NOISE_LAYERS
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_NoiseLayerReplace {
    /**
     * INPUT_TYPES: batch_offset, noise_type, seed_gen_override, seed_offset
     */
    inputs?: {
      batch_offset: number;
      noise_type: string;
      seed_gen_override: string;
      seed_offset: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: NOISE_LAYERS
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_AnimateDiffSettings {
    /**
     * INPUT_TYPES:
     */
    inputs?: {
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: AD_SETTINGS
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_AdjustPESweetspotStretch {
    /**
     * INPUT_TYPES: sweetspot, new_sweetspot, print_adjustment
     */
    inputs?: {
      sweetspot: number;
      new_sweetspot: number;
      print_adjustment: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: PE_ADJUST
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_AdjustPEFullStretch {
    /**
     * INPUT_TYPES: pe_stretch, print_adjustment
     */
    inputs?: {
      pe_stretch: number;
      print_adjustment: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: PE_ADJUST
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_AdjustPEManual {
    /**
     * INPUT_TYPES: cap_initial_pe_length, interpolate_pe_to_length, initial_pe_idx_offset, final_pe_idx_offset, print_adjustment
     */
    inputs?: {
      cap_initial_pe_length: number;
      interpolate_pe_to_length: number;
      initial_pe_idx_offset: number;
      final_pe_idx_offset: number;
      print_adjustment: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: PE_ADJUST
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_AdjustWeightAllAdd {
    /**
     * INPUT_TYPES: all_ADD, print_adjustment
     */
    inputs?: {
      all_ADD: number;
      print_adjustment: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: WEIGHT_ADJUST
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_AdjustWeightAllMult {
    /**
     * INPUT_TYPES: all_MULT, print_adjustment
     */
    inputs?: {
      all_MULT: number;
      print_adjustment: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: WEIGHT_ADJUST
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_AdjustWeightIndivAdd {
    /**
     * INPUT_TYPES: pe_ADD, attn_ADD, other_ADD, print_adjustment
     */
    inputs?: {
      pe_ADD: number;
      attn_ADD: number;
      other_ADD: number;
      print_adjustment: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: WEIGHT_ADJUST
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_AdjustWeightIndivMult {
    /**
     * INPUT_TYPES: pe_MULT, attn_MULT, other_MULT, print_adjustment
     */
    inputs?: {
      pe_MULT: number;
      attn_MULT: number;
      other_MULT: number;
      print_adjustment: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: WEIGHT_ADJUST
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_AdjustWeightIndivAttnAdd {
    /**
     * INPUT_TYPES: pe_ADD, attn_ADD, attn_q_ADD, attn_k_ADD, attn_v_ADD, attn_out_weight_ADD, attn_out_bias_ADD, other_ADD, print_adjustment
     */
    inputs?: {
      pe_ADD: number;
      attn_ADD: number;
      attn_q_ADD: number;
      attn_k_ADD: number;
      attn_v_ADD: number;
      attn_out_weight_ADD: number;
      attn_out_bias_ADD: number;
      other_ADD: number;
      print_adjustment: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: WEIGHT_ADJUST
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_AdjustWeightIndivAttnMult {
    /**
     * INPUT_TYPES: pe_MULT, attn_MULT, attn_q_MULT, attn_k_MULT, attn_v_MULT, attn_out_weight_MULT, attn_out_bias_MULT, other_MULT, print_adjustment
     */
    inputs?: {
      pe_MULT: number;
      attn_MULT: number;
      attn_q_MULT: number;
      attn_k_MULT: number;
      attn_v_MULT: number;
      attn_out_weight_MULT: number;
      attn_out_bias_MULT: number;
      other_MULT: number;
      print_adjustment: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: WEIGHT_ADJUST
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_CustomCFG {
    /**
     * INPUT_TYPES: cfg_multival
     */
    inputs?: {
      cfg_multival: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CUSTOM_CFG
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_CustomCFGKeyframe {
    /**
     * INPUT_TYPES: cfg_multival, start_percent, guarantee_steps
     */
    inputs?: {
      cfg_multival: unknown;
      start_percent: number;
      guarantee_steps: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CUSTOM_CFG
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_SigmaSchedule {
    /**
     * INPUT_TYPES: beta_schedule
     */
    inputs?: {
      beta_schedule: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SIGMA_SCHEDULE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_RawSigmaSchedule {
    /**
     * INPUT_TYPES: raw_beta_schedule, linear_start, linear_end, sampling, lcm_original_timesteps, lcm_zsnr
     */
    inputs?: {
      raw_beta_schedule: string;
      linear_start: number;
      linear_end: number;
      sampling: string;
      lcm_original_timesteps: number;
      lcm_zsnr: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SIGMA_SCHEDULE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_SigmaScheduleWeightedAverage {
    /**
     * INPUT_TYPES: schedule_A, schedule_B, weight_A
     */
    inputs?: {
      schedule_A: unknown;
      schedule_B: unknown;
      weight_A: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SIGMA_SCHEDULE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_SigmaScheduleWeightedAverageInterp {
    /**
     * INPUT_TYPES: schedule_A, schedule_B, weight_A_Start, weight_A_End, interpolation
     */
    inputs?: {
      schedule_A: unknown;
      schedule_B: unknown;
      weight_A_Start: number;
      weight_A_End: number;
      interpolation: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SIGMA_SCHEDULE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_SigmaScheduleSplitAndCombine {
    /**
     * INPUT_TYPES: schedule_Start, schedule_End, idx_split_percent
     */
    inputs?: {
      schedule_Start: unknown;
      schedule_End: unknown;
      idx_split_percent: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SIGMA_SCHEDULE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_AnimateDiffUnload {
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

  export interface ADE_EmptyLatentImageLarge {
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

  export interface CheckpointLoaderSimpleWithNoiseSelect {
    /**
     * INPUT_TYPES: ckpt_name, beta_schedule
     */
    inputs?: {
      ckpt_name: string;
      beta_schedule: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL, CLIP, VAE
     */
    outputs?: [unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface ADE_AnimateDiffLoaderGen1 {
    /**
     * INPUT_TYPES: model, model_name, beta_schedule
     */
    inputs?: {
      model: unknown;
      model_name: string;
      beta_schedule: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_AnimateDiffLoaderWithContext {
    /**
     * INPUT_TYPES: model, model_name, beta_schedule
     */
    inputs?: {
      model: unknown;
      model_name: string;
      beta_schedule: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_UseEvolvedSampling {
    /**
     * INPUT_TYPES: model, beta_schedule
     */
    inputs?: {
      model: unknown;
      beta_schedule: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_ApplyAnimateDiffModelSimple {
    /**
     * INPUT_TYPES: motion_model
     */
    inputs?: {
      motion_model: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: M_MODELS
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_ApplyAnimateDiffModel {
    /**
     * INPUT_TYPES: motion_model, start_percent, end_percent
     */
    inputs?: {
      motion_model: unknown;
      start_percent: number;
      end_percent: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: M_MODELS
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_LoadAnimateDiffModel {
    /**
     * INPUT_TYPES: model_name
     */
    inputs?: {
      model_name: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MOTION_MODEL_ADE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_ApplyAnimateLCMI2VModel {
    /**
     * INPUT_TYPES: motion_model, ref_latent, ref_drift, apply_ref_when_disabled, start_percent, end_percent
     */
    inputs?: {
      motion_model: unknown;
      ref_latent: unknown;
      ref_drift: number;
      apply_ref_when_disabled: unknown;
      start_percent: number;
      end_percent: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: M_MODELS
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_LoadAnimateLCMI2VModel {
    /**
     * INPUT_TYPES: model_name
     */
    inputs?: {
      model_name: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MOTION_MODEL_ADE, MOTION_MODEL_ADE
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface ADE_UpscaleAndVAEEncode {
    /**
     * INPUT_TYPES: image, vae, latent_size, scale_method, crop
     */
    inputs?: {
      image: unknown;
      vae: unknown;
      latent_size: unknown;
      scale_method: string;
      crop: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_InjectI2VIntoAnimateDiffModel {
    /**
     * INPUT_TYPES: model_name, motion_model
     */
    inputs?: {
      model_name: string;
      motion_model: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MOTION_MODEL_ADE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_ApplyAnimateDiffModelWithCameraCtrl {
    /**
     * INPUT_TYPES: motion_model, cameractrl_poses, start_percent, end_percent
     */
    inputs?: {
      motion_model: unknown;
      cameractrl_poses: unknown;
      start_percent: number;
      end_percent: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: M_MODELS
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_LoadAnimateDiffModelWithCameraCtrl {
    /**
     * INPUT_TYPES: model_name, camera_ctrl
     */
    inputs?: {
      model_name: string;
      camera_ctrl: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MOTION_MODEL_ADE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_CameraCtrlAnimateDiffKeyframe {
    /**
     * INPUT_TYPES: start_percent
     */
    inputs?: {
      start_percent: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: AD_KEYFRAMES
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_LoadCameraPoses {
    /**
     * INPUT_TYPES: pose_filename
     */
    inputs?: {
      pose_filename: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CAMERACTRL_POSES
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_CameraPoseBasic {
    /**
     * INPUT_TYPES: motion_type, speed, frame_length
     */
    inputs?: {
      motion_type: string;
      speed: number;
      frame_length: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CAMERACTRL_POSES
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_CameraPoseCombo {
    /**
     * INPUT_TYPES: motion_type1, motion_type2, motion_type3, motion_type4, motion_type5, motion_type6, speed, frame_length
     */
    inputs?: {
      motion_type1: string;
      motion_type2: string;
      motion_type3: string;
      motion_type4: string;
      motion_type5: string;
      motion_type6: string;
      speed: number;
      frame_length: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CAMERACTRL_POSES
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_CameraPoseAdvanced {
    /**
     * INPUT_TYPES: motion_type1, strength1, motion_type2, strength2, motion_type3, strength3, motion_type4, strength4, motion_type5, strength5, motion_type6, strength6, speed, frame_length
     */
    inputs?: {
      motion_type1: string;
      strength1: number;
      motion_type2: string;
      strength2: number;
      motion_type3: string;
      strength3: number;
      motion_type4: string;
      strength4: number;
      motion_type5: string;
      strength5: number;
      motion_type6: string;
      strength6: number;
      speed: number;
      frame_length: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CAMERACTRL_POSES
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_CameraManualPoseAppend {
    /**
     * INPUT_TYPES: poses_first, poses_last
     */
    inputs?: {
      poses_first: unknown;
      poses_last: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CAMERACTRL_POSES
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_ReplaceCameraParameters {
    /**
     * INPUT_TYPES: poses, fx, fy, cx, cy
     */
    inputs?: {
      poses: unknown;
      fx: number;
      fy: number;
      cx: number;
      cy: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CAMERACTRL_POSES
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_ReplaceOriginalPoseAspectRatio {
    /**
     * INPUT_TYPES: poses, orig_pose_width, orig_pose_height
     */
    inputs?: {
      poses: unknown;
      orig_pose_width: number;
      orig_pose_height: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CAMERACTRL_POSES
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface AnimateDiffLoaderV1 {
    /**
     * INPUT_TYPES: model, latents, model_name, unlimited_area_hack, beta_schedule
     */
    inputs?: {
      model: unknown;
      latents: unknown;
      model_name: string;
      unlimited_area_hack: unknown;
      beta_schedule: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL, LATENT
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface ADE_AnimateDiffLoaderV1Advanced {
    /**
     * INPUT_TYPES: model, latents, model_name, unlimited_area_hack, context_length, context_stride, context_overlap, context_schedule, closed_loop, beta_schedule
     */
    inputs?: {
      model: unknown;
      latents: unknown;
      model_name: string;
      unlimited_area_hack: unknown;
      context_length: number;
      context_stride: number;
      context_overlap: number;
      context_schedule: string;
      closed_loop: unknown;
      beta_schedule: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL, LATENT
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface ADE_AnimateDiffCombine {
    /**
     * INPUT_TYPES: images, frame_rate, loop_count, filename_prefix, format, pingpong, save_image
     */
    inputs?: {
      images: unknown;
      frame_rate: number;
      loop_count: number;
      filename_prefix: string;
      format: string;
      pingpong: unknown;
      save_image: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: GIF
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_AnimateDiffModelSettings_Release {
    /**
     * INPUT_TYPES: min_motion_scale, max_motion_scale
     */
    inputs?: {
      min_motion_scale: number;
      max_motion_scale: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: AD_SETTINGS
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_AnimateDiffModelSettingsSimple {
    /**
     * INPUT_TYPES: motion_pe_stretch
     */
    inputs?: {
      motion_pe_stretch: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: AD_SETTINGS
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_AnimateDiffModelSettings {
    /**
     * INPUT_TYPES: pe_strength, attn_strength, other_strength, motion_pe_stretch, cap_initial_pe_length, interpolate_pe_to_length, initial_pe_idx_offset, final_pe_idx_offset
     */
    inputs?: {
      pe_strength: number;
      attn_strength: number;
      other_strength: number;
      motion_pe_stretch: number;
      cap_initial_pe_length: number;
      interpolate_pe_to_length: number;
      initial_pe_idx_offset: number;
      final_pe_idx_offset: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: AD_SETTINGS
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ADE_AnimateDiffModelSettingsAdvancedAttnStrengths {
    /**
     * INPUT_TYPES: pe_strength, attn_strength, attn_q_strength, attn_k_strength, attn_v_strength, attn_out_weight_strength, attn_out_bias_strength, other_strength, motion_pe_stretch, cap_initial_pe_length, interpolate_pe_to_length, initial_pe_idx_offset, final_pe_idx_offset
     */
    inputs?: {
      pe_strength: number;
      attn_strength: number;
      attn_q_strength: number;
      attn_k_strength: number;
      attn_v_strength: number;
      attn_out_weight_strength: number;
      attn_out_bias_strength: number;
      other_strength: number;
      motion_pe_stretch: number;
      cap_initial_pe_length: number;
      interpolate_pe_to_length: number;
      initial_pe_idx_offset: number;
      final_pe_idx_offset: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: AD_SETTINGS
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface INTConstant {
    /**
     * INPUT_TYPES: value
     */
    inputs?: {
      value: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: INT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface FloatConstant {
    /**
     * INPUT_TYPES: value
     */
    inputs?: {
      value: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: FLOAT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface StringConstant {
    /**
     * INPUT_TYPES: string
     */
    inputs?: {
      string: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: STRING
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface StringConstantMultiline {
    /**
     * INPUT_TYPES: string, strip_newlines
     */
    inputs?: {
      string: string;
      strip_newlines: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: STRING
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ConditioningMultiCombine {
    /**
     * INPUT_TYPES: inputcount, conditioning_1, conditioning_2
     */
    inputs?: {
      inputcount: number;
      conditioning_1: unknown;
      conditioning_2: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING, INT
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface ConditioningSetMaskAndCombine {
    /**
     * INPUT_TYPES: positive_1, negative_1, positive_2, negative_2, mask_1, mask_2, mask_1_strength, mask_2_strength, set_cond_area
     */
    inputs?: {
      positive_1: unknown;
      negative_1: unknown;
      positive_2: unknown;
      negative_2: unknown;
      mask_1: unknown;
      mask_2: unknown;
      mask_1_strength: number;
      mask_2_strength: number;
      set_cond_area: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING, CONDITIONING
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface ConditioningSetMaskAndCombine3 {
    /**
     * INPUT_TYPES: positive_1, negative_1, positive_2, negative_2, positive_3, negative_3, mask_1, mask_2, mask_3, mask_1_strength, mask_2_strength, mask_3_strength, set_cond_area
     */
    inputs?: {
      positive_1: unknown;
      negative_1: unknown;
      positive_2: unknown;
      negative_2: unknown;
      positive_3: unknown;
      negative_3: unknown;
      mask_1: unknown;
      mask_2: unknown;
      mask_3: unknown;
      mask_1_strength: number;
      mask_2_strength: number;
      mask_3_strength: number;
      set_cond_area: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING, CONDITIONING
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface ConditioningSetMaskAndCombine4 {
    /**
     * INPUT_TYPES: positive_1, negative_1, positive_2, negative_2, positive_3, negative_3, positive_4, negative_4, mask_1, mask_2, mask_3, mask_4, mask_1_strength, mask_2_strength, mask_3_strength, mask_4_strength, set_cond_area
     */
    inputs?: {
      positive_1: unknown;
      negative_1: unknown;
      positive_2: unknown;
      negative_2: unknown;
      positive_3: unknown;
      negative_3: unknown;
      positive_4: unknown;
      negative_4: unknown;
      mask_1: unknown;
      mask_2: unknown;
      mask_3: unknown;
      mask_4: unknown;
      mask_1_strength: number;
      mask_2_strength: number;
      mask_3_strength: number;
      mask_4_strength: number;
      set_cond_area: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING, CONDITIONING
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface ConditioningSetMaskAndCombine5 {
    /**
     * INPUT_TYPES: positive_1, negative_1, positive_2, negative_2, positive_3, negative_3, positive_4, negative_4, positive_5, negative_5, mask_1, mask_2, mask_3, mask_4, mask_5, mask_1_strength, mask_2_strength, mask_3_strength, mask_4_strength, mask_5_strength, set_cond_area
     */
    inputs?: {
      positive_1: unknown;
      negative_1: unknown;
      positive_2: unknown;
      negative_2: unknown;
      positive_3: unknown;
      negative_3: unknown;
      positive_4: unknown;
      negative_4: unknown;
      positive_5: unknown;
      negative_5: unknown;
      mask_1: unknown;
      mask_2: unknown;
      mask_3: unknown;
      mask_4: unknown;
      mask_5: unknown;
      mask_1_strength: number;
      mask_2_strength: number;
      mask_3_strength: number;
      mask_4_strength: number;
      mask_5_strength: number;
      set_cond_area: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING, CONDITIONING
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface CondPassThrough {
    /**
     * INPUT_TYPES: positive, negative
     */
    inputs?: {
      positive: unknown;
      negative: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING, CONDITIONING
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface BatchCLIPSeg {
    /**
     * INPUT_TYPES: images, text, threshold, binary_mask, combine_mask, use_cuda
     */
    inputs?: {
      images: unknown;
      text: string;
      threshold: number;
      binary_mask: unknown;
      combine_mask: unknown;
      use_cuda: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ColorToMask {
    /**
     * INPUT_TYPES: images, invert, red, green, blue, threshold, per_batch
     */
    inputs?: {
      images: unknown;
      invert: unknown;
      red: number;
      green: number;
      blue: number;
      threshold: number;
      per_batch: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface CreateGradientMask {
    /**
     * INPUT_TYPES: invert, frames, width, height
     */
    inputs?: {
      invert: unknown;
      frames: number;
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

  export interface CreateTextMask {
    /**
     * INPUT_TYPES: invert, frames, text_x, text_y, font_size, font_color, text, font, width, height, start_rotation, end_rotation
     */
    inputs?: {
      invert: unknown;
      frames: number;
      text_x: number;
      text_y: number;
      font_size: number;
      font_color: string;
      text: string;
      font: string;
      width: number;
      height: number;
      start_rotation: number;
      end_rotation: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE, MASK
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface CreateAudioMask {
    /**
     * INPUT_TYPES: invert, frames, scale, audio_path, width, height
     */
    inputs?: {
      invert: unknown;
      frames: number;
      scale: number;
      audio_path: string;
      width: number;
      height: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface CreateFadeMask {
    /**
     * INPUT_TYPES: invert, frames, width, height, interpolation, start_level, midpoint_level, end_level, midpoint_frame
     */
    inputs?: {
      invert: unknown;
      frames: number;
      width: number;
      height: number;
      interpolation: string;
      start_level: number;
      midpoint_level: number;
      end_level: number;
      midpoint_frame: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface CreateFadeMaskAdvanced {
    /**
     * INPUT_TYPES: points_string, invert, frames, width, height, interpolation
     */
    inputs?: {
      points_string: string;
      invert: unknown;
      frames: number;
      width: number;
      height: number;
      interpolation: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface CreateFluidMask {
    /**
     * INPUT_TYPES: invert, frames, width, height, inflow_count, inflow_velocity, inflow_radius, inflow_padding, inflow_duration
     */
    inputs?: {
      invert: unknown;
      frames: number;
      width: number;
      height: number;
      inflow_count: number;
      inflow_velocity: number;
      inflow_radius: number;
      inflow_padding: number;
      inflow_duration: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE, MASK
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface CreateShapeMask {
    /**
     * INPUT_TYPES: shape, frames, location_x, location_y, grow, frame_width, frame_height, shape_width, shape_height
     */
    inputs?: {
      shape: string;
      frames: number;
      location_x: number;
      location_y: number;
      grow: number;
      frame_width: number;
      frame_height: number;
      shape_width: number;
      shape_height: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK, MASK
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface CreateVoronoiMask {
    /**
     * INPUT_TYPES: frames, num_points, line_width, speed, frame_width, frame_height
     */
    inputs?: {
      frames: number;
      num_points: number;
      line_width: number;
      speed: number;
      frame_width: number;
      frame_height: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK, MASK
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface CreateMagicMask {
    /**
     * INPUT_TYPES: frames, depth, distortion, seed, transitions, frame_width, frame_height
     */
    inputs?: {
      frames: number;
      depth: number;
      distortion: number;
      seed: number;
      transitions: number;
      frame_width: number;
      frame_height: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK, MASK
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface GetMaskSizeAndCount {
    /**
     * INPUT_TYPES: mask
     */
    inputs?: {
      mask: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK, INT, INT, INT
     */
    outputs?: [unknown, unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface GrowMaskWithBlur {
    /**
     * INPUT_TYPES: mask, expand, incremental_expandrate, tapered_corners, flip_input, blur_radius, lerp_alpha, decay_factor
     */
    inputs?: {
      mask: unknown;
      expand: number;
      incremental_expandrate: number;
      tapered_corners: unknown;
      flip_input: unknown;
      blur_radius: number;
      lerp_alpha: number;
      decay_factor: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK, MASK
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface MaskBatchMulti {
    /**
     * INPUT_TYPES: inputcount, mask_1, mask_2
     */
    inputs?: {
      inputcount: number;
      mask_1: unknown;
      mask_2: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface OffsetMask {
    /**
     * INPUT_TYPES: mask, x, y, angle, duplication_factor, roll, incremental, padding_mode
     */
    inputs?: {
      mask: unknown;
      x: number;
      y: number;
      angle: number;
      duplication_factor: number;
      roll: unknown;
      incremental: unknown;
      padding_mode: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface RemapMaskRange {
    /**
     * INPUT_TYPES: mask, min, max
     */
    inputs?: {
      mask: unknown;
      min: number;
      max: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ResizeMask {
    /**
     * INPUT_TYPES: mask, width, height, keep_proportions
     */
    inputs?: {
      mask: unknown;
      width: number;
      height: number;
      keep_proportions: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK, INT, INT
     */
    outputs?: [unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface RoundMask {
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

  export interface AddLabel {
    /**
     * INPUT_TYPES: image, text_x, text_y, height, font_size, font_color, label_color, font, text, direction
     */
    inputs?: {
      image: unknown;
      text_x: number;
      text_y: number;
      height: number;
      font_size: number;
      font_color: string;
      label_color: string;
      font: string;
      text: string;
      direction: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ColorMatch {
    /**
     * INPUT_TYPES: image_ref, image_target, method
     */
    inputs?: {
      image_ref: unknown;
      image_target: unknown;
      method: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface CrossFadeImages {
    /**
     * INPUT_TYPES: images_1, images_2, interpolation, transition_start_index, transitioning_frames, start_level, end_level
     */
    inputs?: {
      images_1: unknown;
      images_2: unknown;
      interpolation: string;
      transition_start_index: number;
      transitioning_frames: number;
      start_level: number;
      end_level: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface GetImageRangeFromBatch {
    /**
     * INPUT_TYPES: images, start_index, num_frames
     */
    inputs?: {
      images: unknown;
      start_index: number;
      num_frames: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface GetImageSizeAndCount {
    /**
     * INPUT_TYPES: image
     */
    inputs?: {
      image: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE, INT, INT, INT
     */
    outputs?: [unknown, unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface ImageAndMaskPreview {
    /**
     * INPUT_TYPES: mask_opacity, mask_color, pass_through
     */
    inputs?: {
      mask_opacity: number;
      mask_color: string;
      pass_through: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ImageBatchMulti {
    /**
     * INPUT_TYPES: inputcount, image_1, image_2
     */
    inputs?: {
      inputcount: number;
      image_1: unknown;
      image_2: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ImageBatchRepeatInterleaving {
    /**
     * INPUT_TYPES: images, repeats
     */
    inputs?: {
      images: unknown;
      repeats: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ImageBatchTestPattern {
    /**
     * INPUT_TYPES: batch_size, start_from, text_x, text_y, width, height, font, font_size
     */
    inputs?: {
      batch_size: number;
      start_from: number;
      text_x: number;
      text_y: number;
      width: number;
      height: number;
      font: string;
      font_size: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ImageConcanate {
    /**
     * INPUT_TYPES: image1, image2, direction, match_image_size
     */
    inputs?: {
      image1: unknown;
      image2: unknown;
      direction: string;
      match_image_size: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ImageGrabPIL {
    /**
     * INPUT_TYPES: x, y, width, height, num_frames, delay
     */
    inputs?: {
      x: number;
      y: number;
      width: number;
      height: number;
      num_frames: number;
      delay: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ImageGridComposite2x2 {
    /**
     * INPUT_TYPES: image1, image2, image3, image4
     */
    inputs?: {
      image1: unknown;
      image2: unknown;
      image3: unknown;
      image4: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ImageGridComposite3x3 {
    /**
     * INPUT_TYPES: image1, image2, image3, image4, image5, image6, image7, image8, image9
     */
    inputs?: {
      image1: unknown;
      image2: unknown;
      image3: unknown;
      image4: unknown;
      image5: unknown;
      image6: unknown;
      image7: unknown;
      image8: unknown;
      image9: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ImageNormalize_Neg1_To_1 {
    /**
     * INPUT_TYPES: images
     */
    inputs?: {
      images: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ImagePass {
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

  export interface ImagePadForOutpaintMasked {
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

  export interface ImageUpscaleWithModelBatched {
    /**
     * INPUT_TYPES: upscale_model, images, per_batch
     */
    inputs?: {
      upscale_model: unknown;
      images: unknown;
      per_batch: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface InsertImagesToBatchIndexed {
    /**
     * INPUT_TYPES: original_images, images_to_insert, indexes
     */
    inputs?: {
      original_images: unknown;
      images_to_insert: unknown;
      indexes: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface MergeImageChannels {
    /**
     * INPUT_TYPES: red, green, blue
     */
    inputs?: {
      red: unknown;
      green: unknown;
      blue: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface RemapImageRange {
    /**
     * INPUT_TYPES: image, min, max, clamp
     */
    inputs?: {
      image: unknown;
      min: number;
      max: number;
      clamp: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ReverseImageBatch {
    /**
     * INPUT_TYPES: images
     */
    inputs?: {
      images: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ReplaceImagesInBatch {
    /**
     * INPUT_TYPES: original_images, replacement_images, start_index
     */
    inputs?: {
      original_images: unknown;
      replacement_images: unknown;
      start_index: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface SaveImageWithAlpha {
    /**
     * INPUT_TYPES: images, mask, filename_prefix
     */
    inputs?: {
      images: unknown;
      mask: unknown;
      filename_prefix: string;
      [k: string]: unknown;
    };
    /** NO_OUTPUTS */
    outputs?: [];
    [k: string]: unknown;
  }

  export interface SplitImageChannels {
    /**
     * INPUT_TYPES: image
     */
    inputs?: {
      image: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE, IMAGE, IMAGE, MASK
     */
    outputs?: [unknown, unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface BatchCropFromMask {
    /**
     * INPUT_TYPES: original_images, masks, crop_size_mult, bbox_smooth_alpha
     */
    inputs?: {
      original_images: unknown;
      masks: unknown;
      crop_size_mult: number;
      bbox_smooth_alpha: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE, IMAGE, BBOX, INT, INT
     */
    outputs?: [unknown, unknown, unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface BatchCropFromMaskAdvanced {
    /**
     * INPUT_TYPES: original_images, masks, crop_size_mult, bbox_smooth_alpha
     */
    inputs?: {
      original_images: unknown;
      masks: unknown;
      crop_size_mult: number;
      bbox_smooth_alpha: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE, IMAGE, MASK, IMAGE, MASK, BBOX, BBOX, INT, INT
     */
    outputs?: [
      unknown,
      unknown,
      unknown,
      unknown,
      unknown,
      unknown,
      unknown,
      unknown,
      unknown,
    ];
    [k: string]: unknown;
  }

  export interface FilterZeroMasksAndCorrespondingImages {
    /**
     * INPUT_TYPES: masks
     */
    inputs?: {
      masks: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK, IMAGE, IMAGE, INDEXES
     */
    outputs?: [unknown, unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface InsertImageBatchByIndexes {
    /**
     * INPUT_TYPES: images, images_to_insert, insert_indexes
     */
    inputs?: {
      images: unknown;
      images_to_insert: unknown;
      insert_indexes: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface BatchUncrop {
    /**
     * INPUT_TYPES: original_images, cropped_images, bboxes, border_blending, crop_rescale, border_top, border_bottom, border_left, border_right
     */
    inputs?: {
      original_images: unknown;
      cropped_images: unknown;
      bboxes: unknown;
      border_blending: number;
      crop_rescale: number;
      border_top: unknown;
      border_bottom: unknown;
      border_left: unknown;
      border_right: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface BatchUncropAdvanced {
    /**
     * INPUT_TYPES: original_images, cropped_images, cropped_masks, combined_crop_mask, bboxes, border_blending, crop_rescale, use_combined_mask, use_square_mask
     */
    inputs?: {
      original_images: unknown;
      cropped_images: unknown;
      cropped_masks: unknown;
      combined_crop_mask: unknown;
      bboxes: unknown;
      border_blending: number;
      crop_rescale: number;
      use_combined_mask: unknown;
      use_square_mask: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface SplitBboxes {
    /**
     * INPUT_TYPES: bboxes, index
     */
    inputs?: {
      bboxes: unknown;
      index: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: BBOX, BBOX
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface BboxToInt {
    /**
     * INPUT_TYPES: bboxes, index
     */
    inputs?: {
      bboxes: unknown;
      index: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: INT, INT, INT, INT, INT, INT
     */
    outputs?: [unknown, unknown, unknown, unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface BboxVisualize {
    /**
     * INPUT_TYPES: images, bboxes, line_width
     */
    inputs?: {
      images: unknown;
      bboxes: unknown;
      line_width: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface GenerateNoise {
    /**
     * INPUT_TYPES: width, height, batch_size, seed, multiplier, constant_batch_noise, normalize
     */
    inputs?: {
      width: number;
      height: number;
      batch_size: number;
      seed: number;
      multiplier: number;
      constant_batch_noise: unknown;
      normalize: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface FlipSigmasAdjusted {
    /**
     * INPUT_TYPES: sigmas, divide_by_last_sigma, divide_by, offset_by
     */
    inputs?: {
      sigmas: unknown;
      divide_by_last_sigma: unknown;
      divide_by: number;
      offset_by: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SIGMAS, STRING
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface InjectNoiseToLatent {
    /**
     * INPUT_TYPES: latents, strength, noise, normalize, average
     */
    inputs?: {
      latents: unknown;
      strength: number;
      noise: unknown;
      normalize: unknown;
      average: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface CustomSigmas {
    /**
     * INPUT_TYPES: sigmas_string, interpolate_to_steps
     */
    inputs?: {
      sigmas_string: string;
      interpolate_to_steps: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SIGMAS
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface WidgetToString {
    /**
     * INPUT_TYPES: id, widget_name, return_all
     */
    inputs?: {
      id: number;
      widget_name: string;
      return_all: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: STRING
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface DummyLatentOut {
    /**
     * INPUT_TYPES: latent
     */
    inputs?: {
      latent: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface GetLatentsFromBatchIndexed {
    /**
     * INPUT_TYPES: latents, indexes
     */
    inputs?: {
      latents: unknown;
      indexes: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ScaleBatchPromptSchedule {
    /**
     * INPUT_TYPES: input_str, old_frame_count, new_frame_count
     */
    inputs?: {
      input_str: string;
      old_frame_count: number;
      new_frame_count: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: STRING
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface CameraPoseVisualizer {
    /**
     * INPUT_TYPES: pose_file_path, base_xval, zval, scale, use_exact_fx, relative_c2w, use_viewer
     */
    inputs?: {
      pose_file_path: string;
      base_xval: number;
      zval: number;
      scale: number;
      use_exact_fx: unknown;
      relative_c2w: unknown;
      use_viewer: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface JoinStrings {
    /**
     * INPUT_TYPES: string1, string2, delimiter
     */
    inputs?: {
      string1: string;
      string2: string;
      delimiter: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: STRING
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface JoinStringMulti {
    /**
     * INPUT_TYPES: inputcount, string_1, string_2, delimiter, return_list
     */
    inputs?: {
      inputcount: number;
      string_1: string;
      string_2: string;
      delimiter: string;
      return_list: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: STRING
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface Sleep {
    /**
     * INPUT_TYPES: input, minutes, seconds
     */
    inputs?: {
      input: string;
      minutes: number;
      seconds: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: *
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface VRAM_Debug {
    /**
     * INPUT_TYPES: empty_cache, gc_collect, unload_all_models
     */
    inputs?: {
      empty_cache: unknown;
      gc_collect: unknown;
      unload_all_models: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: *, IMAGE, MODEL, INT, INT
     */
    outputs?: [unknown, unknown, unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface SomethingToString {
    /**
     * INPUT_TYPES: input
     */
    inputs?: {
      input: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: STRING
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface EmptyLatentImagePresets {
    /**
     * INPUT_TYPES: dimensions, invert, batch_size
     */
    inputs?: {
      dimensions: string;
      invert: unknown;
      batch_size: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT, INT, INT
     */
    outputs?: [unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface NormalizedAmplitudeToMask {
    /**
     * INPUT_TYPES: normalized_amp, width, height, frame_offset, location_x, location_y, size, shape, color
     */
    inputs?: {
      normalized_amp: unknown;
      width: number;
      height: number;
      frame_offset: number;
      location_x: number;
      location_y: number;
      size: number;
      shape: string;
      color: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface NormalizedAmplitudeToFloatList {
    /**
     * INPUT_TYPES: normalized_amp
     */
    inputs?: {
      normalized_amp: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: FLOAT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface OffsetMaskByNormalizedAmplitude {
    /**
     * INPUT_TYPES: normalized_amp, mask, x, y, rotate, angle_multiplier
     */
    inputs?: {
      normalized_amp: unknown;
      mask: unknown;
      x: number;
      y: number;
      rotate: unknown;
      angle_multiplier: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ImageTransformByNormalizedAmplitude {
    /**
     * INPUT_TYPES: normalized_amp, zoom_scale, x_offset, y_offset, cumulative, image
     */
    inputs?: {
      normalized_amp: unknown;
      zoom_scale: number;
      x_offset: number;
      y_offset: number;
      cumulative: unknown;
      image: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface SplineEditor {
    /**
     * INPUT_TYPES: points_store, coordinates, mask_width, mask_height, points_to_sample, sampling_method, interpolation, tension, repeat_output, float_output_type
     */
    inputs?: {
      points_store: string;
      coordinates: string;
      mask_width: number;
      mask_height: number;
      points_to_sample: number;
      sampling_method: string;
      interpolation: string;
      tension: number;
      repeat_output: number;
      float_output_type: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK, STRING, FLOAT, INT
     */
    outputs?: [unknown, unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface CreateShapeMaskOnPath {
    /**
     * INPUT_TYPES: shape, coordinates, frame_width, frame_height, shape_width, shape_height
     */
    inputs?: {
      shape: string;
      coordinates: string;
      frame_width: number;
      frame_height: number;
      shape_width: number;
      shape_height: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK, MASK
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface WeightScheduleExtend {
    /**
     * INPUT_TYPES: input_values_1, input_values_2, output_type
     */
    inputs?: {
      input_values_1: number;
      input_values_2: number;
      output_type: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: FLOAT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface MaskOrImageToWeight {
    /**
     * INPUT_TYPES: output_type
     */
    inputs?: {
      output_type: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: FLOAT, STRING
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface WeightScheduleConvert {
    /**
     * INPUT_TYPES: input_values, output_type, invert, repeat
     */
    inputs?: {
      input_values: number;
      output_type: string;
      invert: unknown;
      repeat: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: FLOAT, STRING, INT
     */
    outputs?: [unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface FloatToMask {
    /**
     * INPUT_TYPES: input_values, width, height
     */
    inputs?: {
      input_values: number;
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

  export interface FloatToSigmas {
    /**
     * INPUT_TYPES: float_list
     */
    inputs?: {
      float_list: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SIGMAS
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface PlotCoordinates {
    /**
     * INPUT_TYPES: coordinates, text, width, height, bbox_width, bbox_height
     */
    inputs?: {
      coordinates: string;
      text: string;
      width: number;
      height: number;
      bbox_width: number;
      bbox_height: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE, INT, INT, INT, INT
     */
    outputs?: [unknown, unknown, unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface InterpolateCoords {
    /**
     * INPUT_TYPES: coordinates, interpolation_curve
     */
    inputs?: {
      coordinates: string;
      interpolation_curve: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: STRING
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface StabilityAPI_SD3 {
    /**
     * INPUT_TYPES: prompt, n_prompt, seed, model, aspect_ratio, output_format
     */
    inputs?: {
      prompt: string;
      n_prompt: string;
      seed: number;
      model: string;
      aspect_ratio: string;
      output_format: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface SoundReactive {
    /**
     * INPUT_TYPES: sound_level, start_range_hz, end_range_hz, multiplier, smoothing_factor, normalize
     */
    inputs?: {
      sound_level: number;
      start_range_hz: number;
      end_range_hz: number;
      multiplier: number;
      smoothing_factor: number;
      normalize: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: FLOAT, INT
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface StableZero123_BatchSchedule {
    /**
     * INPUT_TYPES: clip_vision, init_image, vae, width, height, batch_size, interpolation, azimuth_points_string, elevation_points_string
     */
    inputs?: {
      clip_vision: unknown;
      init_image: unknown;
      vae: unknown;
      width: number;
      height: number;
      batch_size: number;
      interpolation: string;
      azimuth_points_string: string;
      elevation_points_string: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING, CONDITIONING, LATENT
     */
    outputs?: [unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface SV3D_BatchSchedule {
    /**
     * INPUT_TYPES: clip_vision, init_image, vae, width, height, batch_size, interpolation, azimuth_points_string, elevation_points_string
     */
    inputs?: {
      clip_vision: unknown;
      init_image: unknown;
      vae: unknown;
      width: number;
      height: number;
      batch_size: number;
      interpolation: string;
      azimuth_points_string: string;
      elevation_points_string: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING, CONDITIONING, LATENT
     */
    outputs?: [unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface LoadResAdapterNormalization {
    /**
     * INPUT_TYPES: model, resadapter_path
     */
    inputs?: {
      model: unknown;
      resadapter_path: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface Superprompt {
    /**
     * INPUT_TYPES: instruction_prompt, prompt, max_new_tokens
     */
    inputs?: {
      instruction_prompt: string;
      prompt: string;
      max_new_tokens: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: STRING
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface GLIGENTextBoxApplyBatchCoords {
    /**
     * INPUT_TYPES: conditioning_to, latents, clip, gligen_textbox_model, coordinates, text, width, height
     */
    inputs?: {
      conditioning_to: unknown;
      latents: unknown;
      clip: unknown;
      gligen_textbox_model: unknown;
      coordinates: string;
      text: string;
      width: number;
      height: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING, IMAGE
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface Intrinsic_lora_sampling {
    /**
     * INPUT_TYPES: model, lora_name, task, text, clip, vae, per_batch
     */
    inputs?: {
      model: unknown;
      lora_name: string;
      task: string;
      text: string;
      clip: unknown;
      vae: unknown;
      per_batch: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE, LATENT
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface CreateInstanceDiffusionTracking {
    /**
     * INPUT_TYPES: coordinates, width, height, bbox_width, bbox_height, class_name, class_id, prompt
     */
    inputs?: {
      coordinates: string;
      width: number;
      height: number;
      bbox_width: number;
      bbox_height: number;
      class_name: string;
      class_id: number;
      prompt: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: TRACKING, STRING, INT, INT, INT, INT
     */
    outputs?: [unknown, unknown, unknown, unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface AppendInstanceDiffusionTracking {
    /**
     * INPUT_TYPES: tracking_1, tracking_2
     */
    inputs?: {
      tracking_1: unknown;
      tracking_2: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: TRACKING, STRING
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface DrawInstanceDiffusionTracking {
    /**
     * INPUT_TYPES: image, tracking, box_line_width, draw_text, font, font_size
     */
    inputs?: {
      image: unknown;
      tracking: unknown;
      box_line_width: number;
      draw_text: unknown;
      font: string;
      font_size: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ETN_LoadImageBase64 {
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

  export interface ETN_LoadMaskBase64 {
    /**
     * INPUT_TYPES: mask
     */
    inputs?: {
      mask: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ETN_SendImageWebSocket {
    /**
     * INPUT_TYPES: images
     */
    inputs?: {
      images: unknown;
      [k: string]: unknown;
    };
    /** NO_OUTPUTS */
    outputs?: [];
    [k: string]: unknown;
  }

  export interface ETN_CropImage {
    /**
     * INPUT_TYPES: image, x, y, width, height
     */
    inputs?: {
      image: unknown;
      x: number;
      y: number;
      width: number;
      height: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ETN_ApplyMaskToImage {
    /**
     * INPUT_TYPES: image, mask
     */
    inputs?: {
      image: unknown;
      mask: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ETN_TileLayout {
    /**
     * INPUT_TYPES: image, min_tile_size, padding, blending
     */
    inputs?: {
      image: unknown;
      min_tile_size: number;
      padding: number;
      blending: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: TILE_LAYOUT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ETN_ExtractImageTile {
    /**
     * INPUT_TYPES: image, layout, index
     */
    inputs?: {
      image: unknown;
      layout: unknown;
      index: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ETN_ExtractMaskTile {
    /**
     * INPUT_TYPES: mask, layout, index
     */
    inputs?: {
      mask: unknown;
      layout: unknown;
      index: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ETN_GenerateTileMask {
    /**
     * INPUT_TYPES: layout, index
     */
    inputs?: {
      layout: unknown;
      index: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ETN_MergeImageTile {
    /**
     * INPUT_TYPES: image, layout, index, tile
     */
    inputs?: {
      image: unknown;
      layout: unknown;
      index: number;
      tile: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ETN_BackgroundRegion {
    /**
     * INPUT_TYPES: conditioning
     */
    inputs?: {
      conditioning: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: REGIONS
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ETN_DefineRegion {
    /**
     * INPUT_TYPES: mask, conditioning
     */
    inputs?: {
      mask: unknown;
      conditioning: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: REGIONS
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ETN_ListRegionMasks {
    /**
     * INPUT_TYPES: regions
     */
    inputs?: {
      regions: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ETN_AttentionMask {
    /**
     * INPUT_TYPES: model, regions
     */
    inputs?: {
      model: unknown;
      regions: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface Robust_Video_Matting {
    /**
     * INPUT_TYPES: video_frames, backbone, fp16, bg_color, batch_size
     */
    inputs?: {
      video_frames: unknown;
      backbone: string;
      fp16: unknown;
      bg_color: string;
      batch_size: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE, MASK
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface BRIAAI_Matting {
    /**
     * INPUT_TYPES: video_frames, version, fp16, bg_color, batch_size
     */
    inputs?: {
      video_frames: unknown;
      version: string;
      fp16: unknown;
      bg_color: string;
      batch_size: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE, MASK
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface AnimeFace_SemSegPreprocessor {
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

  export interface BinaryPreprocessor {
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

  export interface CannyEdgePreprocessor {
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

  export interface ColorPreprocessor {
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

  export interface DensePosePreprocessor {
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

  export interface DepthAnythingPreprocessor {
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

  export interface Zoe_DepthAnythingPreprocessor {
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

  export interface DiffusionEdge_Preprocessor {
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

  export interface DSINE_NormalMapPreprocessor {
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

  export interface DWPreprocessor {
    /**
     * INPUT_TYPES: image
     */
    inputs?: {
      image: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE, POSE_KEYPOINT
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface AnimalPosePreprocessor {
    /**
     * INPUT_TYPES: image
     */
    inputs?: {
      image: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE, POSE_KEYPOINT
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface HEDPreprocessor {
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

  export interface FakeScribblePreprocessor {
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

  export interface InpaintPreprocessor {
    /**
     * INPUT_TYPES: image, mask
     */
    inputs?: {
      image: unknown;
      mask: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface LeReS_DepthMapPreprocessor {
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

  export interface LineArtPreprocessor {
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

  export interface AnimeLineArtPreprocessor {
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

  export interface LineartStandardPreprocessor {
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

  export interface Manga2Anime_LineArt_Preprocessor {
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

  export interface MediaPipe_FaceMeshPreprocessor {
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

  export interface MeshGraphormer_DepthMapPreprocessor {
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

  export interface MeshGraphormer_ImpactDetector_DepthMapPreprocessor {
    /**
     * INPUT_TYPES: image, bbox_detector
     */
    inputs?: {
      image: unknown;
      bbox_detector: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE, MASK
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface MiDaS_NormalMapPreprocessor {
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

  export interface MiDaS_DepthMapPreprocessor {
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

  export interface M_LSDPreprocessor {
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

  export interface BAE_NormalMapPreprocessor {
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

  export interface OneFormer_COCO_SemSegPreprocessor {
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

  export interface OneFormer_ADE20K_SemSegPreprocessor {
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

  export interface OpenposePreprocessor {
    /**
     * INPUT_TYPES: image
     */
    inputs?: {
      image: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE, POSE_KEYPOINT
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface PiDiNetPreprocessor {
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

  export interface SavePoseKpsAsJsonFile {
    /**
     * INPUT_TYPES: pose_kps, filename_prefix
     */
    inputs?: {
      pose_kps: unknown;
      filename_prefix: string;
      [k: string]: unknown;
    };
    /** NO_OUTPUTS */
    outputs?: [];
    [k: string]: unknown;
  }

  export interface FacialPartColoringFromPoseKps {
    /**
     * INPUT_TYPES: pose_kps, mode, skin, left_eye, right_eye, nose, upper_lip, inner_mouth, lower_lip
     */
    inputs?: {
      pose_kps: unknown;
      mode: string;
      skin: string;
      left_eye: string;
      right_eye: string;
      nose: string;
      upper_lip: string;
      inner_mouth: string;
      lower_lip: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ImageLuminanceDetector {
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

  export interface ImageIntensityDetector {
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

  export interface ScribblePreprocessor {
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

  export interface Scribble_XDoG_Preprocessor {
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

  export interface Scribble_PiDiNet_Preprocessor {
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

  export interface SAMPreprocessor {
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

  export interface ShufflePreprocessor {
    /**
     * INPUT_TYPES: image, resolution, seed
     */
    inputs?: {
      image: unknown;
      resolution: number;
      seed: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface TEEDPreprocessor {
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

  export interface TilePreprocessor {
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

  export interface UniFormer_SemSegPreprocessor {
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

  export interface SemSegPreprocessor {
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

  export interface Unimatch_OptFlowPreprocessor {
    /**
     * INPUT_TYPES: image, ckpt_name, backward_flow, bidirectional_flow
     */
    inputs?: {
      image: unknown;
      ckpt_name: string;
      backward_flow: unknown;
      bidirectional_flow: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: OPTICAL_FLOW, IMAGE
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface MaskOptFlow {
    /**
     * INPUT_TYPES: optical_flow, mask
     */
    inputs?: {
      optical_flow: unknown;
      mask: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: OPTICAL_FLOW, IMAGE
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface Zoe_DepthMapPreprocessor {
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

  export interface AIO_Preprocessor {
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

  export interface ControlNetPreprocessorSelector {
    /**
     * INPUT_TYPES: preprocessor
     */
    inputs?: {
      preprocessor: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: ANY
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface PixelPerfectResolution {
    /**
     * INPUT_TYPES: original_image, image_gen_width, image_gen_height, resize_mode
     */
    inputs?: {
      original_image: unknown;
      image_gen_width: number;
      image_gen_height: number;
      resize_mode: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: INT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ImageGenResolutionFromImage {
    /**
     * INPUT_TYPES: image
     */
    inputs?: {
      image: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: INT, INT
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface ImageGenResolutionFromLatent {
    /**
     * INPUT_TYPES: latent
     */
    inputs?: {
      latent: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: INT, INT
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface HintImageEnchance {
    /**
     * INPUT_TYPES: hint_image, image_gen_width, image_gen_height, resize_mode
     */
    inputs?: {
      hint_image: unknown;
      image_gen_width: number;
      image_gen_height: number;
      resize_mode: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface GetImageSize_ {
    /**
     * INPUT_TYPES: image
     */
    inputs?: {
      image: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: INT, INT
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface ImageResize_ {
    /**
     * INPUT_TYPES: image, width, height, interpolation, keep_proportion, condition, multiple_of
     */
    inputs?: {
      image: unknown;
      width: number;
      height: number;
      interpolation: string;
      keep_proportion: unknown;
      condition: string;
      multiple_of: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE, INT, INT
     */
    outputs?: [unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface ImageCrop_ {
    /**
     * INPUT_TYPES: image, width, height, position, x_offset, y_offset
     */
    inputs?: {
      image: unknown;
      width: number;
      height: number;
      position: string;
      x_offset: number;
      y_offset: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE, INT, INT
     */
    outputs?: [unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface ImageFlip_ {
    /**
     * INPUT_TYPES: image, axis
     */
    inputs?: {
      image: unknown;
      axis: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ImageDesaturate_ {
    /**
     * INPUT_TYPES: image, factor
     */
    inputs?: {
      image: unknown;
      factor: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ImagePosterize_ {
    /**
     * INPUT_TYPES: image, threshold
     */
    inputs?: {
      image: unknown;
      threshold: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ImageCASharpening_ {
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

  export interface ImageSeamCarving_ {
    /**
     * INPUT_TYPES: image, width, height, energy, order
     */
    inputs?: {
      image: unknown;
      width: number;
      height: number;
      energy: string;
      order: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ImageEnhanceDifference_ {
    /**
     * INPUT_TYPES: image1, image2, exponent
     */
    inputs?: {
      image1: unknown;
      image2: unknown;
      exponent: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ImageExpandBatch_ {
    /**
     * INPUT_TYPES: image, size, method
     */
    inputs?: {
      image: unknown;
      size: number;
      method: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ImageFromBatch_ {
    /**
     * INPUT_TYPES: image, start, length
     */
    inputs?: {
      image: unknown;
      start: number;
      length: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ImageListToBatch_ {
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

  export interface ImageCompositeFromMaskBatch_ {
    /**
     * INPUT_TYPES: image_from, image_to, mask
     */
    inputs?: {
      image_from: unknown;
      image_to: unknown;
      mask: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ExtractKeyframes_ {
    /**
     * INPUT_TYPES: image, threshold
     */
    inputs?: {
      image: unknown;
      threshold: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE, STRING
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface ImageApplyLUT_ {
    /**
     * INPUT_TYPES: image, lut_file, log_colorspace, clip_values, strength
     */
    inputs?: {
      image: unknown;
      lut_file: string;
      log_colorspace: unknown;
      clip_values: unknown;
      strength: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface PixelOEPixelize_ {
    /**
     * INPUT_TYPES: image, downscale_mode, target_size, patch_size, thickness, color_matching, upscale
     */
    inputs?: {
      image: unknown;
      downscale_mode: string;
      target_size: number;
      patch_size: number;
      thickness: number;
      color_matching: unknown;
      upscale: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface MaskBlur_ {
    /**
     * INPUT_TYPES: mask, amount
     */
    inputs?: {
      mask: unknown;
      amount: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface MaskFlip_ {
    /**
     * INPUT_TYPES: mask, axis
     */
    inputs?: {
      mask: unknown;
      axis: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface MaskPreview_ {
    /**
     * INPUT_TYPES: mask
     */
    inputs?: {
      mask: unknown;
      [k: string]: unknown;
    };
    /** NO_OUTPUTS */
    outputs?: [];
    [k: string]: unknown;
  }

  export interface MaskBatch_ {
    /**
     * INPUT_TYPES: mask1, mask2
     */
    inputs?: {
      mask1: unknown;
      mask2: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface MaskExpandBatch_ {
    /**
     * INPUT_TYPES: mask, size, method
     */
    inputs?: {
      mask: unknown;
      size: number;
      method: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface TransitionMask_ {
    /**
     * INPUT_TYPES: width, height, frames, start_frame, end_frame, transition_type, timing_function
     */
    inputs?: {
      width: number;
      height: number;
      frames: number;
      start_frame: number;
      end_frame: number;
      transition_type: string;
      timing_function: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface MaskFromColor_ {
    /**
     * INPUT_TYPES: image, red, green, blue, threshold
     */
    inputs?: {
      image: unknown;
      red: number;
      green: number;
      blue: number;
      threshold: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface MaskFromBatch_ {
    /**
     * INPUT_TYPES: mask, start, length
     */
    inputs?: {
      mask: unknown;
      start: number;
      length: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface MaskBoundingBox_ {
    /**
     * INPUT_TYPES: mask, padding, blur
     */
    inputs?: {
      mask: unknown;
      padding: number;
      blur: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK, IMAGE, INT, INT, INT, INT
     */
    outputs?: [unknown, unknown, unknown, unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface MaskFromSegmentation_ {
    /**
     * INPUT_TYPES: image, segments, remove_isolated_pixels, remove_small_masks, fill_holes
     */
    inputs?: {
      image: unknown;
      segments: number;
      remove_isolated_pixels: number;
      remove_small_masks: number;
      fill_holes: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface MaskFromRGBCMYBW_ {
    /**
     * INPUT_TYPES: image, threshold_r, threshold_g, threshold_b, remove_isolated_pixels, fill_holes
     */
    inputs?: {
      image: unknown;
      threshold_r: number;
      threshold_g: number;
      threshold_b: number;
      remove_isolated_pixels: number;
      fill_holes: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK, MASK, MASK, MASK, MASK, MASK, MASK, MASK
     */
    outputs?: [
      unknown,
      unknown,
      unknown,
      unknown,
      unknown,
      unknown,
      unknown,
      unknown,
    ];
    [k: string]: unknown;
  }

  export interface MaskSmooth_ {
    /**
     * INPUT_TYPES: mask, amount
     */
    inputs?: {
      mask: unknown;
      amount: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MASK
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface MaskFromList_ {
    /**
     * INPUT_TYPES: values, width, height
     */
    inputs?: {
      values: number;
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

  export interface SimpleMath_ {
    /**
     * INPUT_TYPES: value
     */
    inputs?: {
      value: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: INT, FLOAT
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface ConsoleDebug_ {
    /**
     * INPUT_TYPES: value
     */
    inputs?: {
      value: string;
      [k: string]: unknown;
    };
    /** NO_OUTPUTS */
    outputs?: [];
    [k: string]: unknown;
  }

  export interface DebugTensorShape_ {
    /**
     * INPUT_TYPES: tensor
     */
    inputs?: {
      tensor: string;
      [k: string]: unknown;
    };
    /** NO_OUTPUTS */
    outputs?: [];
    [k: string]: unknown;
  }

  export interface ModelCompile_ {
    /**
     * INPUT_TYPES: model, fullgraph, dynamic, mode
     */
    inputs?: {
      model: unknown;
      fullgraph: unknown;
      dynamic: unknown;
      mode: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface BatchCount_ {
    /**
     * INPUT_TYPES: batch
     */
    inputs?: {
      batch: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: INT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface KSamplerVariationsStochastic_ {
    /**
     * INPUT_TYPES: model, latent_image, noise_seed, steps, cfg, sampler, scheduler, positive, negative, variation_seed, variation_strength, cfg_scale
     */
    inputs?: {
      model: unknown;
      latent_image: unknown;
      noise_seed: number;
      steps: number;
      cfg: number;
      sampler: string;
      scheduler: string;
      positive: unknown;
      negative: unknown;
      variation_seed: unknown;
      variation_strength: number;
      cfg_scale: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface KSamplerVariationsWithNoise_ {
    /**
     * INPUT_TYPES: model, latent_image, main_seed, steps, cfg, sampler_name, scheduler, positive, negative, variation_strength, variation_seed, denoise
     */
    inputs?: {
      model: unknown;
      latent_image: unknown;
      main_seed: unknown;
      steps: number;
      cfg: number;
      sampler_name: string;
      scheduler: string;
      positive: unknown;
      negative: unknown;
      variation_strength: number;
      variation_seed: unknown;
      denoise: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface CLIPTextEncodeSDXL_ {
    /**
     * INPUT_TYPES: width, height, size_cond_factor, text, clip
     */
    inputs?: {
      width: number;
      height: number;
      size_cond_factor: number;
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

  export interface SDXLEmptyLatentSizePicker_ {
    /**
     * INPUT_TYPES: resolution, batch_size
     */
    inputs?: {
      resolution: string;
      batch_size: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT, INT, INT
     */
    outputs?: [unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface DrawText_ {
    /**
     * INPUT_TYPES: text, font, size, color, background_color, shadow_distance, shadow_blur, shadow_color, alignment, width, height
     */
    inputs?: {
      text: string;
      font: string;
      size: number;
      color: string;
      background_color: string;
      shadow_distance: number;
      shadow_blur: number;
      shadow_color: string;
      alignment: string;
      width: number;
      height: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE, MASK
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface RemBGSession_ {
    /**
     * INPUT_TYPES: model, providers
     */
    inputs?: {
      model: string;
      providers: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: REMBG_SESSION
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ImageRemoveBackground_ {
    /**
     * INPUT_TYPES: rembg_session, image
     */
    inputs?: {
      rembg_session: unknown;
      image: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE, MASK
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface RemoveLatentMask_ {
    /**
     * INPUT_TYPES: samples
     */
    inputs?: {
      samples: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LATENT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface ConditioningCombineMultiple_ {
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

  export interface ImageBatchMultiple_ {
    /**
     * INPUT_TYPES: image_1, image_2, method
     */
    inputs?: {
      image_1: unknown;
      image_2: unknown;
      method: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface KSampler__Efficient_ {
    /**
     * INPUT_TYPES: model, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise, preview_method, vae_decode
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
      preview_method: string;
      vae_decode: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL, CONDITIONING, CONDITIONING, LATENT, VAE, IMAGE
     */
    outputs?: [unknown, unknown, unknown, unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface KSampler_Adv___Efficient_ {
    /**
     * INPUT_TYPES: model, add_noise, noise_seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, start_at_step, end_at_step, return_with_leftover_noise, preview_method, vae_decode
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
      preview_method: string;
      vae_decode: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL, CONDITIONING, CONDITIONING, LATENT, VAE, IMAGE
     */
    outputs?: [unknown, unknown, unknown, unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface KSampler_SDXL__Eff__ {
    /**
     * INPUT_TYPES: sdxl_tuple, noise_seed, steps, cfg, sampler_name, scheduler, latent_image, start_at_step, refine_at_step, preview_method, vae_decode
     */
    inputs?: {
      sdxl_tuple: unknown;
      noise_seed: number;
      steps: number;
      cfg: number;
      sampler_name: string;
      scheduler: string;
      latent_image: unknown;
      start_at_step: number;
      refine_at_step: number;
      preview_method: string;
      vae_decode: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SDXL_TUPLE, LATENT, VAE, IMAGE
     */
    outputs?: [unknown, unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface Efficient_Loader {
    /**
     * INPUT_TYPES: ckpt_name, vae_name, clip_skip, lora_name, lora_model_strength, lora_clip_strength, positive, negative, token_normalization, weight_interpretation, empty_latent_width, empty_latent_height, batch_size
     */
    inputs?: {
      ckpt_name: string;
      vae_name: string;
      clip_skip: number;
      lora_name: string;
      lora_model_strength: number;
      lora_clip_strength: number;
      positive: string;
      negative: string;
      token_normalization: string;
      weight_interpretation: string;
      empty_latent_width: number;
      empty_latent_height: number;
      batch_size: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL, CONDITIONING, CONDITIONING, LATENT, VAE, CLIP, DEPENDENCIES
     */
    outputs?: [unknown, unknown, unknown, unknown, unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface Eff__Loader_SDXL {
    /**
     * INPUT_TYPES: base_ckpt_name, base_clip_skip, refiner_ckpt_name, refiner_clip_skip, positive_ascore, negative_ascore, vae_name, positive, negative, token_normalization, weight_interpretation, empty_latent_width, empty_latent_height, batch_size
     */
    inputs?: {
      base_ckpt_name: string;
      base_clip_skip: number;
      refiner_ckpt_name: string;
      refiner_clip_skip: number;
      positive_ascore: number;
      negative_ascore: number;
      vae_name: string;
      positive: string;
      negative: string;
      token_normalization: string;
      weight_interpretation: string;
      empty_latent_width: number;
      empty_latent_height: number;
      batch_size: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SDXL_TUPLE, LATENT, VAE, DEPENDENCIES
     */
    outputs?: [unknown, unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface LoRA_Stacker {
    /**
     * INPUT_TYPES: input_mode, lora_count, lora_name_1, lora_wt_1, model_str_1, clip_str_1, lora_name_2, lora_wt_2, model_str_2, clip_str_2, lora_name_3, lora_wt_3, model_str_3, clip_str_3, lora_name_4, lora_wt_4, model_str_4, clip_str_4, lora_name_5, lora_wt_5, model_str_5, clip_str_5, lora_name_6, lora_wt_6, model_str_6, clip_str_6, lora_name_7, lora_wt_7, model_str_7, clip_str_7, lora_name_8, lora_wt_8, model_str_8, clip_str_8, lora_name_9, lora_wt_9, model_str_9, clip_str_9, lora_name_10, lora_wt_10, model_str_10, clip_str_10, lora_name_11, lora_wt_11, model_str_11, clip_str_11, lora_name_12, lora_wt_12, model_str_12, clip_str_12, lora_name_13, lora_wt_13, model_str_13, clip_str_13, lora_name_14, lora_wt_14, model_str_14, clip_str_14, lora_name_15, lora_wt_15, model_str_15, clip_str_15, lora_name_16, lora_wt_16, model_str_16, clip_str_16, lora_name_17, lora_wt_17, model_str_17, clip_str_17, lora_name_18, lora_wt_18, model_str_18, clip_str_18, lora_name_19, lora_wt_19, model_str_19, clip_str_19, lora_name_20, lora_wt_20, model_str_20, clip_str_20, lora_name_21, lora_wt_21, model_str_21, clip_str_21, lora_name_22, lora_wt_22, model_str_22, clip_str_22, lora_name_23, lora_wt_23, model_str_23, clip_str_23, lora_name_24, lora_wt_24, model_str_24, clip_str_24, lora_name_25, lora_wt_25, model_str_25, clip_str_25, lora_name_26, lora_wt_26, model_str_26, clip_str_26, lora_name_27, lora_wt_27, model_str_27, clip_str_27, lora_name_28, lora_wt_28, model_str_28, clip_str_28, lora_name_29, lora_wt_29, model_str_29, clip_str_29, lora_name_30, lora_wt_30, model_str_30, clip_str_30, lora_name_31, lora_wt_31, model_str_31, clip_str_31, lora_name_32, lora_wt_32, model_str_32, clip_str_32, lora_name_33, lora_wt_33, model_str_33, clip_str_33, lora_name_34, lora_wt_34, model_str_34, clip_str_34, lora_name_35, lora_wt_35, model_str_35, clip_str_35, lora_name_36, lora_wt_36, model_str_36, clip_str_36, lora_name_37, lora_wt_37, model_str_37, clip_str_37, lora_name_38, lora_wt_38, model_str_38, clip_str_38, lora_name_39, lora_wt_39, model_str_39, clip_str_39, lora_name_40, lora_wt_40, model_str_40, clip_str_40, lora_name_41, lora_wt_41, model_str_41, clip_str_41, lora_name_42, lora_wt_42, model_str_42, clip_str_42, lora_name_43, lora_wt_43, model_str_43, clip_str_43, lora_name_44, lora_wt_44, model_str_44, clip_str_44, lora_name_45, lora_wt_45, model_str_45, clip_str_45, lora_name_46, lora_wt_46, model_str_46, clip_str_46, lora_name_47, lora_wt_47, model_str_47, clip_str_47, lora_name_48, lora_wt_48, model_str_48, clip_str_48, lora_name_49, lora_wt_49, model_str_49, clip_str_49
     */
    inputs?: {
      input_mode: string;
      lora_count: number;
      lora_name_1: string;
      lora_wt_1: number;
      model_str_1: number;
      clip_str_1: number;
      lora_name_2: string;
      lora_wt_2: number;
      model_str_2: number;
      clip_str_2: number;
      lora_name_3: string;
      lora_wt_3: number;
      model_str_3: number;
      clip_str_3: number;
      lora_name_4: string;
      lora_wt_4: number;
      model_str_4: number;
      clip_str_4: number;
      lora_name_5: string;
      lora_wt_5: number;
      model_str_5: number;
      clip_str_5: number;
      lora_name_6: string;
      lora_wt_6: number;
      model_str_6: number;
      clip_str_6: number;
      lora_name_7: string;
      lora_wt_7: number;
      model_str_7: number;
      clip_str_7: number;
      lora_name_8: string;
      lora_wt_8: number;
      model_str_8: number;
      clip_str_8: number;
      lora_name_9: string;
      lora_wt_9: number;
      model_str_9: number;
      clip_str_9: number;
      lora_name_10: string;
      lora_wt_10: number;
      model_str_10: number;
      clip_str_10: number;
      lora_name_11: string;
      lora_wt_11: number;
      model_str_11: number;
      clip_str_11: number;
      lora_name_12: string;
      lora_wt_12: number;
      model_str_12: number;
      clip_str_12: number;
      lora_name_13: string;
      lora_wt_13: number;
      model_str_13: number;
      clip_str_13: number;
      lora_name_14: string;
      lora_wt_14: number;
      model_str_14: number;
      clip_str_14: number;
      lora_name_15: string;
      lora_wt_15: number;
      model_str_15: number;
      clip_str_15: number;
      lora_name_16: string;
      lora_wt_16: number;
      model_str_16: number;
      clip_str_16: number;
      lora_name_17: string;
      lora_wt_17: number;
      model_str_17: number;
      clip_str_17: number;
      lora_name_18: string;
      lora_wt_18: number;
      model_str_18: number;
      clip_str_18: number;
      lora_name_19: string;
      lora_wt_19: number;
      model_str_19: number;
      clip_str_19: number;
      lora_name_20: string;
      lora_wt_20: number;
      model_str_20: number;
      clip_str_20: number;
      lora_name_21: string;
      lora_wt_21: number;
      model_str_21: number;
      clip_str_21: number;
      lora_name_22: string;
      lora_wt_22: number;
      model_str_22: number;
      clip_str_22: number;
      lora_name_23: string;
      lora_wt_23: number;
      model_str_23: number;
      clip_str_23: number;
      lora_name_24: string;
      lora_wt_24: number;
      model_str_24: number;
      clip_str_24: number;
      lora_name_25: string;
      lora_wt_25: number;
      model_str_25: number;
      clip_str_25: number;
      lora_name_26: string;
      lora_wt_26: number;
      model_str_26: number;
      clip_str_26: number;
      lora_name_27: string;
      lora_wt_27: number;
      model_str_27: number;
      clip_str_27: number;
      lora_name_28: string;
      lora_wt_28: number;
      model_str_28: number;
      clip_str_28: number;
      lora_name_29: string;
      lora_wt_29: number;
      model_str_29: number;
      clip_str_29: number;
      lora_name_30: string;
      lora_wt_30: number;
      model_str_30: number;
      clip_str_30: number;
      lora_name_31: string;
      lora_wt_31: number;
      model_str_31: number;
      clip_str_31: number;
      lora_name_32: string;
      lora_wt_32: number;
      model_str_32: number;
      clip_str_32: number;
      lora_name_33: string;
      lora_wt_33: number;
      model_str_33: number;
      clip_str_33: number;
      lora_name_34: string;
      lora_wt_34: number;
      model_str_34: number;
      clip_str_34: number;
      lora_name_35: string;
      lora_wt_35: number;
      model_str_35: number;
      clip_str_35: number;
      lora_name_36: string;
      lora_wt_36: number;
      model_str_36: number;
      clip_str_36: number;
      lora_name_37: string;
      lora_wt_37: number;
      model_str_37: number;
      clip_str_37: number;
      lora_name_38: string;
      lora_wt_38: number;
      model_str_38: number;
      clip_str_38: number;
      lora_name_39: string;
      lora_wt_39: number;
      model_str_39: number;
      clip_str_39: number;
      lora_name_40: string;
      lora_wt_40: number;
      model_str_40: number;
      clip_str_40: number;
      lora_name_41: string;
      lora_wt_41: number;
      model_str_41: number;
      clip_str_41: number;
      lora_name_42: string;
      lora_wt_42: number;
      model_str_42: number;
      clip_str_42: number;
      lora_name_43: string;
      lora_wt_43: number;
      model_str_43: number;
      clip_str_43: number;
      lora_name_44: string;
      lora_wt_44: number;
      model_str_44: number;
      clip_str_44: number;
      lora_name_45: string;
      lora_wt_45: number;
      model_str_45: number;
      clip_str_45: number;
      lora_name_46: string;
      lora_wt_46: number;
      model_str_46: number;
      clip_str_46: number;
      lora_name_47: string;
      lora_wt_47: number;
      model_str_47: number;
      clip_str_47: number;
      lora_name_48: string;
      lora_wt_48: number;
      model_str_48: number;
      clip_str_48: number;
      lora_name_49: string;
      lora_wt_49: number;
      model_str_49: number;
      clip_str_49: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: LORA_STACK
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface Control_Net_Stacker {
    /**
     * INPUT_TYPES: control_net, image, strength, start_percent, end_percent
     */
    inputs?: {
      control_net: unknown;
      image: unknown;
      strength: number;
      start_percent: number;
      end_percent: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONTROL_NET_STACK
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface Apply_ControlNet_Stack {
    /**
     * INPUT_TYPES: positive, negative
     */
    inputs?: {
      positive: unknown;
      negative: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: CONDITIONING, CONDITIONING
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface Unpack_SDXL_Tuple {
    /**
     * INPUT_TYPES: sdxl_tuple
     */
    inputs?: {
      sdxl_tuple: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: MODEL, CLIP, CONDITIONING, CONDITIONING, MODEL, CLIP, CONDITIONING, CONDITIONING
     */
    outputs?: [
      unknown,
      unknown,
      unknown,
      unknown,
      unknown,
      unknown,
      unknown,
      unknown,
    ];
    [k: string]: unknown;
  }

  export interface Pack_SDXL_Tuple {
    /**
     * INPUT_TYPES: base_model, base_clip, base_positive, base_negative, refiner_model, refiner_clip, refiner_positive, refiner_negative
     */
    inputs?: {
      base_model: unknown;
      base_clip: unknown;
      base_positive: unknown;
      base_negative: unknown;
      refiner_model: unknown;
      refiner_clip: unknown;
      refiner_positive: unknown;
      refiner_negative: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SDXL_TUPLE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface XY_Plot {
    /**
     * INPUT_TYPES: grid_spacing, XY_flip, Y_label_orientation, cache_models, ksampler_output_image
     */
    inputs?: {
      grid_spacing: number;
      XY_flip: string;
      Y_label_orientation: string;
      cache_models: string;
      ksampler_output_image: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SCRIPT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface XY_Input__Seeds___Batch {
    /**
     * INPUT_TYPES: batch_count
     */
    inputs?: {
      batch_count: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: XY
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface XY_Input__Add_Return_Noise {
    /**
     * INPUT_TYPES: XY_type
     */
    inputs?: {
      XY_type: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: XY
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface XY_Input__Steps {
    /**
     * INPUT_TYPES: target_parameter, batch_count, first_step, last_step, first_start_step, last_start_step, first_end_step, last_end_step, first_refine_step, last_refine_step
     */
    inputs?: {
      target_parameter: string;
      batch_count: number;
      first_step: number;
      last_step: number;
      first_start_step: number;
      last_start_step: number;
      first_end_step: number;
      last_end_step: number;
      first_refine_step: number;
      last_refine_step: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: XY
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface XY_Input__CFG_Scale {
    /**
     * INPUT_TYPES: batch_count, first_cfg, last_cfg
     */
    inputs?: {
      batch_count: number;
      first_cfg: number;
      last_cfg: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: XY
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface XY_Input__Sampler_Scheduler {
    /**
     * INPUT_TYPES: target_parameter, input_count, sampler_1, scheduler_1, sampler_2, scheduler_2, sampler_3, scheduler_3, sampler_4, scheduler_4, sampler_5, scheduler_5, sampler_6, scheduler_6, sampler_7, scheduler_7, sampler_8, scheduler_8, sampler_9, scheduler_9, sampler_10, scheduler_10, sampler_11, scheduler_11, sampler_12, scheduler_12, sampler_13, scheduler_13, sampler_14, scheduler_14, sampler_15, scheduler_15, sampler_16, scheduler_16, sampler_17, scheduler_17, sampler_18, scheduler_18, sampler_19, scheduler_19, sampler_20, scheduler_20, sampler_21, scheduler_21, sampler_22, scheduler_22, sampler_23, scheduler_23, sampler_24, scheduler_24, sampler_25, scheduler_25, sampler_26, scheduler_26, sampler_27, scheduler_27, sampler_28, scheduler_28, sampler_29, scheduler_29, sampler_30, scheduler_30, sampler_31, scheduler_31, sampler_32, scheduler_32, sampler_33, scheduler_33, sampler_34, scheduler_34, sampler_35, scheduler_35, sampler_36, scheduler_36, sampler_37, scheduler_37, sampler_38, scheduler_38, sampler_39, scheduler_39, sampler_40, scheduler_40, sampler_41, scheduler_41, sampler_42, scheduler_42, sampler_43, scheduler_43, sampler_44, scheduler_44, sampler_45, scheduler_45, sampler_46, scheduler_46, sampler_47, scheduler_47, sampler_48, scheduler_48, sampler_49, scheduler_49, sampler_50, scheduler_50
     */
    inputs?: {
      target_parameter: string;
      input_count: number;
      sampler_1: string;
      scheduler_1: string;
      sampler_2: string;
      scheduler_2: string;
      sampler_3: string;
      scheduler_3: string;
      sampler_4: string;
      scheduler_4: string;
      sampler_5: string;
      scheduler_5: string;
      sampler_6: string;
      scheduler_6: string;
      sampler_7: string;
      scheduler_7: string;
      sampler_8: string;
      scheduler_8: string;
      sampler_9: string;
      scheduler_9: string;
      sampler_10: string;
      scheduler_10: string;
      sampler_11: string;
      scheduler_11: string;
      sampler_12: string;
      scheduler_12: string;
      sampler_13: string;
      scheduler_13: string;
      sampler_14: string;
      scheduler_14: string;
      sampler_15: string;
      scheduler_15: string;
      sampler_16: string;
      scheduler_16: string;
      sampler_17: string;
      scheduler_17: string;
      sampler_18: string;
      scheduler_18: string;
      sampler_19: string;
      scheduler_19: string;
      sampler_20: string;
      scheduler_20: string;
      sampler_21: string;
      scheduler_21: string;
      sampler_22: string;
      scheduler_22: string;
      sampler_23: string;
      scheduler_23: string;
      sampler_24: string;
      scheduler_24: string;
      sampler_25: string;
      scheduler_25: string;
      sampler_26: string;
      scheduler_26: string;
      sampler_27: string;
      scheduler_27: string;
      sampler_28: string;
      scheduler_28: string;
      sampler_29: string;
      scheduler_29: string;
      sampler_30: string;
      scheduler_30: string;
      sampler_31: string;
      scheduler_31: string;
      sampler_32: string;
      scheduler_32: string;
      sampler_33: string;
      scheduler_33: string;
      sampler_34: string;
      scheduler_34: string;
      sampler_35: string;
      scheduler_35: string;
      sampler_36: string;
      scheduler_36: string;
      sampler_37: string;
      scheduler_37: string;
      sampler_38: string;
      scheduler_38: string;
      sampler_39: string;
      scheduler_39: string;
      sampler_40: string;
      scheduler_40: string;
      sampler_41: string;
      scheduler_41: string;
      sampler_42: string;
      scheduler_42: string;
      sampler_43: string;
      scheduler_43: string;
      sampler_44: string;
      scheduler_44: string;
      sampler_45: string;
      scheduler_45: string;
      sampler_46: string;
      scheduler_46: string;
      sampler_47: string;
      scheduler_47: string;
      sampler_48: string;
      scheduler_48: string;
      sampler_49: string;
      scheduler_49: string;
      sampler_50: string;
      scheduler_50: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: XY
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface XY_Input__Denoise {
    /**
     * INPUT_TYPES: batch_count, first_denoise, last_denoise
     */
    inputs?: {
      batch_count: number;
      first_denoise: number;
      last_denoise: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: XY
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface XY_Input__VAE {
    /**
     * INPUT_TYPES: input_mode, batch_path, subdirectories, batch_sort, batch_max, vae_count, vae_name_1, vae_name_2, vae_name_3, vae_name_4, vae_name_5, vae_name_6, vae_name_7, vae_name_8, vae_name_9, vae_name_10, vae_name_11, vae_name_12, vae_name_13, vae_name_14, vae_name_15, vae_name_16, vae_name_17, vae_name_18, vae_name_19, vae_name_20, vae_name_21, vae_name_22, vae_name_23, vae_name_24, vae_name_25, vae_name_26, vae_name_27, vae_name_28, vae_name_29, vae_name_30, vae_name_31, vae_name_32, vae_name_33, vae_name_34, vae_name_35, vae_name_36, vae_name_37, vae_name_38, vae_name_39, vae_name_40, vae_name_41, vae_name_42, vae_name_43, vae_name_44, vae_name_45, vae_name_46, vae_name_47, vae_name_48, vae_name_49, vae_name_50
     */
    inputs?: {
      input_mode: string;
      batch_path: string;
      subdirectories: unknown;
      batch_sort: string;
      batch_max: number;
      vae_count: number;
      vae_name_1: string;
      vae_name_2: string;
      vae_name_3: string;
      vae_name_4: string;
      vae_name_5: string;
      vae_name_6: string;
      vae_name_7: string;
      vae_name_8: string;
      vae_name_9: string;
      vae_name_10: string;
      vae_name_11: string;
      vae_name_12: string;
      vae_name_13: string;
      vae_name_14: string;
      vae_name_15: string;
      vae_name_16: string;
      vae_name_17: string;
      vae_name_18: string;
      vae_name_19: string;
      vae_name_20: string;
      vae_name_21: string;
      vae_name_22: string;
      vae_name_23: string;
      vae_name_24: string;
      vae_name_25: string;
      vae_name_26: string;
      vae_name_27: string;
      vae_name_28: string;
      vae_name_29: string;
      vae_name_30: string;
      vae_name_31: string;
      vae_name_32: string;
      vae_name_33: string;
      vae_name_34: string;
      vae_name_35: string;
      vae_name_36: string;
      vae_name_37: string;
      vae_name_38: string;
      vae_name_39: string;
      vae_name_40: string;
      vae_name_41: string;
      vae_name_42: string;
      vae_name_43: string;
      vae_name_44: string;
      vae_name_45: string;
      vae_name_46: string;
      vae_name_47: string;
      vae_name_48: string;
      vae_name_49: string;
      vae_name_50: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: XY
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface XY_Input__Prompt_S_R {
    /**
     * INPUT_TYPES: target_prompt, search_txt, replace_count, replace_1, replace_2, replace_3, replace_4, replace_5, replace_6, replace_7, replace_8, replace_9, replace_10, replace_11, replace_12, replace_13, replace_14, replace_15, replace_16, replace_17, replace_18, replace_19, replace_20, replace_21, replace_22, replace_23, replace_24, replace_25, replace_26, replace_27, replace_28, replace_29, replace_30, replace_31, replace_32, replace_33, replace_34, replace_35, replace_36, replace_37, replace_38, replace_39, replace_40, replace_41, replace_42, replace_43, replace_44, replace_45, replace_46, replace_47, replace_48, replace_49
     */
    inputs?: {
      target_prompt: string;
      search_txt: string;
      replace_count: number;
      replace_1: string;
      replace_2: string;
      replace_3: string;
      replace_4: string;
      replace_5: string;
      replace_6: string;
      replace_7: string;
      replace_8: string;
      replace_9: string;
      replace_10: string;
      replace_11: string;
      replace_12: string;
      replace_13: string;
      replace_14: string;
      replace_15: string;
      replace_16: string;
      replace_17: string;
      replace_18: string;
      replace_19: string;
      replace_20: string;
      replace_21: string;
      replace_22: string;
      replace_23: string;
      replace_24: string;
      replace_25: string;
      replace_26: string;
      replace_27: string;
      replace_28: string;
      replace_29: string;
      replace_30: string;
      replace_31: string;
      replace_32: string;
      replace_33: string;
      replace_34: string;
      replace_35: string;
      replace_36: string;
      replace_37: string;
      replace_38: string;
      replace_39: string;
      replace_40: string;
      replace_41: string;
      replace_42: string;
      replace_43: string;
      replace_44: string;
      replace_45: string;
      replace_46: string;
      replace_47: string;
      replace_48: string;
      replace_49: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: XY
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface XY_Input__Aesthetic_Score {
    /**
     * INPUT_TYPES: target_ascore, batch_count, first_ascore, last_ascore
     */
    inputs?: {
      target_ascore: string;
      batch_count: number;
      first_ascore: number;
      last_ascore: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: XY
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface XY_Input__Refiner_On_Off {
    /**
     * INPUT_TYPES: refine_at_percent
     */
    inputs?: {
      refine_at_percent: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: XY
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface XY_Input__Checkpoint {
    /**
     * INPUT_TYPES: target_ckpt, input_mode, batch_path, subdirectories, batch_sort, batch_max, ckpt_count, ckpt_name_1, clip_skip_1, vae_name_1, ckpt_name_2, clip_skip_2, vae_name_2, ckpt_name_3, clip_skip_3, vae_name_3, ckpt_name_4, clip_skip_4, vae_name_4, ckpt_name_5, clip_skip_5, vae_name_5, ckpt_name_6, clip_skip_6, vae_name_6, ckpt_name_7, clip_skip_7, vae_name_7, ckpt_name_8, clip_skip_8, vae_name_8, ckpt_name_9, clip_skip_9, vae_name_9, ckpt_name_10, clip_skip_10, vae_name_10, ckpt_name_11, clip_skip_11, vae_name_11, ckpt_name_12, clip_skip_12, vae_name_12, ckpt_name_13, clip_skip_13, vae_name_13, ckpt_name_14, clip_skip_14, vae_name_14, ckpt_name_15, clip_skip_15, vae_name_15, ckpt_name_16, clip_skip_16, vae_name_16, ckpt_name_17, clip_skip_17, vae_name_17, ckpt_name_18, clip_skip_18, vae_name_18, ckpt_name_19, clip_skip_19, vae_name_19, ckpt_name_20, clip_skip_20, vae_name_20, ckpt_name_21, clip_skip_21, vae_name_21, ckpt_name_22, clip_skip_22, vae_name_22, ckpt_name_23, clip_skip_23, vae_name_23, ckpt_name_24, clip_skip_24, vae_name_24, ckpt_name_25, clip_skip_25, vae_name_25, ckpt_name_26, clip_skip_26, vae_name_26, ckpt_name_27, clip_skip_27, vae_name_27, ckpt_name_28, clip_skip_28, vae_name_28, ckpt_name_29, clip_skip_29, vae_name_29, ckpt_name_30, clip_skip_30, vae_name_30, ckpt_name_31, clip_skip_31, vae_name_31, ckpt_name_32, clip_skip_32, vae_name_32, ckpt_name_33, clip_skip_33, vae_name_33, ckpt_name_34, clip_skip_34, vae_name_34, ckpt_name_35, clip_skip_35, vae_name_35, ckpt_name_36, clip_skip_36, vae_name_36, ckpt_name_37, clip_skip_37, vae_name_37, ckpt_name_38, clip_skip_38, vae_name_38, ckpt_name_39, clip_skip_39, vae_name_39, ckpt_name_40, clip_skip_40, vae_name_40, ckpt_name_41, clip_skip_41, vae_name_41, ckpt_name_42, clip_skip_42, vae_name_42, ckpt_name_43, clip_skip_43, vae_name_43, ckpt_name_44, clip_skip_44, vae_name_44, ckpt_name_45, clip_skip_45, vae_name_45, ckpt_name_46, clip_skip_46, vae_name_46, ckpt_name_47, clip_skip_47, vae_name_47, ckpt_name_48, clip_skip_48, vae_name_48, ckpt_name_49, clip_skip_49, vae_name_49, ckpt_name_50, clip_skip_50, vae_name_50
     */
    inputs?: {
      target_ckpt: string;
      input_mode: string;
      batch_path: string;
      subdirectories: unknown;
      batch_sort: string;
      batch_max: number;
      ckpt_count: number;
      ckpt_name_1: string;
      clip_skip_1: number;
      vae_name_1: string;
      ckpt_name_2: string;
      clip_skip_2: number;
      vae_name_2: string;
      ckpt_name_3: string;
      clip_skip_3: number;
      vae_name_3: string;
      ckpt_name_4: string;
      clip_skip_4: number;
      vae_name_4: string;
      ckpt_name_5: string;
      clip_skip_5: number;
      vae_name_5: string;
      ckpt_name_6: string;
      clip_skip_6: number;
      vae_name_6: string;
      ckpt_name_7: string;
      clip_skip_7: number;
      vae_name_7: string;
      ckpt_name_8: string;
      clip_skip_8: number;
      vae_name_8: string;
      ckpt_name_9: string;
      clip_skip_9: number;
      vae_name_9: string;
      ckpt_name_10: string;
      clip_skip_10: number;
      vae_name_10: string;
      ckpt_name_11: string;
      clip_skip_11: number;
      vae_name_11: string;
      ckpt_name_12: string;
      clip_skip_12: number;
      vae_name_12: string;
      ckpt_name_13: string;
      clip_skip_13: number;
      vae_name_13: string;
      ckpt_name_14: string;
      clip_skip_14: number;
      vae_name_14: string;
      ckpt_name_15: string;
      clip_skip_15: number;
      vae_name_15: string;
      ckpt_name_16: string;
      clip_skip_16: number;
      vae_name_16: string;
      ckpt_name_17: string;
      clip_skip_17: number;
      vae_name_17: string;
      ckpt_name_18: string;
      clip_skip_18: number;
      vae_name_18: string;
      ckpt_name_19: string;
      clip_skip_19: number;
      vae_name_19: string;
      ckpt_name_20: string;
      clip_skip_20: number;
      vae_name_20: string;
      ckpt_name_21: string;
      clip_skip_21: number;
      vae_name_21: string;
      ckpt_name_22: string;
      clip_skip_22: number;
      vae_name_22: string;
      ckpt_name_23: string;
      clip_skip_23: number;
      vae_name_23: string;
      ckpt_name_24: string;
      clip_skip_24: number;
      vae_name_24: string;
      ckpt_name_25: string;
      clip_skip_25: number;
      vae_name_25: string;
      ckpt_name_26: string;
      clip_skip_26: number;
      vae_name_26: string;
      ckpt_name_27: string;
      clip_skip_27: number;
      vae_name_27: string;
      ckpt_name_28: string;
      clip_skip_28: number;
      vae_name_28: string;
      ckpt_name_29: string;
      clip_skip_29: number;
      vae_name_29: string;
      ckpt_name_30: string;
      clip_skip_30: number;
      vae_name_30: string;
      ckpt_name_31: string;
      clip_skip_31: number;
      vae_name_31: string;
      ckpt_name_32: string;
      clip_skip_32: number;
      vae_name_32: string;
      ckpt_name_33: string;
      clip_skip_33: number;
      vae_name_33: string;
      ckpt_name_34: string;
      clip_skip_34: number;
      vae_name_34: string;
      ckpt_name_35: string;
      clip_skip_35: number;
      vae_name_35: string;
      ckpt_name_36: string;
      clip_skip_36: number;
      vae_name_36: string;
      ckpt_name_37: string;
      clip_skip_37: number;
      vae_name_37: string;
      ckpt_name_38: string;
      clip_skip_38: number;
      vae_name_38: string;
      ckpt_name_39: string;
      clip_skip_39: number;
      vae_name_39: string;
      ckpt_name_40: string;
      clip_skip_40: number;
      vae_name_40: string;
      ckpt_name_41: string;
      clip_skip_41: number;
      vae_name_41: string;
      ckpt_name_42: string;
      clip_skip_42: number;
      vae_name_42: string;
      ckpt_name_43: string;
      clip_skip_43: number;
      vae_name_43: string;
      ckpt_name_44: string;
      clip_skip_44: number;
      vae_name_44: string;
      ckpt_name_45: string;
      clip_skip_45: number;
      vae_name_45: string;
      ckpt_name_46: string;
      clip_skip_46: number;
      vae_name_46: string;
      ckpt_name_47: string;
      clip_skip_47: number;
      vae_name_47: string;
      ckpt_name_48: string;
      clip_skip_48: number;
      vae_name_48: string;
      ckpt_name_49: string;
      clip_skip_49: number;
      vae_name_49: string;
      ckpt_name_50: string;
      clip_skip_50: number;
      vae_name_50: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: XY
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface XY_Input__Clip_Skip {
    /**
     * INPUT_TYPES: target_ckpt, batch_count, first_clip_skip, last_clip_skip
     */
    inputs?: {
      target_ckpt: string;
      batch_count: number;
      first_clip_skip: number;
      last_clip_skip: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: XY
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface XY_Input__LoRA {
    /**
     * INPUT_TYPES: input_mode, batch_path, subdirectories, batch_sort, batch_max, lora_count, model_strength, clip_strength, lora_name_1, model_str_1, clip_str_1, lora_name_2, model_str_2, clip_str_2, lora_name_3, model_str_3, clip_str_3, lora_name_4, model_str_4, clip_str_4, lora_name_5, model_str_5, clip_str_5, lora_name_6, model_str_6, clip_str_6, lora_name_7, model_str_7, clip_str_7, lora_name_8, model_str_8, clip_str_8, lora_name_9, model_str_9, clip_str_9, lora_name_10, model_str_10, clip_str_10, lora_name_11, model_str_11, clip_str_11, lora_name_12, model_str_12, clip_str_12, lora_name_13, model_str_13, clip_str_13, lora_name_14, model_str_14, clip_str_14, lora_name_15, model_str_15, clip_str_15, lora_name_16, model_str_16, clip_str_16, lora_name_17, model_str_17, clip_str_17, lora_name_18, model_str_18, clip_str_18, lora_name_19, model_str_19, clip_str_19, lora_name_20, model_str_20, clip_str_20, lora_name_21, model_str_21, clip_str_21, lora_name_22, model_str_22, clip_str_22, lora_name_23, model_str_23, clip_str_23, lora_name_24, model_str_24, clip_str_24, lora_name_25, model_str_25, clip_str_25, lora_name_26, model_str_26, clip_str_26, lora_name_27, model_str_27, clip_str_27, lora_name_28, model_str_28, clip_str_28, lora_name_29, model_str_29, clip_str_29, lora_name_30, model_str_30, clip_str_30, lora_name_31, model_str_31, clip_str_31, lora_name_32, model_str_32, clip_str_32, lora_name_33, model_str_33, clip_str_33, lora_name_34, model_str_34, clip_str_34, lora_name_35, model_str_35, clip_str_35, lora_name_36, model_str_36, clip_str_36, lora_name_37, model_str_37, clip_str_37, lora_name_38, model_str_38, clip_str_38, lora_name_39, model_str_39, clip_str_39, lora_name_40, model_str_40, clip_str_40, lora_name_41, model_str_41, clip_str_41, lora_name_42, model_str_42, clip_str_42, lora_name_43, model_str_43, clip_str_43, lora_name_44, model_str_44, clip_str_44, lora_name_45, model_str_45, clip_str_45, lora_name_46, model_str_46, clip_str_46, lora_name_47, model_str_47, clip_str_47, lora_name_48, model_str_48, clip_str_48, lora_name_49, model_str_49, clip_str_49, lora_name_50, model_str_50, clip_str_50
     */
    inputs?: {
      input_mode: string;
      batch_path: string;
      subdirectories: unknown;
      batch_sort: string;
      batch_max: number;
      lora_count: number;
      model_strength: number;
      clip_strength: number;
      lora_name_1: string;
      model_str_1: number;
      clip_str_1: number;
      lora_name_2: string;
      model_str_2: number;
      clip_str_2: number;
      lora_name_3: string;
      model_str_3: number;
      clip_str_3: number;
      lora_name_4: string;
      model_str_4: number;
      clip_str_4: number;
      lora_name_5: string;
      model_str_5: number;
      clip_str_5: number;
      lora_name_6: string;
      model_str_6: number;
      clip_str_6: number;
      lora_name_7: string;
      model_str_7: number;
      clip_str_7: number;
      lora_name_8: string;
      model_str_8: number;
      clip_str_8: number;
      lora_name_9: string;
      model_str_9: number;
      clip_str_9: number;
      lora_name_10: string;
      model_str_10: number;
      clip_str_10: number;
      lora_name_11: string;
      model_str_11: number;
      clip_str_11: number;
      lora_name_12: string;
      model_str_12: number;
      clip_str_12: number;
      lora_name_13: string;
      model_str_13: number;
      clip_str_13: number;
      lora_name_14: string;
      model_str_14: number;
      clip_str_14: number;
      lora_name_15: string;
      model_str_15: number;
      clip_str_15: number;
      lora_name_16: string;
      model_str_16: number;
      clip_str_16: number;
      lora_name_17: string;
      model_str_17: number;
      clip_str_17: number;
      lora_name_18: string;
      model_str_18: number;
      clip_str_18: number;
      lora_name_19: string;
      model_str_19: number;
      clip_str_19: number;
      lora_name_20: string;
      model_str_20: number;
      clip_str_20: number;
      lora_name_21: string;
      model_str_21: number;
      clip_str_21: number;
      lora_name_22: string;
      model_str_22: number;
      clip_str_22: number;
      lora_name_23: string;
      model_str_23: number;
      clip_str_23: number;
      lora_name_24: string;
      model_str_24: number;
      clip_str_24: number;
      lora_name_25: string;
      model_str_25: number;
      clip_str_25: number;
      lora_name_26: string;
      model_str_26: number;
      clip_str_26: number;
      lora_name_27: string;
      model_str_27: number;
      clip_str_27: number;
      lora_name_28: string;
      model_str_28: number;
      clip_str_28: number;
      lora_name_29: string;
      model_str_29: number;
      clip_str_29: number;
      lora_name_30: string;
      model_str_30: number;
      clip_str_30: number;
      lora_name_31: string;
      model_str_31: number;
      clip_str_31: number;
      lora_name_32: string;
      model_str_32: number;
      clip_str_32: number;
      lora_name_33: string;
      model_str_33: number;
      clip_str_33: number;
      lora_name_34: string;
      model_str_34: number;
      clip_str_34: number;
      lora_name_35: string;
      model_str_35: number;
      clip_str_35: number;
      lora_name_36: string;
      model_str_36: number;
      clip_str_36: number;
      lora_name_37: string;
      model_str_37: number;
      clip_str_37: number;
      lora_name_38: string;
      model_str_38: number;
      clip_str_38: number;
      lora_name_39: string;
      model_str_39: number;
      clip_str_39: number;
      lora_name_40: string;
      model_str_40: number;
      clip_str_40: number;
      lora_name_41: string;
      model_str_41: number;
      clip_str_41: number;
      lora_name_42: string;
      model_str_42: number;
      clip_str_42: number;
      lora_name_43: string;
      model_str_43: number;
      clip_str_43: number;
      lora_name_44: string;
      model_str_44: number;
      clip_str_44: number;
      lora_name_45: string;
      model_str_45: number;
      clip_str_45: number;
      lora_name_46: string;
      model_str_46: number;
      clip_str_46: number;
      lora_name_47: string;
      model_str_47: number;
      clip_str_47: number;
      lora_name_48: string;
      model_str_48: number;
      clip_str_48: number;
      lora_name_49: string;
      model_str_49: number;
      clip_str_49: number;
      lora_name_50: string;
      model_str_50: number;
      clip_str_50: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: XY
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface XY_Input__LoRA_Plot {
    /**
     * INPUT_TYPES: input_mode, lora_name, model_strength, clip_strength, X_batch_count, X_batch_path, X_subdirectories, X_batch_sort, X_first_value, X_last_value, Y_batch_count, Y_first_value, Y_last_value
     */
    inputs?: {
      input_mode: string;
      lora_name: string;
      model_strength: number;
      clip_strength: number;
      X_batch_count: number;
      X_batch_path: string;
      X_subdirectories: unknown;
      X_batch_sort: string;
      X_first_value: number;
      X_last_value: number;
      Y_batch_count: number;
      Y_first_value: number;
      Y_last_value: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: XY, XY
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface XY_Input__LoRA_Stacks {
    /**
     * INPUT_TYPES: node_state
     */
    inputs?: {
      node_state: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: XY
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface XY_Input__Control_Net {
    /**
     * INPUT_TYPES: control_net, image, target_parameter, batch_count, first_strength, last_strength, first_start_percent, last_start_percent, first_end_percent, last_end_percent, strength, start_percent, end_percent
     */
    inputs?: {
      control_net: unknown;
      image: unknown;
      target_parameter: string;
      batch_count: number;
      first_strength: number;
      last_strength: number;
      first_start_percent: number;
      last_start_percent: number;
      first_end_percent: number;
      last_end_percent: number;
      strength: number;
      start_percent: number;
      end_percent: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: XY
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface XY_Input__Control_Net_Plot {
    /**
     * INPUT_TYPES: control_net, image, plot_type, strength, start_percent, end_percent, X_batch_count, X_first_value, X_last_value, Y_batch_count, Y_first_value, Y_last_value
     */
    inputs?: {
      control_net: unknown;
      image: unknown;
      plot_type: string;
      strength: number;
      start_percent: number;
      end_percent: number;
      X_batch_count: number;
      X_first_value: number;
      X_last_value: number;
      Y_batch_count: number;
      Y_first_value: number;
      Y_last_value: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: XY, XY
     */
    outputs?: [unknown, unknown];
    [k: string]: unknown;
  }

  export interface XY_Input__Manual_XY_Entry {
    /**
     * INPUT_TYPES: plot_type, plot_value
     */
    inputs?: {
      plot_type: string;
      plot_value: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: XY
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface Join_XY_Inputs_of_Same_Type {
    /**
     * INPUT_TYPES: XY_1, XY_2
     */
    inputs?: {
      XY_1: unknown;
      XY_2: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: XY
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface Image_Overlay {
    /**
     * INPUT_TYPES: base_image, overlay_image, overlay_resize, resize_method, rescale_factor, width, height, x_offset, y_offset, rotation, opacity
     */
    inputs?: {
      base_image: unknown;
      overlay_image: unknown;
      overlay_resize: string;
      resize_method: string;
      rescale_factor: number;
      width: number;
      height: number;
      x_offset: number;
      y_offset: number;
      rotation: number;
      opacity: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: IMAGE
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface Noise_Control_Script {
    /**
     * INPUT_TYPES: rng_source, cfg_denoiser, add_seed_noise, seed, weight
     */
    inputs?: {
      rng_source: string;
      cfg_denoiser: unknown;
      add_seed_noise: unknown;
      seed: number;
      weight: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SCRIPT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface HighRes_Fix_Script {
    /**
     * INPUT_TYPES: upscale_type, hires_ckpt_name, latent_upscaler, pixel_upscaler, upscale_by, use_same_seed, seed, hires_steps, denoise, iterations, use_controlnet, control_net_name, strength, preprocessor, preprocessor_imgs
     */
    inputs?: {
      upscale_type: string;
      hires_ckpt_name: string;
      latent_upscaler: string;
      pixel_upscaler: string;
      upscale_by: number;
      use_same_seed: unknown;
      seed: number;
      hires_steps: number;
      denoise: number;
      iterations: number;
      use_controlnet: unknown;
      control_net_name: string;
      strength: number;
      preprocessor: string;
      preprocessor_imgs: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SCRIPT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface Tiled_Upscaler_Script {
    /**
     * INPUT_TYPES: upscale_by, tile_size, tiling_strategy, tiling_steps, seed, denoise, use_controlnet, tile_controlnet, strength
     */
    inputs?: {
      upscale_by: number;
      tile_size: number;
      tiling_strategy: string;
      tiling_steps: number;
      seed: number;
      denoise: number;
      use_controlnet: unknown;
      tile_controlnet: string;
      strength: number;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: SCRIPT
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface LoRA_Stack_to_String_converter {
    /**
     * INPUT_TYPES: lora_stack
     */
    inputs?: {
      lora_stack: unknown;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: STRING
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface Evaluate_Integers {
    /**
     * INPUT_TYPES: python_expression, print_to_console
     */
    inputs?: {
      python_expression: string;
      print_to_console: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: INT, FLOAT, STRING
     */
    outputs?: [unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface Evaluate_Floats {
    /**
     * INPUT_TYPES: python_expression, print_to_console
     */
    inputs?: {
      python_expression: string;
      print_to_console: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: INT, FLOAT, STRING
     */
    outputs?: [unknown, unknown, unknown];
    [k: string]: unknown;
  }

  export interface Evaluate_Strings {
    /**
     * INPUT_TYPES: python_expression, print_to_console
     */
    inputs?: {
      python_expression: string;
      print_to_console: string;
      [k: string]: unknown;
    };
    /**
     * RETURN_TYPES: STRING
     */
    outputs?: [unknown];
    [k: string]: unknown;
  }

  export interface SaveImageWebsocket {
    /**
     * INPUT_TYPES: images
     */
    inputs?: {
      images: unknown;
      [k: string]: unknown;
    };
    /** NO_OUTPUTS */
    outputs?: [];
    [k: string]: unknown;
  }
}
