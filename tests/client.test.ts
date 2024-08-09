import { ComfyUIApiClient } from "../src/ComfyUIApiClient";
import { ComfyUIWorkflow } from "../src/ComfyUIWorkflow";

import { WebSocket } from "ws";
import { create_s1_prompt } from "./test_utils";

describe("Client", () => {
  const client_id = "test_client_id";

  let workflow: ComfyUIWorkflow;
  let client: ComfyUIApiClient;

  beforeEach(() => {
    workflow = new ComfyUIWorkflow();
    /**
     * NOTE: 需要启动本地 ComfyUI 服务才可测试
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

  it("should resolve outputs with resolver in REST", async () => {
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

  it("should resolve outputs with resolver in WS", async () => {
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

  it("should resolve outputs with typed(resolver) in REST", async () => {
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
});
