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
      | ComfyUIExportImage.Root
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
      Object.keys(obj).every((x) =>
        // 子图
        x.includes(":")
          ? x.split(":").every((y) => Number.isFinite(Number(y)))
          : // 无子图
            Number.isFinite(Number(x))
      )
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
        index: index,
        class_type: node.class_type,
        inputs: node.inputs,
        _meta: node._meta ?? {},
      });
    }

    return new CWorkflow(nodes);
  }

  private getWidgetInputs(
    node: ComfyUIExportImage.Node
  ): Record<string, unknown> {
    const widgets = node.widgets_values;
    if (!widgets) return {};
    if (!Array.isArray(widgets)) return widgets;

    const widgetNames: string[] =
      (ComfyUINodeWidgetsMap as any)[node.type] || [];

    return Object.fromEntries(
      widgets.map((value, index) => {
        const widgetName = widgetNames[index];
        if (!widgetName) {
          throw new Error(
            `Missing widget mapping for ${node.type}#${node.id} at index ${index}; export the workflow in API format instead`
          );
        }
        return [widgetName, value];
      })
    );
  }

  private fromExportGraph(json_object: ComfyUIExportImage.Root): CWorkflow {
    const { nodes, links, version } = json_object;

    if (version !== 0.4 && version !== 1) {
      throw new Error(
        `Unsupported workflow JSON version: ${version}; supported versions are 0.4 and 1`
      );
    }

    const linksById = new Map<
      string,
      { originId: string; originSlot: number }
    >();

    for (const link of links) {
      if (Array.isArray(link)) {
        linksById.set(String(link[0]), {
          originId: String(link[1]),
          originSlot: Number(link[2]),
        });
      } else {
        linksById.set(String(link.id), {
          originId: String(link.origin_id),
          originSlot: Number(link.origin_slot),
        });
      }
    }

    const nodes_define = nodes.map((node) => {
      if ((node.mode ?? 0) !== 0) {
        throw new Error(
          `Node mode ${node.mode} is not supported for ${node.type}#${node.id}; export the workflow in API format instead`
        );
      }

      const inputs: Record<string, any> = {
        ...this.getWidgetInputs(node),
      };

      for (const input of node.inputs || []) {
        if (input.link === null || input.link === undefined) continue;

        const link = linksById.get(String(input.link));
        if (!link) {
          throw new Error(
            `Missing link ${input.link} for ${node.type}#${node.id}.${input.name}`
          );
        }

        inputs[input.name] = [link.originId, link.originSlot];
      }

      return {
        index: node.id,
        class_type: node.type,
        inputs,
      };
    });

    return new CWorkflow(nodes_define);
  }
}
