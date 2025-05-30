import { CWorkflow } from "./Workflow";
import { WorkflowNodeDefine } from "./types";

import * as ComfyUINodeWidgetsMap from "../data/comfyui.node.widgets.json";
import { ComfyUIExportImage } from "./Image.types";

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
export class JsonReader {
  constructor(
    readonly inputObject:
      | WorkflowJsonObject
      | WorkflowJsonPrompt
      | ComfyUIExportImage.Root,
  ) {}

  getWorkflow(): CWorkflow {
    const json_type = this.guessJsonType();
    if (json_type === "export_graph") {
      return this.fromExportGraph(this.inputObject as any);
    } else if (json_type === "api_json") {
      return this.fromApiJson(this.inputObject as any);
    }
    throw new Error(`Unknown json type, please check your json file`);
  }

  private guessJsonType() {
    const obj: any = this.inputObject;
    if (["nodes", "links"].every((x) => Array.isArray(obj?.[x]))) {
      return "export_graph";
    } else if (obj?.["prompt"] && typeof obj?.["prompt"] === "object") {
      return "api_json";
    } else if (
      // 也支持传入 workflow.prompt 作为参数
      obj &&
      typeof obj === "object" &&
      Object.keys(obj).every((x) => Number.isFinite(Number(x)))
    ) {
      return "api_json";
    }
    return "unknown";
  }

  private fromApiJson(json_object: WorkflowJsonObject): CWorkflow {
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

    return new CWorkflow(nodes);
  }

  private fromExportGraph(json_object: ComfyUIExportImage.Root): CWorkflow {
    const { nodes, links, version } = json_object;

    // TODO: convert version 1.0
    // 目前只在 0.4 版本的 json 上测试，还不太清楚 1.0 有没有问题
    // ref: https://docs.comfy.org/specs/workflow_json

    const nodes_define = nodes.map((node) => {
      const widgets_name: string[] =
        (ComfyUINodeWidgetsMap as any)[node.type] || [];
      return {
        index: node.id,
        class_type: node.type,
        inputs: {
          // find widget inputs
          ...Object.fromEntries(
            node.widgets_values?.map((value, index) => {
              const widget_name = widgets_name[index] || `unknown_${index}`;
              return [widget_name, value];
            }) || [],
          ),
          // find link inputs
          ...(node.inputs?.reduce(
            (acc, cur) => {
              const link = links.find((x) => x[0] === cur.link);
              if (!link) {
                // console.warn("No link found for input", cur);
                return acc;
              }
              // [input_node_id, input_slot_id]
              acc[cur.name] = [link[1], link[2]];
              return acc;
            },
            {} as Record<string, any>,
          ) || {}),
        },
      };
    });

    return new CWorkflow(nodes_define);
  }
}
