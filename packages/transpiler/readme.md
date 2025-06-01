# Transpiler

The transpiler can translate ComfyUI's workflows to `@stable-canvas/comfyui-client` format.

```
npm install @stable-canvas/comfyui-client-transpiler
```

# Usage

**Since the order of widgets may change at any time, the function from `.png` to code may be unstable. It is recommended to use `.json`(API Format) to code**

```ts
import { Transpiler } from "@stable-canvas/comfyui-client-transpiler";
import { ImageReader } from "@stable-canvas/cw-reader";
const file1 = await fs.promises.readFile("./tests/img2img_workflow.png");
const reader = new ImageReader(file1.buffer);
const workflow = await reader.getWorkflow();
const transpiler = new Transpiler(workflow);
const code = transpiler.toCode();
await fs.promises.writeFile("./img2img_workflow.ts", code, {
  encoding: "utf-8",
});
```

## Expected Output

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
