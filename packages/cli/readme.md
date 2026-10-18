# cli tools for @stable-canvas/comfyui-client

[readme](https://github.com/StableCanvas/comfyui-client)

## usage

**Since the order of widgets may change at any time, the function from `.png` to code may be unstable. It is recommended to use `.json`(API Format) to code**

```
npm install -g @stable-canvas/comfyui-client-cli
```

```
> cuc-w2c -h
```

```bash
Usage: cuc-w2c [options]

Use this tool to generate the corresponding calling code using workflow

Options:
  -V, --version              output the version number
  -i, --in <input>           Specify the input file, support .json/.png file
  -t, --template <template>  Specify the template for generating code, builtin
                             tpl: [esm,ts,cjs,web,none] (default: "esm")
  -o, --out <output>         Specify the output file for the generated code.
                             default to stdout
  --unicode-escape           Escape non-ASCII characters as Unicode escape sequences
  --debug                    Print the full error stack when code generation fails
  -h, --help                 display help for command
```

Node.js 18 or newer is required. The generated `esm`, `ts`, and `cjs` templates use the `ws` package for Node.js WebSocket support:

```bash
npm install @stable-canvas/comfyui-client ws
```

Supported templates:

- `esm`: Node.js ES module JavaScript.
- `ts`: Node.js TypeScript with typed environment access.
- `cjs`: Node.js CommonJS JavaScript.
- `web`: browser ES module.
- `none`: generated workflow fragment without a wrapper.

## Example

```

cuc-w2c -i ./tests/test-inputs/workflow_api.json -t ts -o workflow.ts
```

### Expected Output

```ts
import { Client, Workflow } from "@stable-canvas/comfyui-client";
import WebSocket from "ws";

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

async function main(envs: Record<string, string | undefined> = process.env) {
  const env = (k) => envs[k];

  const client = new Client({
    api_host: env("COMFYUI_CLIENT_API_HOST"),
    api_base: env("COMFYUI_CLIENT_API_BASE"),
    clientId: env("COMFYUI_CLIENT_CLIENT_ID"),
    WebSocket: WebSocket as any,
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
