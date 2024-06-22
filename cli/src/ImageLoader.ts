import * as path from "path";
import * as fs from "fs";
import exifr from "exifr";
import { ComfyUIExportImage } from "./Image.types";
import { CUIWorkflow } from "./Workflow";

import * as ComfyUINodeWidgetsMap from "../data/comfyui.node.widgets.json";

export class ImageLoader {
  constructor() {}

  async loadFromFile(filepath: string) {
    const parsed = await exifr.parse(filepath);
    // console.log(parsed);
    const { workflow } = parsed;
    if (!workflow || typeof workflow !== "string") {
      throw new Error("No workflow found in image");
    }
    const json = JSON.parse(workflow);
    if (!json) {
      throw new Error("No workflow found in image");
    }

    return json as ComfyUIExportImage.Root;
  }

  async imageWkToWorkflow(root: ComfyUIExportImage.Root) {
    const nodes_define = root.nodes.map((node) => {
      const widgets_name: string[] =
        (ComfyUINodeWidgetsMap as any)[node.type] || [];
      return {
        index: node.id,
        class_type: node.type,
        inputs: {
          ...Object.fromEntries(
            node.widgets_values?.map((value, index) => {
              const widget_name = widgets_name[index] || `unknown_${index}`;
              return [widget_name, value];
            }) || []
          ),
          ...(node.inputs?.reduce(
            (acc, cur) => {
              const link = root.links.find((x) => x[0] === cur.link);
              if (!link) {
                console.warn("No link found for input", cur);
                return acc;
              }
              // [input_node_id, input_slot_id]
              acc[cur.name] = [link[1], link[2]];
              return acc;
            },
            {} as Record<string, any>
          ) || {}),
        },
      };
    });

    return new CUIWorkflow(nodes_define);
  }
}

if (require.main === module) {
  (async () => {
    const loader = new ImageLoader();
    const json = await loader.loadFromFile(
      path.join(__dirname, "../tests/test-inputs/workflow-min.png")
    );
    fs.writeFileSync(
      path.join(__dirname, "../tests/test-inputs/workflow-min.png.export.json"),
      JSON.stringify(json, null, 2)
    );
    const workflow = await loader.imageWkToWorkflow(json);
    console.log(workflow.nodes);
    fs.writeFileSync(
      path.join(
        __dirname,
        "../tests/test-inputs/workflow-min.png.workflow.json"
      ),
      JSON.stringify(workflow.nodes, null, 2)
    );
  })();
}
