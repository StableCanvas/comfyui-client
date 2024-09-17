import type { ComfyUIWorkflow } from "../../src/ComfyUIWorkflow";

export const useSimple1 = (
  workflow: ComfyUIWorkflow,
  { steps = 1, cfg = 4, denoise = 1, seed = 42, width = 512, height = 512 } = {
    steps: 1,
    cfg: 4,
    denoise: 1,
    seed: 42,
    width: 512,
    height: 512,
  } as {
    steps?: number;
    cfg?: number;
    denoise?: number;
    seed?: number;
    width?: number;
    height?: number;
  }
) => {
  const cls = workflow.classes;
  const [model, clip, vae] = cls.CheckpointLoaderSimple({
    ckpt_name: "LOFI_V5.fp16.safetensors",
  });
  const enc = (text: string) => cls.CLIPTextEncode({ text, clip })[0];
  const [samples] = cls.KSampler({
    seed,
    steps,
    cfg,
    sampler_name: "dpmpp_2m_sde_gpu",
    scheduler: "karras",
    denoise,
    model,
    positive: enc("best quality, 1girl"),
    negative: enc(
      "worst quality, bad anatomy, embedding:NG_DeepNegative_V1_75T"
    ),
    latent_image: cls.EmptyLatentImage({
      width,
      height,
      batch_size: 1,
    })[0],
  });
  cls.SaveImage({
    filename_prefix: "from-sc-comfy-ui-client",
    images: cls.VAEDecode({ samples, vae })[0],
  });

  return workflow;
};
