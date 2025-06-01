# Transpiler

The transpiler can translate ComfyUI's workflows to `@stable-canvas/comfyui-client` format.

```
npm install @stable-canvas/comfyui-client-transpiler
```

# Usage

**Since the order of widgets may change at any time, the function from `.png` to code may be unstable. It is recommended to use `.json`(API Format) to code**

## From JSON (API Format)

```ts
import { JsonReader } from "@stable-canvas/cw-reader";
import { Transpiler } from "./src/main";
import fs from "fs";

const file1 = await fs.promises.readFile("./tests/workflow-min.json");
const reader = new JsonReader(JSON.parse(file1.toString("utf-8")));
const workflow = await reader.getWorkflow();
const transpiler = new Transpiler(workflow);
const code = transpiler.toCode();
await fs.promises.writeFile("./demo_output.ts", code, {
  encoding: "utf-8",
});
```

### Expected Output

<details>

```ts
const [LATENT_1] = cls.EmptyLatentImage({
  width: 512,
  height: 512,
  batch_size: 1,
});
const [MODEL_1, CLIP_1, VAE_1] = cls.CheckpointLoaderSimple({
  ckpt_name: "lofi_v5.baked.fp16.safetensors",
});
const [CONDITIONING_2] = cls.CLIPTextEncode({
  text: "worst quality, bad anatomy, embedding:NG_DeepNegative_V1_75T",
  clip: CLIP_1,
});
const [CONDITIONING_1] = cls.CLIPTextEncode({
  text: "best quality, 1girl",
  clip: CLIP_1,
});
const [LATENT_2] = cls.KSampler({
  seed: 2765233096,
  steps: 35,
  cfg: 4,
  sampler_name: "dpmpp_2m_sde_gpu",
  scheduler: "karras",
  denoise: 1,
  model: MODEL_1,
  positive: CONDITIONING_1,
  negative: CONDITIONING_2,
  latent_image: LATENT_1,
});
const [IMAGE_1] = cls.VAEDecode({
  samples: LATENT_2,
  vae: VAE_1,
});
const [] = cls.SaveImage({
  filename_prefix: "from-sc-comfy-ui-client",
  images: IMAGE_1,
});
```

</details>

## From Workflow.png

```ts
import { ImageReader } from "@stable-canvas/cw-reader";
import { Transpiler } from "./src/main";
import fs from "fs";

const file1 = await fs.promises.readFile("./tests/img2img_workflow.png");
const reader = new ImageReader(file1.buffer);
const workflow = await reader.getWorkflow();
const transpiler = new Transpiler(workflow);
const code = transpiler.toCode();
await fs.promises.writeFile("./img2img_workflow.ts", code, {
  encoding: "utf-8",
});
```

### Expected Output

<details>

```ts
const [MODEL_1, CLIP_1, VAE_1] = cls.CheckpointLoaderSimple({
  ckpt_name: "v1-5-pruned-emaonly.ckpt",
});
const [CONDITIONING_2] = cls.CLIPTextEncode({
  text: "photograph of victorian woman with wings, sky clouds, meadow grass\n",
  clip: CLIP_1,
});
const [CONDITIONING_1] = cls.CLIPTextEncode({
  text: "watermark, text\n",
  clip: CLIP_1,
});
const [IMAGE_2, MASK_1] = cls.LoadImage({
  image: "example.png",
  upload: "image",
});
const [LATENT_1] = cls.VAEEncode({
  pixels: IMAGE_2,
  vae: VAE_1,
});
const [LATENT_2] = cls.KSampler({
  seed: 280823642470253,
  control_after_generate: "randomize",
  steps: 20,
  cfg: 8,
  sampler_name: "dpmpp_2m",
  scheduler: "normal",
  denoise: 0.8700000000000001,
  model: MODEL_1,
  positive: CONDITIONING_2,
  negative: CONDITIONING_1,
  latent_image: LATENT_1,
});
const [IMAGE_1] = cls.VAEDecode({
  samples: LATENT_2,
  vae: VAE_1,
});
const [] = cls.SaveImage({
  filename_prefix: "ComfyUI",
  images: IMAGE_1,
});
```

</details>
