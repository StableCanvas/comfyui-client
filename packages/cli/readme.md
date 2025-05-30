# cli tools for @stable-canvas/comfyui-client

[readme](https://github.com/StableCanvas/comfyui-client)

## usage

```
npm install -g @stable-canvas/comfyui-client-cli
```

```
> cuc-w2c -h
```

```bash
Usage: nodejs-comfy-ui-client-code-gen [options]

Use this tool to generate the corresponding calling code using workflow

Options:
  -V, --version              output the version number
  -t, --template [template]  Specify the template for generating code, builtin tpl: [esm,cjs,web,none]
                             (default: "esm")
  -o, --out [output]         Specify the output file for the generated code. default to stdout
  -i, --in <input>           Specify the input file, support .json/.png file
  -h, --help                 display help for command
```

## Example

```
cuc-w2c -i ./tests/test-inputs/workflow_api.json
```

### Expected Output

```ts
import { Client, Workflow } from "@stable-canvas/comfyui-client";

const createWorkflow = () => {
  const workflow = new Workflow();
  const cls = workflow.classes;

  const [LATENT_2] = cls.EmptyLatentImage({
    width: 512,
    height: 512,
    batch_size: 1,
  });
  const [MODEL_1, CLIP_1, VAE_1] = cls.CheckpointLoaderSimple({
    ckpt_name: "EPIC-la-v1.ckpt",
  });
  const [CONDITIONING_2] = cls.CLIPTextEncode({
    text: "text, watermark",
    clip: CLIP_1,
  });
  const [CONDITIONING_1] = cls.CLIPTextEncode({
    text: "beautiful scenery nature glass bottle landscape, , purple galaxy bottle,",
    clip: CLIP_1,
  });
  const [LATENT_1] = cls.KSampler({
    seed: 156680208700286,
    steps: 20,
    cfg: 8,
    sampler_name: "euler",
    scheduler: "normal",
    denoise: 1,
    model: MODEL_1,
    positive: CONDITIONING_1,
    negative: CONDITIONING_2,
    latent_image: LATENT_2,
  });
  const [IMAGE_1] = cls.VAEDecode({
    samples: LATENT_1,
    vae: VAE_1,
  });
  const [] = cls.SaveImage({
    filename_prefix: "ComfyUI",
    images: IMAGE_1,
  });

  return workflow;
};

async function main(envs = {}) {
  const env = (k) => envs[k];

  const client = new Client({
    api_host: env("COMFYUI_CLIENT_API_HOST"),
    api_base: env("COMFYUI_CLIENT_API_BASE"),
    clientId: env("COMFYUI_CLIENT_CLIENT_ID"),
  });

  await client.connect();

  const workflow = createWorkflow();

  console.time("enqueue workflow");
  try {
    return await workflow.invoke(client);
  } catch (error) {
    throw error;
  } finally {
    console.timeEnd("enqueue workflow");
    client.disconnect();
  }
}

main(
  typeof globalThis?.process?.env === "object"
    ? globalThis.process.env
    : globalThis,
)
  .then(() => {
    console.log("DONE");
  })
  .catch((err) => {
    console.error("ERR", err);
  });
```
