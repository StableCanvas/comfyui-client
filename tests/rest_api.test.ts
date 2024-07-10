import { ComfyUIApiClient } from "../src/ComfyUIApiClient";
import { ComfyUIWorkflow } from "../src/ComfyUIWorkflow";

import { WebSocket } from "ws";
import { create_s1_prompt } from "./test_utils";

describe("API", () => {
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
    // 因为这里是 rest api，所以不需要连接
    // client.connect();
  });

  afterEach(() => {
    jest.clearAllMocks();
    // 因为这里是 rest api，所以不需要关闭连接
    // client.close();
  });

  it("should create a image from rest api", async () => {
    const prompt = create_s1_prompt();
    const resp = await client.enqueue_polling(prompt);
    expect(resp.images.length).toBe(1);
    expect(resp.images[0].type).toBe("url");
    expect(resp.images[0].data).toMatch(/^http/);
  });

  it("should get history when create task done", async () => {
    const prompt = create_s1_prompt();
    const resp = await client.enqueue_polling(prompt);
    const history = await client.getHistory();
    const history_prompt = history.History.find(
      (x) => x.prompt[1] === resp.prompt_id
    );
    expect(history_prompt).toBeDefined();
  });

  it("should get models from rest api", async () => {
    const models = await client.getSDModels();
    expect(models.length).toBeGreaterThan(0);
  });

  it("should get samplers from rest api", async () => {
    const samplers = await client.getSamplers();
    expect(samplers.length).toBeGreaterThan(0);
  });

  it("should get schedulers from rest api", async () => {
    const schedulers = await client.getSchedulers();
    expect(schedulers.length).toBeGreaterThan(0);
  });

  it("should get cnet models from rest api", async () => {
    const cnetModels = await client.getCNetModels();
    expect(cnetModels.length).toBeGreaterThan(0);
  });

  it("should get upscale models from rest api", async () => {
    const upscaleModels = await client.getUpscaleModels();
    // ... 我本地没有这个，测不了
    // expect(upscaleModels.length).toBeGreaterThan(0);
  });

  it("should get hyper networks from rest api", async () => {
    const hyperNetworks = await client.getHyperNetworks();
    // ... 我本地没有这个，测不了
    // expect(hyperNetworks.length).toBeGreaterThan(0);
  });

  it("should get LoRAs from rest api", async () => {
    const loras = await client.getLoRAs();
    expect(loras.length).toBeGreaterThan(0);
  });

  it("should get VAEs from rest api", async () => {
    const vaes = await client.getVAEs();
    expect(vaes.length).toBeGreaterThan(0);
  });
});
