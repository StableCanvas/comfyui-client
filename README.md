# @stable-canvas/comfyui-client

[![npm](https://img.shields.io/npm/v/@stable-canvas/comfyui-client)](https://www.npmjs.com/package/@stable-canvas/comfyui-client)
[![npm](https://img.shields.io/npm/dw/@stable-canvas/comfyui-client)](https://www.npmjs.com/package/@stable-canvas/comfyui-client)
[![GitHub Repo stars](https://img.shields.io/github/stars/StableCanvas/comfyui-client)](https://github.com/StableCanvas/comfyui-client)

Javascript api Client for [ComfyUI](https://github.com/comfyanonymous/ComfyUI) that supports both NodeJS and Browser environments. It provides full support for all RESTful / WebSocket APIs.

documentations:
- [Rest API](https://stablecanvas.github.io/comfyui-client/classes/ComfyUIApiClient.html)
- [WebSocket API](https://stablecanvas.github.io/comfyui-client/classes/ComfyUIWsClient.html)

examples:
- [NodeJS](examples\nodejs\src\main.ts)
- [Web](examples\web\index.html)

## Features

- **Environment Compatibility**: Seamlessly functions in both `nodejs` and `browser` environments.
- **Comprehensive API Support**: Provides full support for all available APIs.
- **TypeScript Typings**: Comes with TypeScript support.

## Installation

Use npm or yarn to install the `@stable-canvas/comfyui-client` package.

```bash
pnpm add @stable-canvas/comfyui-client
```

## Usage

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
Execute prompt
```javascript
// Define the prompt and optional workflow
let prompt = { /* prompt details */ };
let workflow = { /* workflow details */ };

// Execute the prompt
const result = await client.runPrompt(prompt, { workflow });
console.log(result); // { images: [...] }
```

## APIs

### Checking Prompt Status
Obtains the execution status of a specific prompt using its unique prompt ID.

|| |
|--|--|
| usage | `await client.getPromptStatus(prompt_id)` |
| params | prompt_id: string - Identifier of the prompt |
| return | Object detailing the status with fields: `running`, `pending`, `done` |

### Retrieving Prompt Results
Fetches the result of a completed prompt, typically an array of URLs pointing to generated images.

|| |
|--|--|
| usage | `await client.getPromptResult(prompt_id)` |
| params | prompt_id: string - Identifier of the prompt |
| return | Object containing an array of image URLs (`images`) and the original `prompt_id` |

### Waiting for a Prompt to Complete
Asynchronously waits for a prompt to transition to a complete (done) status before proceeding.

|| |
|--|--|
| usage | `await client.waitForPrompt(prompt_id)` |
| params | prompt_id: string - Identifier of the prompt |
| return | void |

### Randomizing Prompt Seed

### randomizePrompt
Randomizes the seed value for specific nodes within a prompt, facilitating the generation of unique images.

|| |
|--|--|
| usage | `client.randomizePrompt(prompt)` |
| params | prompt: Record<string, unknown> - The prompt object to modify |
| return | void |

### Running a Prompt with Automated Monitoring

### runPrompt
Executes a prompt with optional workflow information and automated monitoring until completion, returning generated images.

|| |
|--|--|
| usage | `await client.runPrompt(prompt, options)` |
| params | prompt: Record<string, unknown> - The prompt object to run<br/>options?: { workflow?: Record<string, unknown>, disable_random_seed?: boolean, wait_ms?: number; } - Options including workflow details and a flag to disable random seed generation |
| return | Promise<any> - A promise that resolves with the result of the prompt, typically image URLs |

## Other internal Apis

document: https://StableCanvas.github.io/comfyui-client

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

MIT
