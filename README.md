# comfyui-client
comfyui client for js

# Usage

```
npm install @stable-canvas/comfyui-client
```

## browser

```ts
import { ComfyUIApiClient } from "@stable-canvas/comfyui-client";

const payload = { /* ... */ };

const client = new ComfyUIApiClient();
client.init();
const resp = await client.runPrompt(payload.prompt, {
    workflow: payload.workflow,
    disable_random_seed: false,
});
client.close();
console.log(resp);
```

## nodejs
```ts
import { ComfyUIApiClient } from "@stable-canvas/comfyui-client";
import WebSocket from "ws";
import fetch from "node-fetch";

const payload = { /* ... */ };

const client = new ComfyUIApiClient({
    WebSocket,
    fetch,
});
client.init();
const resp = await client.runPrompt(payload.prompt, {
workflow: payload.workflow,
disable_random_seed: false,
});
client.close();
console.log(resp);

```

