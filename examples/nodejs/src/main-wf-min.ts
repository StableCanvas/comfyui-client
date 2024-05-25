import "esm-hook";
import { ComfyUIApiClient, ComfyUIWorkflow } from "../../../src/main";
import WebSocket from "ws";
import fetch from "node-fetch";

import { save_wf_outputs } from "./utils";

const createWorkflow = () => {
  const workflow = new ComfyUIWorkflow();
  const cls = workflow.classes;
  const [model, clip, vae] = cls.CheckpointLoaderSimple({
    ckpt_name: "lofi_v5.baked.fp16.safetensors",
  });
  const enc = (text: string) => cls.CLIPTextEncode({ text, clip })[0];
  const [samples] = cls.KSampler({
    seed: Math.floor(Math.random() * 2 ** 32),
    steps: 35,
    cfg: 4,
    sampler_name: "dpmpp_2m_sde_gpu",
    scheduler: "karras",
    denoise: 1,
    model,
    positive: enc("best quality, 1girl"),
    negative: enc(
      "worst quality, bad anatomy, embedding:NG_DeepNegative_V1_75T"
    ),
    latent_image: cls.EmptyLatentImage({
      width: 512,
      height: 512,
      batch_size: 1,
    })[0],
  });
  cls.SaveImage({
    filename_prefix: "from-sc-comfy-ui-client",
    images: cls.VAEDecode({ samples, vae })[0],
  });

  return workflow;
};

const main = async () => {
  const client = new ComfyUIApiClient({
    api_host: "127.0.0.1:8188",
    WebSocket,
    fetch: fetch as any,
  });
  client.connect();

  client.on("message", (event) => {
    const { data } = event;
    if (data instanceof Buffer || data instanceof ArrayBuffer) {
      console.log("Received image data");
    } else {
      console.log(data);
    }
  });

  const wk1 = createWorkflow();
  const resp = await wk1.invoke(client);
  client.close();

  await save_wf_outputs(resp);
};

main()
  .then(() => console.log("done"))
  .catch((e) => console.error(e));
