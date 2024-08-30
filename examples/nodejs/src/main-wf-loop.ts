import "esm-hook";
import { ComfyUIApiClient, ComfyUIWorkflow } from "../../../src/main";
import WebSocket from "ws";
import fetch from "node-fetch";

import fs from "fs";
import path from "path";
import { save_url_to_file, save_wf_outputs } from "./utils";

const createWorkflow = ({
  out_from_ws_m1 = false,
  out_from_ws_m2 = false,
}: {
  out_from_ws_m1?: boolean;
  out_from_ws_m2?: boolean;
}) => {
  const workflow = new ComfyUIWorkflow();
  const {
    KSampler,
    CheckpointLoaderSimple,
    EmptyLatentImage,
    CLIPTextEncode,
    VAEDecode,
    SaveImage,
    ETN_SendImageWebSocket,
  } = workflow.classes;

  const seed = Math.floor(Math.random() * 2 ** 32);
  const pos = "best quality, 1girl";
  const neg = "worst quality, bad anatomy, embedding:NG_DeepNegative_V1_75T";
  const model1_name = "LOFI_V5.fp16.safetensors";
  const model2_name = "case-h-beta.baked.fp16.safetensors";
  const sampler_settings = {
    seed,
    steps: 35,
    cfg: 4,
    sampler_name: "dpmpp_2m_sde_gpu",
    scheduler: "karras",
    denoise: 1,
  };

  const [model1, clip1, vae1] = CheckpointLoaderSimple({
    ckpt_name: model1_name,
  });
  const [model2, clip2, vae2] = CheckpointLoaderSimple({
    ckpt_name: model2_name,
  });

  const dress_case = [
    "white yoga",
    "black office",
    "pink sportswear",
    "cosplay",
  ];

  const generate_pipeline = (model, clip, vae, pos, neg) => {
    const [latent_image] = EmptyLatentImage({
      width: 640,
      height: 960,
      batch_size: 1,
    });
    const [positive] = CLIPTextEncode({ text: pos, clip });
    const [negative] = CLIPTextEncode({ text: neg, clip });
    const [samples] = KSampler({
      ...sampler_settings,
      model,
      positive,
      negative,
      latent_image,
    });
    const [image] = VAEDecode({ samples, vae });
    return image;
  };

  // NOTE: This distinction serves two purposes: firstly, to demonstrate the workflow, and secondly, to test the mixed use of WebSocket and REST
  const save_image = (image, filename_prefix, by_ws = false) => {
    if (by_ws) {
      ETN_SendImageWebSocket({
        images: image,
      });
    } else {
      SaveImage({
        images: image,
        filename_prefix,
      });
    }
  };

  for (const cloth of dress_case) {
    const input_pos = `${pos}, ${cloth} dress`;
    const image1 = generate_pipeline(model1, clip1, vae1, input_pos, neg);
    const input_pos2 = `${pos}, ${cloth} dress`;
    const image2 = generate_pipeline(model2, clip2, vae2, input_pos2, neg);

    save_image(image1, `${cloth}-lofi-v5`, out_from_ws_m1);
    save_image(image2, `${cloth}-case-h-beta`, out_from_ws_m2);
  }

  return workflow;
};

const main = async () => {
  const client = new ComfyUIApiClient({
    api_host: "127.0.0.1:8188",
    api_base: "",
    sessionName: "",
    // user: "comfy-client",
    user: "undefined",
    WebSocket: WebSocket as any,
    fetch: fetch as any,
  });
  client.connect();
  const wk1 = createWorkflow({
    out_from_ws_m1: true,
    out_from_ws_m2: false,
  });
  fs.writeFileSync(
    path.join(__dirname, "../outputs/workflow-wf-loop.json"),
    JSON.stringify(wk1.workflow(), null, 2)
  );
  const resp = await wk1.invoke(client);
  client.close();
  console.log(resp);

  await save_wf_outputs(resp);
};

main()
  .then(() => console.log("done"))
  .catch((e) => console.error(e));
