import { Client } from "../src/client/Client";
import { Workflow } from "../src/workflow/Workflow";

import { WebSocket } from "ws";
import { create_s1_prompt } from "./test_utils";
import { useSimple1 } from "./workflows/useSimple1";

describe("Client", () => {
  const client_id = "test_client_id";

  let workflow: Workflow;
  let client: Client;

  beforeEach(() => {
    workflow = new Workflow();
    /**
     * NOTE: 需要启动本地 ComfyUI 服务才可测试
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

  it("should accumulate images into data array with correct node in enqueue_polling", async () => {
    const prompt = create_s1_prompt();

    const calling_stack: any[] = [];
    const resolver: any = (acc: any, output: any, ctx: any) => {
      calling_stack.push({
        output,
        ...ctx,
        client: undefined,
      });
      acc.__called__ = true;
      return acc;
    };
    const resp = await client.enqueue_polling(prompt, {
      resolver,
    });

    expect(resp.images).toStrictEqual([]);
    // only 1 output node
    expect(calling_stack.length).toBe(1);
    const { node_id, output } = calling_stack[0];
    expect(node_id).toBe("9");
    expect(Array.isArray(output.images)).toBe(true);
  });

  it("should accumulate images into data array with correct node in enqueue", async () => {
    const prompt = create_s1_prompt();

    const calling_stack: any[] = [];
    const resolver: any = (acc: any, output: any, ctx: any) => {
      calling_stack.push({
        output,
        ...ctx,
        client: undefined,
      });
      acc.__called__ = true;
      return acc;
    };
    const resp = await client.enqueue(prompt, {
      resolver,
    });

    expect(resp.images).toStrictEqual([]);
    // only 1 output node
    expect(calling_stack.length).toBe(1);
    const { node_id, output } = calling_stack[0];
    expect(node_id).toBe("9");
    expect(Array.isArray(output.images)).toBe(true);
  });

  it("should process polling with custom resolver and accumulate image data", async () => {
    const prompt = create_s1_prompt();

    const resp = await client.enqueue_polling<
      {
        filename: string;
        subfolder: string;
        type: string;
      }[]
    >(prompt, {
      resolver(acc, output, ctx) {
        return {
          ...acc,
          data: [
            ...((acc.data as any) ?? []),
            ...((output.images as any) ?? []),
          ],
        };
      },
    });

    expect(resp.images).toStrictEqual([]);
    expect(Array.isArray(resp.data)).toBe(true);
    expect(resp.data?.[0].type).toBe("output");
  });

  it("should invoke workflow and accumulate image data correctly", async () => {
    useSimple1(workflow);

    const result = await workflow.invoke<any[]>(client, {
      resolver: (acc, output, ctx) => {
        return {
          ...acc,
          data: [
            ...((acc.data as any) ?? []),
            ...((output.images as any) ?? []),
          ],
        };
      },
    });

    expect(result.images).toStrictEqual([]);
    expect(Array.isArray(result.data)).toBe(true);
    expect(result.data?.[0].type).toBe("output");
  });

  it("should invoke polling workflow and accumulate image data correctly", async () => {
    useSimple1(workflow);

    const result = await workflow.invoke_polling<any[]>(client, {
      resolver: (acc, output, ctx) => {
        return {
          ...acc,
          data: [
            ...((acc.data as any) ?? []),
            ...((output.images as any) ?? []),
          ],
        };
      },
    });

    expect(result.images).toStrictEqual([]);
    expect(Array.isArray(result.data)).toBe(true);
    expect(result.data?.[0].type).toBe("output");
  });

  it("should be able to stop after calling client.interrupt()", async () => {
    useSimple1(workflow, {
      steps: 100,
    });

    try {
      client.once("progress", () => {
        client.interrupt();
      });
      await workflow.invoke<any[]>(client);
      // NOTE: never will running here
      expect(true).toBe(false);
    } catch (_error) {
      let error: any = _error;
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Execution Interrupted");
    }
  });
});
