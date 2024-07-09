import { ComfyUIWorkflow } from "../src/ComfyUIWorkflow";
import { ComfyUIApiClient } from "../src/ComfyUIApiClient";

jest.mock("../src/ComfyUIApiClient");

describe("ComfyUIWorkflow", () => {
  let workflow: ComfyUIWorkflow;
  let client: ComfyUIApiClient;

  beforeEach(() => {
    workflow = new ComfyUIWorkflow();
    client = new ComfyUIApiClient({});
  });

  afterEach(() => {
    jest.clearAllMocks();
    client.disconnect();
  });

  it("should create a workflow with nodes", () => {
    // 假设我们有一个名为'TestNode'的节点类
    const [[nodeId]] = workflow.classes.TestNode({ testInput: "testValue" });

    // 检查节点是否被正确添加到工作流中
    const currentWorkflow = workflow.workflow();
    expect(currentWorkflow.prompt[nodeId]).toEqual({
      class_type: "TestNode",
      inputs: { testInput: "testValue" },
    });
  });

  it("should reset the workflow", () => {
    const [[nodeId]] = workflow.classes.TestNode({ testInput: "testValue" });

    workflow.reset();
    const currentWorkflow = workflow.workflow();
    expect(currentWorkflow.prompt).toEqual({});
  });

  it("should return the current workflow", () => {
    const [[nodeId]] = workflow.classes.TestNode({ testInput: "testValue" });

    const currentWorkflow = workflow.workflow();
    expect(currentWorkflow.prompt).toEqual({
      [nodeId]: {
        class_type: "TestNode",
        inputs: { testInput: "testValue" },
      },
    });
  });

  it("should can add nodes in a loop", () => {
    const node_ids = Array.from({ length: 10 }, (_, i) => {
      const [[nodeId]] = workflow.classes.TestNode({ testInput: i });
      return nodeId;
    });
    const currentWorkflow = workflow.workflow();

    expect(Object.keys(currentWorkflow.prompt)).toHaveLength(10);

    node_ids.forEach((node_id, i) => {
      expect(currentWorkflow.prompt[node_id]).toEqual({
        class_type: "TestNode",
        inputs: { testInput: i },
      });
    });
  });

  it("should can add nodes with dependencies", () => {
    const { TestNode } = workflow.classes;

    const [node1_out1, node1_out2] = TestNode({ testInput: "testValue" });
    const [node2_out1, node2_out2] = TestNode({
      testInput: "testValue",
      dependency: node1_out1,
    });

    const currentWorkflow = workflow.workflow();

    expect(Object.keys(currentWorkflow.prompt)).toHaveLength(2);

    const node1_id = node1_out1[0];
    const node2_id = node2_out1[0];
    expect(currentWorkflow.prompt).toEqual({
      [node1_id]: {
        class_type: "TestNode",
        inputs: { testInput: "testValue" },
      },
      [node2_id]: {
        class_type: "TestNode",
        inputs: { testInput: "testValue", dependency: node1_out1 },
      },
    });
  });

  // TODO: mock fully ComfyUIApiClient
  //   it("should invoke the workflow", async () => {
  //     // 假设我们有一个名为'TestNode'的节点类
  //     workflow.classes.TestNode({ testInput: "testValue" });

  //     // 模拟ComfyUIApiClient的行为
  //     (client.getPromptStatus as jest.Mock).mockResolvedValueOnce({
  //       pending: true,
  //     });
  //     (client.getPromptStatus as jest.Mock).mockResolvedValueOnce({
  //       running: true,
  //     });
  //     (client.getPromptStatus as jest.Mock).mockResolvedValueOnce({ done: true });
  //     (client._enqueue_prompt as jest.Mock).mockResolvedValueOnce(
  //       Promise.resolve({ prompt_id: "testPromptId", images: [] })
  //     );

  //     // 调用invoke方法
  //     const result = await workflow.invoke(client);

  //     // 检查client的_enqueue_prompt方法是否被调用
  //     expect(client._enqueue_prompt).toHaveBeenCalled();

  //     // 检查结果是否符合预期
  //     expect(result).toEqual({
  //       images: [],
  //       prompt_id: "",
  //     });
  //   });
});
