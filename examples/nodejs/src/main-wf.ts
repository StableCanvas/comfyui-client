import "esm-hook";
import { ComfyUIApiClient, ComfyUIWorkflow } from "../../../src/main";
import WebSocket from "ws";
import fetch from "node-fetch";

const createWorkflow = () => {
  const workflow = new ComfyUIWorkflow();
  const {
    KSampler,
    CheckpointLoaderSimple,
    EmptyLatentImage,
    CLIPTextEncode,
    VAEDecode,
    SaveImage,
  } = workflow.classes;

  const [model, clip, vae] = CheckpointLoaderSimple({
    ckpt_name: "lofi_v5.baked.fp16.safetensors",
  });
  const [latent_image] = EmptyLatentImage({
    width: 512,
    height: 768,
    batch_size: 1,
  });
  const [positive_conditioning] = CLIPTextEncode({
    text: "best quality, 1girl",
    clip,
  });
  const [negative_conditioning] = CLIPTextEncode({
    text: "text,error,username,fake,drawing,painting,worst quality, bad anatomy, embedding:NG_DeepNegative_V1_75T",
    clip,
  });

  const [samples] = KSampler({
    seed: Math.floor(Math.random() * 2 ** 32),
    steps: 35,
    cfg: 4,
    sampler_name: "dpmpp_2m_sde_gpu",
    scheduler: "karras",
    denoise: 1,
    model,
    positive: positive_conditioning,
    negative: negative_conditioning,
    latent_image,
  });

  const [image] = VAEDecode({
    samples,
    vae,
  });

  SaveImage({
    filename_prefix: "from-sc-comfy-ui-client",
    images: image,
  });

  return workflow;
};

const main = async () => {
  const client = new ComfyUIApiClient({
    api_host: "127.0.0.1:8188",
    api_base: "",
    sessionName: "",
    // user: "comfy-client",
    user: "undefined",
    WebSocket,
    fetch: fetch as any,
  });
  client.connect();
  const wk1 = createWorkflow();
  const resp = await wk1.invoke(client);
  client.close();
  console.log(resp);
};

main()
  .then(() => console.log("done"))
  .catch((e) => console.error(e));
