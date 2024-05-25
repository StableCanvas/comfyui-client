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

  const load_model = (model_name: string) => {
    return CheckpointLoaderSimple({
      ckpt_name: model_name,
    });
  };
  const empty_latent = (w: number, h: number) =>
    EmptyLatentImage({ width: w, height: h, batch_size: 1 })[0];
  const text_encode = (text: string, clip) => CLIPTextEncode({ text, clip })[0];

  const text_prompt = (positive: string, negative: string, clip) => {
    return {
      positive: text_encode(positive, clip),
      negative: text_encode(negative, clip),
    };
  };

  const [model, clip, vae] = load_model("lofi_v5.baked.fp16.safetensors");
  const latent_image = empty_latent(512, 512);
  const { positive, negative } = text_prompt(
    "best quality, 1girl",
    "worst quality, bad anatomy, embedding:NG_DeepNegative_V1_75T",
    clip
  );

  const [samples] = KSampler({
    seed: Math.floor(Math.random() * 2 ** 32),
    steps: 35,
    cfg: 4,
    sampler_name: "dpmpp_2m_sde_gpu",
    scheduler: "karras",
    denoise: 1,
    model,
    positive,
    negative,
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
