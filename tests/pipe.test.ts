import { Client } from "../src/client/Client";
import { Workflow } from "../src/workflow/Workflow";

import { WebSocket } from "ws";

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

  it("should add test cases for Pipeline", () => {
    // TODO:
  });
});
