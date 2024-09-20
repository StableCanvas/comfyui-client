import "esm-hook";
import { Client, Workflow } from "../../../src/main";
import WebSocket from "ws";
import fetch from "node-fetch";

import { save_wf_outputs } from "./utils";

import fs from "fs";
import path from "path";

const createWorkflow = () => {
  const workflow = new Workflow();
  const cls = workflow.classes;
  const [model, clip, vae] = cls.CheckpointLoaderSimple({
    ckpt_name: "LOFI_V5.fp16.safetensors",
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
      "worst quality, bad anatomy, embedding:NG_DeepNegative_V1_75T",
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

const client = new Client({
  api_host: "127.0.0.1:8188",
  WebSocket: WebSocket as any,
  fetch: fetch as any,
});
const main = async () => {
  client.connect();
  const wk1 = createWorkflow();
  const resp = await wk1.invoke(client);
  await save_wf_outputs(resp);
};

main()
  .then(() => console.log("done"))
  .catch((e) => console.error(e))
  .finally(() => client.close());
