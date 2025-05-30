import { CUIWorkflow } from "./Workflow";
import { WorkflowNodeDefine } from "./types";

import * as fs from "fs";

// 从 comfyui 中导出的格式
interface WorkflowJsonPrompt {
  [index: number]: {
    class_type: string;
    inputs: any;
  };
}

// 从 comfyui-client 中导出的格式，带有 workflow 可以写入到生成文件中
interface WorkflowJsonObject {
  prompt: WorkflowJsonPrompt;
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
    let prompt = json_object as any as WorkflowJsonObject["prompt"];
    if (json_object.prompt) {
      prompt = json_object.prompt;
    }

    const nodes = [] as WorkflowNodeDefine[];

    for (const [index, node] of Object.entries(prompt)) {
      nodes.push({
        index: Number(index),
        class_type: node.class_type,
        inputs: node.inputs,
      });
    }

    return new CUIWorkflow(nodes);
  }
}
