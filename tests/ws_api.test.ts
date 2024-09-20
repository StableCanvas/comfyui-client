import { Client } from "../src/client/Client";
import { Workflow } from "../src/workflow/Workflow";
import { ComfyUiWsTypes } from "../src/client/ws.types";

import { create_s1_prompt } from "./test_utils";

import { WebSocket } from "ws";
import { useSimple1 } from "./workflows/useSimple1";

const collect_events = (client: Client, ignore = [] as string[]) => {
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

  let workflow: Workflow;
  let client: Client;

  beforeEach(() => {
    workflow = new Workflow();
    /**
     * 需要启动本地 ComfyUI 服务才可测试
     */
    client = new Client({
      clientId: client_id,
      WebSocket: WebSocket as any,
    });
    client.connect();
  });

  afterEach(() => {
    jest.clearAllMocks();
    client.close();
  });

  async function ping() {
    try {
      await client.getQueue();
    } catch (error) {
      // do nothing
    }
  }

  it("should create a image from ws api", async () => {
    await ping();

    const prompt = create_s1_prompt();
    const resp = await client.enqueue(prompt);
    expect(resp.images.length).toBe(1);
    expect(resp.images[0].type).toBe("url");
    expect(resp.images[0].data).toMatch(/^http/);
  });

  it("should get history when create task done", async () => {
    await ping();

    const prompt = create_s1_prompt();
    const resp = await client.enqueue(prompt);
    const history = await client.getHistory();
    const history_prompt = history.History.find(
      (x) => x.prompt[1] === resp.prompt_id,
    );
    expect(history_prompt).toBeDefined();
  });

  it("should subscribe to the correct event stream", async () => {
    await ping();

    const events_arr = collect_events(client, [
      "status",
      "execution_cached",
      "executing",
      "execution_start",
    ]);
    const prompt = create_s1_prompt();
    const resp = await client.enqueue(prompt);
    expect(events_arr).toEqual([
      // "execution_start",
      // Because only 1 step is executed, there is only one progress
      "progress",
      "executed",
      // "execution_success",
    ]);
  });

  it("should listen on progress event when enqueue()", async () => {
    await ping();

    const prompt1 = create_s1_prompt();
    const logs = [] as ComfyUiWsTypes.Messages.Progress[];
    await client.enqueue(prompt1, {
      progress(p) {
        logs.push(p);
      },
    });
    expect(logs).toHaveLength(1);
    const progress0 = logs[0];
    expect(progress0.max).toBe(1);
    expect(progress0.value).toBe(1);
    // START_NOTE id
    expect(progress0.node).toBe("3");
  });

  it("should be able to stop after calling workflow.interrupt()", async () => {
    await ping();

    useSimple1(workflow, {
      steps: 35,
    });

    const wk1 = workflow.instance(client);

    await wk1.enqueue();
    try {
      wk1.once("progress", () => {
        wk1.interrupt();
      });
      await wk1.wait();
      // NOTE: never will running here
      expect(true).toBe(false);
    } catch (_error) {
      let error: any = _error;
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Execution Interrupted");
    }
  });
});
