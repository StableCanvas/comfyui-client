import { Client, Workflow } from "../src/main";

import { WebSocket } from "ws";

describe("Client", () => {
  const client_id = "test_client_id";

  let workflow: Workflow;
  let client: Client;

  beforeEach(async () => {
    workflow = new Workflow();
    /**
     * NOTE: 需要启动本地 ComfyUI 服务才可测试
     */
    client = new Client({
      clientId: client_id,
      WebSocket: WebSocket as any,
    });
    await client.connect();
  });

  afterEach(() => {
    jest.clearAllMocks();
    client.close();
  });

  it("should add test cases for Pipeline", () => {
    // TODO:
  });
});
