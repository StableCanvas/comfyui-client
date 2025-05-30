import { ImageLoader } from "../src/ImageLoader";
import * as path from "path";
import * as fs from "fs";

import * as ExportedWorkflow from "./test-inputs/workflow-min.png.export.json";
import * as WorkflowNodes from "./test-inputs/workflow-min.png.workflow.json";

describe("ImageLoader", () => {
  it("should load an image to workflow (from ComfyUI export)", async () => {
    const loader = new ImageLoader();
    const json = await loader.loadFromFile(
      path.join(__dirname, "../tests/test-inputs/workflow-min.png"),
    );

    expect(json).toEqual(ExportedWorkflow);

    const workflow = await loader.imageWkToWorkflow(json);

    expect(workflow.nodes).toEqual(WorkflowNodes);
  });

  it("should load an efficient demo HiResfix_workflow", async () => {
    const loader = new ImageLoader();
    const json = await loader.loadFromFile(
      path.join(__dirname, "../tests/test-inputs/HiResfix_workflow.png"),
    );

    const exported = JSON.parse(
      fs
        .readFileSync(
          path.join(
            __dirname,
            "../tests/test-inputs/HiResfix_workflow.png.export.json",
          ),
        )
        .toString("utf-8"),
    );

    expect(json).toEqual(exported);

    const workflow = await loader.imageWkToWorkflow(json);

    const workflow_nodes_path = path.join(
      __dirname,
      "../tests/test-inputs/HiResfix_workflow.png.workflow.json",
    );
    const expected_workflow_nodes = JSON.parse(
      fs.readFileSync(workflow_nodes_path).toString("utf-8"),
    );

    expect(workflow.nodes).toEqual(expected_workflow_nodes.nodes);
  });
});
