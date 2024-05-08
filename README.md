# @stable-canvas/comfyui-client

This is a client for (ComfyUI)[https://github.com/comfyanonymous/ComfyUI] that supports both NodeJS and Browser environments. It provides full support for all RESTful APIs as well as WebSocket connections.

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
client.init(); // init ws client
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
client.init(); // init ws client
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

### ClientConfig
```ts
interface IComfyApiConfig {
  /**
   * The host address of the API server, defaults to '127.0.0.1:8188'.
   * @type {string} [api_host="127.0.0.1:8188"]
   */
  api_host?: string;
  
  /**
   * The base path for the API endpoints, default is an empty string.
   * @type {string} [api_base=""]
   */
  api_base?: string;
  
  /**
   * The client identification string, default is an empty string.
   * @type {string} [clientId=""]
   */
  clientId?: string;
  
  /**
   * The name of the session, used for identifying the session instance, default is an empty string.
   * @type {string} [sessionName=""]
   */
  sessionName?: string;
  
  /**
   * The username for authentication, default is 'sc-comfy-ui-client'.
   * @type {string} [user=""]
   */
  user?: string;

  /**
   * Whether to use SSL for the connections, defaults to false.
   * @type {boolean} [ssl=false]
   */
  ssl?: boolean;

  /**
   * These settings are for compatibility with Node.js environments.
   * @type {typeof WebSocket} [WebSocket] - The WebSocket class to use.
   * @type {typeof fetch} [fetch] - The fetch function to use.
   */
  WebSocket?: typeof WebSocket;
  fetch?: typeof fetch;
}
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

## Internal Apis

### getExtensions
Retrieves a list of extension URLs available in ComfyUI.

|| |
|--|--|
| usage | `client.getExtensions()` |
| params | None |
| return | Array of script URLs as strings |

### getEmbeddings
Gets a list of embedding names that can be used within ComfyUI.

|| |
|--|--|
| usage | `client.getEmbeddings()` |
| params | None |
| return | Array of embedding names as strings |

### getNodeDefs
Fetches node object definitions which are essential for graph-related operations in ComfyUI.

|| |
|--|--|
| usage | `client.getNodeDefs()` |
| params | None |
| return | A record (object) containing the node definitions |

### queuePrompt
Queues a prompt at a specified index in the running queue, allowing for finer control over the sequencing of operations.

|| |
|--|--|
| usage | `client.queuePrompt(queue_index, { prompt, workflow })` |
| params | queue_index: number - The queue index where to insert the prompt (-1 for the front).<br/>prompt: object - The prompt data to queue.<br/>workflow: object - The associated workflow information. |
| return | Object with either 'prompt_id', 'number', and 'node_errors' if successful, or 'error' and 'node_errors' detailing the issues encountered. |

### getItems
Loads a list of items depending on the specified type - either from the queue or the prompt execution history.

|| |
|--|--|
| usage | `client.getItems(type)` |
| params | type: "queue" \| "history" - Specify whether to load items from the queue or the history. |
| return | The returned structure will vary based on whether 'queue' or 'history' is selected, with each containing items grouped by their status. |

### getQueue
Obtains the current state of the queue including all running and pending items.

|| |
|--|--|
| usage | `client.getQueue()` |
| params | None |
| return | An object with two arrays: 'Running' and 'Pending' that list the currently running and queued items, respectively. |

### getHistory
Retrieves the prompt execution history up to a specified maximum number of items.

|| |
|--|--|
| usage | `client.getHistory(max_items)` |
| params | max_items: number (optional) - The maximum number of history items to retrieve. Default is 200. |
| return | An object containing an array 'History' where each entry includes a prompt array, an 'outputs' object, and a 'status' object. |

### getSystemStats
Fetches various system and device statistics, such as the Python version, operating system, and per-device information.

|| |
|--|--|
| usage | `client.getSystemStats()` |
| params | None |
| return | Object conforming to the 'ComfyUIClientResponseTypes.SystemStatsRoot' structure, containing detailed system stats. |

### getUserConfig
Obtains user configuration details, including data storage preferences.

|| |
|--|--|
| usage | `client.getUserConfig()` |
| params | None |
| return | A promise resolving to an object with 'storage' specifying "server" or "browser", and optional keys 'users' and 'migrated'. |

### createUser
Creates a new user with the provided username.

|| |
|--|--|
| usage | `client.createUser(username)` |
| params | username: string - The username for the new user. |
| return | A fetch Response object. |

### getSettings
Fetches all settings values associated with the current user.

|| |
|--|--|
| usage | `client.getSettings()` |
| params | None |
| return | A promise that resolves to a record (object) mapping setting IDs to their values. |

### getSetting
Retrieves a single setting value for a given setting ID for the current user.

|| |
|--|--|
| usage | `client.getSetting(id)` |
| params | id: string - The ID of the setting to fetch. |
| return | A promise that resolves to the value of the fetched setting. |

### storeSettings
Saves a dictionary of settings for the current user.

|| |
|--|--|
| usage | `client.storeSettings(settings)` |
| params | settings: Record<string, unknown> - A dictionary of setting IDs to values to be saved. |
| return | A fetch Response object. |

### storeSetting
Stores a single setting for the current user.

|| |
|--|--|
| usage | `client.storeSetting(id, value)` |
| params | id: string - The ID of the setting to update.<br/>value: unknown - The new value for the setting. |
| return | A fetch Response object. |

### getUserData
Retrieves a user data file for the current user.

|| |
|--|--|
| usage | `client.getUserData(file, options)` |
| params | file: string - The name of the userdata file to load.<br/>options: RequestInit (optional) - Additional fetch options. |
| return | A promise that resolves to a fetch Response object. |

### storeUserData
Saves a user data file for the current user.

|| |
|--|--|
| usage | `client.storeUserData(file, data, options)` |
| params | file: string - The name of the userdata file to save.<br/>data: any - The data to store in the file.<br/>options: RequestInit & { stringify?: boolean; throwOnError?: boolean; } (optional) - Additional options for the request. |
| return | A promise that resolves to void. A throw will occur if an error is encountered. |

### interrupt
Interrupts the execution of the running prompt

|| |
|--|--|
| usage | `client.interrupt()` |
| params | None |
| return | A promise that resolves to void. |

### free
Free up memory by unloading models and freeing memory

|| |
|--|--|
| usage | `client.free({ unload_models: true, free_memory: true })` |
| params | params.unload_models: boolean (optional) - unload models <br/>params.free_memory: boolean (optional)  - free memory |
| return | A promise that resolves to void. |

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

MIT
