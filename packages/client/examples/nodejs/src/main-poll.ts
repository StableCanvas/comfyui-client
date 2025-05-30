// Polling example with optional polling time config
import "esm-hook";
import { Client, Workflow } from "../../../src/main";
import fetch from "node-fetch";

const createWorkflow = () => {
  const workflow = new Workflow();
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

  const [model, clip, vae] = load_model(
    "WildCardX-XL TURBO/wildcardxXLTURBO_wildcardxXLTURBOV10-mid_293331-vid_329685.safetensors",
  );
  const latent_image = empty_latent(512, 512);
  const { positive, negative } = text_prompt(
    "best quality, 1girl",
    "worst quality, bad anatomy",
    clip,
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

const client = new Client({
  api_host: "xxxx-xxx-xxx-xxxx.proxy.runpod.net",
  api_base: "",
  sessionName: "rbt-comfy-client",
  fetch: fetch as any,
  ssl: true, // must have when using with runpod
});
const main = async () => {
  const wk1 = createWorkflow();
  console.time("invoke_polling");

  // Polling config example
  const resp = await wk1.invoke_polling(client, {
    // NOTE: optional polling time config; default is 1000ms
    polling_ms: 100,
  });
  console.timeEnd("invoke_polling");
  console.dir(resp);
};

main()
  .then(() => console.log("done"))
  .catch((e) => console.error(e))
  .finally(() => client.close());
