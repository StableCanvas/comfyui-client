const WebSocket = require("ws");
const fetch = require("node-fetch");
const {
  ComfyUIApiClient,
  ComfyUIWorkflow,
} = require("@stable-canvas/comfyui-client");

async function main(envs = {}) {
  const env = (k) => envs[k];

  const client = new ComfyUIApiClient({
    api_host: env("COMFYUI_CLIENT_API_HOST"),
    api_host: env("COMFYUI_CLIENT_API_BASE"),
    clientId: env("COMFYUI_CLIENT_CLIENT_ID"),
    WebSocket,
    fetch,
  });

  const createWorkflow = () => {
    const workflow = new ComfyUIWorkflow();
    const cls = workflow.classes;

    /** CODE INJECTION HERE */

    return workflow;
  };

  const workflow = createWorkflow();

  console.time("enqueue workflow");
  try {
    return await workflow.invoke(client);
  } catch (error) {
    throw error;
  } finally {
    console.timeEnd("enqueue workflow");
  }
}

main("process" in globalThis ? globalThis.process.env : globalThis)
  .then(() => {
    console.log("DONE");
  })
  .catch((err) => {
    console.error("ERR", err);
  });
