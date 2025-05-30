import {
  Client,
  Workflow,
} from "https://cdn.jsdelivr.net/npm/@stable-canvas/comfyui-client@latest/+esm";

const createWorkflow = () => {
  const workflow = new Workflow();
  const cls = workflow.classes;

  /** CODE INJECTION HERE */

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
