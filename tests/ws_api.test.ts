import { ComfyUIApiClient } from "../src/ComfyUIApiClient";
import { ComfyUIWorkflow } from "../src/ComfyUIWorkflow";
import { create_s1_prompt } from "./test_utils";

import { WebSocket } from "ws";

const collect_events = (client: ComfyUIApiClient, ignore = [] as string[]) => {
  const event_queue = [] as string[];
  client.on("message", (event) => {
    const { data } = event;
    if (typeof data !== "string") return;
    try {
      const { type } = JSON.parse(data);
      if (ignore.includes(type)) return;
      event_queue.push(type);
    } catch (error) {
      // pass
    }
  });
  return event_queue;
};

describe("WS", () => {
  const client_id = "test_client_id";

  let workflow: ComfyUIWorkflow;
  let client: ComfyUIApiClient;

  beforeEach(() => {
    workflow = new ComfyUIWorkflow();
    /**
     * 需要启动本地 ComfyUI 服务才可测试
     */
    client = new ComfyUIApiClient({
      clientId: client_id,
      WebSocket: WebSocket as any,
    });
    client.connect();
  });

  afterEach(() => {
    jest.clearAllMocks();
    client.close();
  });

  it("should create a image from ws api", async () => {
    const prompt = create_s1_prompt();
    const resp = await client.enqueue(prompt);
    expect(resp.images.length).toBe(1);
    expect(resp.images[0].type).toBe("url");
    expect(resp.images[0].data).toMatch(/^http/);
  });

  it("should get history when create task done", async () => {
    const prompt = create_s1_prompt();
    const resp = await client.enqueue(prompt);
    const history = await client.getHistory();
    const history_prompt = history.History.find(
      (x) => x.prompt[1] === resp.prompt_id
    );
    expect(history_prompt).toBeDefined();
  });

  it("should subscribe to the correct event stream", async () => {
    const events_arr = collect_events(client, [
      "status",
      "execution_cached",
      "executing",
    ]);
    const prompt = create_s1_prompt();
    const resp = await client.enqueue(prompt);

    expect(events_arr).toEqual([
      "execution_start",
      // Because only 1 step is executed, there is only one progress
      "progress",
      "executed",
    ]);
  });
});
