import { CUIWorkflow } from "./Workflow";
import { WorkflowNodeDefine } from "./types";

import * as fs from "fs";

interface WorkflowJsonObject {
  prompt: Record<
    number,
    {
      class_type: string;
      inputs: any;
    }
  >;
  workflow?: any;
}

// workflow json object loader
export class JsonLoader {
  constructor() {}

  loadFromFile(filepath: string) {
    const content = fs.readFileSync(filepath, { encoding: "utf-8" });
    const json_object = JSON.parse(content);
    return this.load(json_object);
  }

  load(json_object: WorkflowJsonObject) {
    if (!json_object.prompt) {
      throw new Error("Wrong workflow");
    }

    const nodes = [] as WorkflowNodeDefine[];

    for (const [index, node] of Object.entries(json_object.prompt)) {
      nodes.push({
        index: Number(index),
        class_type: node.class_type,
        inputs: node.inputs,
      });
    }

    return new CUIWorkflow(nodes);
  }
}
