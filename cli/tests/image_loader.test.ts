import { ImageLoader } from "../src/ImageLoader";
import * as path from "path";

import * as ExportedWorkflow from "./test-inputs/workflow-min.png.export.json";
import * as WorkflowNodes from "./test-inputs/workflow-min.png.workflow.json";

describe("ImageLoader", () => {
  it("should load an image to workflow (from ComfyUI export)", async () => {
    const loader = new ImageLoader();
    const json = await loader.loadFromFile(
      path.join(__dirname, "../tests/test-inputs/workflow-min.png")
    );

    expect(json).toEqual(ExportedWorkflow);

    const workflow = await loader.imageWkToWorkflow(json);

    expect(workflow.nodes).toEqual(WorkflowNodes);
  });
});
