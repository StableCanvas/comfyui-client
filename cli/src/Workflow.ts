import { WorkflowNode, WorkflowNodeDefine } from "./types";

import * as ComfyUINodeTypes from "../data/comfyui.node.types.json";

export class CUIWorkflow {
  nodes = [] as WorkflowNode[];

  constructor(nodes: WorkflowNodeDefine[] = []) {
    for (const node of nodes) {
      this.appendNode(node);
    }
  }

  appendNode(node: WorkflowNodeDefine) {
    const ful_node = {
      index: Number(node.index),
      data: {
        class_type: node.class_type,
        inputs: node.inputs,
        outputs: this.findOutputs(node.class_type),
      },
    };
    this.nodes.push(ful_node);
  }

  findOutputs(class_type: string): string[] {
    const types = ComfyUINodeTypes.properties;

    const schema = types[class_type];
    if (schema?.properties?.outputs?.items) {
      return schema.properties.outputs.items.map((x) => x.type);
    }

    return [];
  }
}
