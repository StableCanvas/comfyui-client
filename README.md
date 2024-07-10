# @stable-canvas/comfyui-client

[![npm](https://img.shields.io/npm/v/@stable-canvas/comfyui-client)](https://www.npmjs.com/package/@stable-canvas/comfyui-client)
[![npm](https://img.shields.io/npm/dw/@stable-canvas/comfyui-client)](https://www.npmjs.com/package/@stable-canvas/comfyui-client)
[![GitHub Repo stars](https://img.shields.io/github/stars/StableCanvas/comfyui-client)](https://github.com/StableCanvas/comfyui-client)

Javascript api Client for [ComfyUI](https://github.com/comfyanonymous/ComfyUI) that supports both NodeJS and Browser environments.

This client provides comprehensive support for all available RESTful and WebSocket APIs, with built-in TypeScript typings for enhanced development experience. Additionally, it introduces a programmable workflow interface, making it easy to create and manage workflows in a human-readable format.

documentations:
- [Rest API](https://stablecanvas.github.io/comfyui-client/classes/ComfyUIApiClient.html)
- [WebSocket API](https://stablecanvas.github.io/comfyui-client/classes/ComfyUIWsClient.html)
- [Workflow API](https://stablecanvas.github.io/comfyui-client/classes/ComfyUIWorkflow.html)

examples:
- nodejs
  - [client api](examples/nodejs/src/main.ts)
  - [workflow factory api](examples/nodejs/src/main-wf.ts)
- [Web](examples/web/index.html)

## Features

- **Environment Compatibility**: Seamlessly functions in both NodeJS and Browser environments.
- **Comprehensive API Support**: Provides full support for all available RESTful and WebSocket APIs.
- **TypeScript Typings**: Comes with built-in TypeScript support for type safety and better development experience.
- **Programmable Workflows**: Introduces a human-readable and highly customizable workflow interface inspired by [this issue](https://github.com/comfyanonymous/ComfyUI/issues/612) and [this library](https://github.com/Chaoses-Ib/ComfyScript).
- **Ease of Use**: Both implementation and usage are designed to be intuitive and user-friendly.

By incorporating these features, `@stable-canvas/comfyui-client` provides a robust and versatile solution for integrating ComfyUI capabilities into your projects effortlessly.

## Installation

Use npm or yarn to install the `@stable-canvas/comfyui-client` package.

```bash
pnpm add @stable-canvas/comfyui-client
```

## Client Usage

First, import the `ComfyUIApiClient` class from the package.

```javascript
import { ComfyUIApiClient } from "@stable-canvas/comfyui-client";
```

Client instance, in Browser
```js
const client = new ComfyUIApiClient({
    api_host: "127.0.0.1:8188",
})
// connect ws client
client.connect();
```
Client instance, in NodeJs
```js
import WebSocket from "ws";
import fetch from "node-fetch";

const client = new ComfyUIApiClient({
    //...
    WebSocket,
    fetch,
});
// connect ws client
client.connect();
```


### Advanced functions
In addition to the standard API interfaces provided by comfyui, this library also wraps them to provide advanced calls

#### enqueue
```ts
const result = await client.enqueue(
  { /* workflow prompt */ },
  {
    progress: ({max,value}) => console.log(`progress: ${value}/${max}`);
  }
);
```
It's very simple; it includes the entire prompt interface life cycle and waits for and collectively returns the result at the end of the request

> In some cases you might not want to use ws, then you can use `enqueue_polling`, this function will perform similar behavior to `enqueue`, but uses rest http to poll the task status

#### Get XXX
Sometimes you may need to check some configurations of ComfyUI, such as whether a deployment service contains the needed model or lora, then these interfaces will be useful

`getSamplers` `getSchedulers` `getSDModels` `getCNetModels` `getUpscaleModels` `getHyperNetworks` `getLoRAs` `getVAEs`

#### InvokedWorkflow
If you need to manage the life cycle of your request, then this class can be very convenient

instance
```ts
// You can instantiate manually
const invoked = new InvokedWorkflow({ /* workflow */ }, client);
// or use the workflow api to instantiate
const invoked = your_workflow.instance();
```
running
```ts
// job enqueue
invoked.enqueue();
// job result promise
const job_promise = invoked.wait();
// if you want interrupt it
invoked.interrupt();
// query job status
invoked.query();
```


## Workflow Usage
### Programmable/Human-readable pattern
Inspired by [this issue](https://github.com/comfyanonymous/ComfyUI/issues/612) and [this library](https://github.com/Chaoses-Ib/ComfyScript), this library provides a programmable workflow interface.

It has the following use cases:
- **Interactive GUI Integration**: Offers support for seamless integration with ComfyUI's new GUI, enhancing user interaction possibilities.
- **LLMs for Workflow Generation**: Leverages the ability of large language models to understand Javascript for creating workflows.
- **Cross-Project Workflow Reuse**: Enables the sharing and repurposing of workflow components across different projects using ComfyUI.
- **Custom Node Creation**: Assists in developing and integrating custom nodes into existing workflows for expanded functionality.
- **Workflow Visualization**: Facilitates a clearer understanding of workflows by translating them into a visual format suitable for ComfyUI's GUI.
- **Model Research and Development**: Provides a framework for leveraging ComfyUI nodes in machine learning research without execution capabilities.
- **Script-Driven Workflow Templates**: Enables the generation of templated workflows through scripting for consistent and efficient project setups.
- **Web UI-independent Workflow Deployment**: Enables the creation and deployment of workflows without reliance on a web-based user interface.

### Minimal case
Here is a minimal example demonstrating how to create and execute a simple workflow using this library.

```ts
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
```

### Programable case
Both implementation and usage are extremely simple and human-readable. Below is a simple example of creating a workflow:

```ts
const createWorkflow = () => {
  const workflow = new ComfyUIWorkflow();
  const {
    KSampler,
    CheckpointLoaderSimple,
    EmptyLatentImage,
    CLIPTextEncode,
    VAEDecode,
    SaveImage,
    NODE1,
  } = workflow.classes;

  const seed = Math.floor(Math.random() * 2 ** 32);
  const pos = "best quality, 1girl";
  const neg = "worst quality, bad anatomy, embedding:NG_DeepNegative_V1_75T";
  const model1_name = "lofi_v5.baked.fp16.safetensors";
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

  for (const cloth of dress_case) {
    const input_pos = `${pos}, ${cloth} dress`;
    const image = generate_pipeline(model1, clip1, vae1, input_pos, neg);
    SaveImage({
      images: image,
      filename_prefix: `${cloth}-lofi-v5`,
    });

    const input_pos2 = `${pos}, ${cloth} dress`;
    const image2 = generate_pipeline(model2, clip2, vae2, input_pos2, neg);
    SaveImage({
      images: image2,
      filename_prefix: `${cloth}-case-h-beta`,
    });
  }

  return workflow;
};

const wf1 = createWorkflow();
// { prompt: {...}, workflow: {...} }
```

### type support

- builtin node types
 
![node types](https://raw.githubusercontent.com/StableCanvas/comfyui-client/main/assets/type_hints.png)

- builtin node params

![node params](https://raw.githubusercontent.com/StableCanvas/comfyui-client/main/assets/params.png)

- any other node

![other node](https://raw.githubusercontent.com/StableCanvas/comfyui-client/main/assets/anynode.png)

### Invoke workflow
```ts
const wf1 = createWorkflow();
const result = await wf1.invoke(client);
```

## CLI

### install
```
npm install @stable-canvas/comfyui-client-cli
```

### Workflow to code

This tool converts the input workflow into executable code that uses this library.

```
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

#### example: api.json to code
```
cuc-w2c -i ./tests/test-inputs/workflow_api.json -t none
```

input file: [./cli/tests/test-inputs/workflow_api.json](./cli/tests/test-inputs/workflow_api.json)

<details>
<summary>Output</summary>

```ts
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
```

</details>

#### example: export-png to code
```
cuc-w2c -i ./tests/test-inputs/workflow-min.png -t none
```

input file: [./cli/tests/test-inputs/workflow-min.png](./cli/tests/test-inputs/workflow-min.png)


<details>
<summary>Output</summary>

```ts
const [MODEL_1, CLIP_1, VAE_1] = cls.CheckpointLoaderSimple({
  ckpt_name: "EPIC-la-v1.ckpt",
});
const [CONDITIONING_2] = cls.CLIPTextEncode({
  text: "beautiful scenery nature glass bottle landscape, , purple galaxy bottle,",
  clip: CLIP_1,
});
const [CONDITIONING_1] = cls.CLIPTextEncode({
  text: "text, watermark",
  clip: CLIP_1,
});
const [LATENT_1] = cls.EmptyLatentImage({
  width: 512,
  height: 512,
  batch_size: 1,
});
const [LATENT_2] = cls.KSampler({
  seed: 156680208700286,
  control_after_generate: "randomize",
  steps: 20,
  cfg: 8,
  sampler_name: "euler",
  scheduler: "normal",
  denoise: 1,
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

> Since the order of widgets may change at any time, the function from .png to code may be unstable. It is recommended to use .json to code

## Client Plugin
We provide ClientPlugin to expand Client capabilities.

simple example
```ts
import { ClientPlugin } from "@stable-canvas/comfy"
export class LoggingPlugin extends ClientPlugin {
  constructor() {
    super();

    this.addHook({
      type: "function",
      name: "fetch",
      fn: async (original, ...args) => {
        console.log("fetch args", args);
        const resp = await original(...args);
        console.log("fetch resp", resp);
        return resp;
      },
    });
  }
}
```

### ComfyUI Login Auth
For example, sometimes you may need to provide node authentication capabilities, and you may have many solutions to implement your ComfyUI permission management

If you use the [ComfyUI-Login](https://github.com/liusida/ComfyUI-Login/tree/main) extension, you can use the built-in `LoginAuthPlugin` to configure the Client to support authentication
```ts
import { ComfyUIApiClient, LoginAuthPlugin } from "@stable-canvas/comfyui-client";
const client = new ComfyUIApiClient()
client.use(
  new LoginAuthPlugin({
    token: "MY_TOP_SECRET"
  })
);
```

## Custom Events

### Subscribing to Custom Events

If your ComfyUI instance emits custom WebSocket events, you can subscribe to them as follows:

```ts
client.events.on('your_custom_event_type', (data) => {
  // 'data' contains the event payload object
  console.log('Received custom event:', data);
});
```

### Handling Unsubscribed Events

To capture and process events that haven't been explicitly subscribed to, use the `unhandled` event listener:

```ts
client.events.on('unhandled', ({ type, data }) => {
  // 'type' is the event type
  // 'data' is the event payload object
  console.log(`Received unhandled event of type '${type}':`, data);
});
```

### Handling All Event Messages

Register the `message` event to subscribe to all WebSocket messages pushed from ComfyUI

```ts
client.events.on('message', (event) => {
  if (typeof event.data !== 'string') return;
  const { type, data } = JSON.parse(event.data);
  // ...
});
```

## Roadmap

- [x] workflow to code: Transpiler workflow to code
  - [x] .json => code
  - [x] .png => code
- [ ] code to workflow: Output a json file that can be imported into the web front end
- [ ] Output type hints

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

MIT