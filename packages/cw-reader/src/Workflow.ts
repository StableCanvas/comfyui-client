import { WorkflowNode, WorkflowNodeDefine } from "./types";

import * as ComfyUINodeTypes from "../data/comfyui.node.types.json";

export class CWorkflow {
  nodes = [] as WorkflowNode[];

  constructor(nodes: WorkflowNodeDefine[] = []) {
    for (const node of nodes) {
      this.append(node);
    }
  }

  private append(node: WorkflowNodeDefine) {
    const ful_node: WorkflowNode = {
      index: Number(node.index),
      data: {
        class_type: node.class_type,
        inputs: node.inputs,
        outputs: this.prepareOutputs(node.class_type),
        _meta: node._meta,
      },
    };
    this.nodes.push(ful_node);
  }

  /**
   * 此函数使用预先导出的 json 文件，对 node 进行 outputs 类型标注
   *
   * 此操作造成的影响：
   * 1. 如果没有标注信息，那么在 transpiler 中将会以 OUT_1 OUT_2 的形式标注输出参数
   * 2. 如果有类型信息，那么 transpiler 会以 类型信息标注输出参数，比如 IMAGE_1 SEGS_1 类似
   *
   * *均为弱类型，仅仅用于辅助编码，并不会对输出代码产生影响
   */
  private prepareOutputs(class_type: string): string[] {
    const types = ComfyUINodeTypes.properties as any;

    const schema = types[class_type];
    if (
      schema?.properties?.outputs?.items &&
      Array.isArray(schema.properties.outputs.items)
    ) {
      return schema.properties.outputs.items.map((x: any) => x.type);
    }

    return [];
  }
}
