import { CWorkflow } from "./Workflow";
import { WorkflowNodeDefine } from "./types";

import * as ComfyUINodeWidgetsMap from "../data/comfyui.node.widgets.json";
import * as ComfyUINodeTypesMap from "../data/comfyui.node.types.json";
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

type ExportNode = ComfyUIExportImage.Node;
type ExportLink = ComfyUIExportImage.Link | Array<number | string>;

type ResolvedOrigin =
  | { kind: "reference"; originId: string; originSlot: number }
  | { kind: "value"; value: unknown }
  | { kind: "unavailable"; message: string };

const UI_ONLY_NODE_TYPES = new Set([
  "Note",
  "MarkdownNote",
  "Reroute",
  "Bookmark (rgthree)",
  "Fast Bypasser (rgthree)",
  "Fast Groups Bypasser (rgthree)",
  "Fast Groups Muter (rgthree)",
  "Mute / Bypass Repeater (rgthree)",
  "Mute / Bypass Relay (rgthree)",
  "Node Collector (rgthree)",
  "LC Bypasser",
  "LC Bypasser Panel",
  "LCImageLabel",
  "LCLabel",
  "LCNote",
]);
const PRIMITIVE_NODE_TYPE = "PrimitiveNode";
const PRIMITIVE_SCHEMA_TYPES = new Set([
  "string",
  "number",
  "boolean",
  "STRING",
  "INT",
  "FLOAT",
  "BOOLEAN",
  "COMBO",
]);
const WIDGET_INPUT_TYPES = new Set([
  "STRING",
  "INT",
  "FLOAT",
  "BOOLEAN",
  "COMBO",
]);

// Group links use [origin, originSlot, target, targetSlot, linkId, type].
interface GroupNodeDefinition {
  nodes: Array<
    Omit<ExportNode, "id"> & { id?: string | number; index: number | string }
  >;
  links: Array<
    [
      originIndex: number | string | null,
      originSlot: number,
      targetIndex: number | string,
      targetSlot: number,
      linkId: number | string,
      type: string,
    ]
  >;
  external: Array<
    [node: { index: number | string }, outputSlot: number, type: string]
  >;
  config?: Record<string, unknown>;
}

// Schema data can lag ComfyUI releases; keep current core-node corrections here.
const WIDGET_NAME_OVERRIDES: Record<string, Array<string | null>> = {
  CLIPLoader: ["clip_name", "type", "device"],
  UNETLoader: ["unet_name", "weight_dtype"],
  ComfyMathExpression: ["expression"],
  DualCLIPLoader: ["clip_name1", "clip_name2", "type", "device"],
  EmptySD3LatentImage: ["width", "height", "batch_size"],
  EmptyHunyuanImageLatent: ["width", "height", "batch_size"],
  EmptyFlux2LatentImage: ["width", "height", "batch_size"],
  Flux2Scheduler: ["steps", "width", "height"],
  ImageFromBatch: ["batch_index", "length"],
  MiniMaxH3ImageToVideo: ["prompt", "width", "height", "length"],
  MiniMaxH3SigmaShift: ["shift_video", "shift_audio"],
  PathchSageAttentionKJ: ["sage_attention", "allow_compile"],
  RandomNoise: ["noise_seed", "control_after_generate"],
  ReservedVRAMSetter: [
    "reserved",
    "mode",
    "seed",
    null,
    "auto_max_reserved",
    "clean_gpu_before",
  ],
  ResolutionSelector: ["aspect_ratio", "megapixels", "multiple"],
  SaveImage: ["filename_prefix"],
  SaveAnimatedWEBP: ["filename_prefix", "fps", "lossless", "quality", "method"],
  TextEncodeQwenImageEditPlus: ["prompt"],
  WanCameraEmbedding: [
    "camera_pose",
    "width",
    "height",
    "length",
    "speed",
    "fx",
    "fy",
    "cx",
    "cy",
  ],
};

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
      Object.keys(obj).every((x) =>
        // 子图
        x.includes(":")
          ? x.split(":").every((y) => Number.isFinite(Number(y)))
          : // 无子图
            Number.isFinite(Number(x)),
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

  private getWidgetNames(node: ExportNode): Array<string | null> {
    const override = WIDGET_NAME_OVERRIDES[node.type];
    if (override) return override;

    const widgetNames: Array<string | null> = [
      ...(((ComfyUINodeWidgetsMap as any)[node.type] as string[] | undefined) ??
        []),
    ];
    const schemaProperties = (ComfyUINodeTypesMap as any).properties?.[
      node.type
    ]?.properties?.inputs?.properties as
      | Record<string, { type?: string }>
      | undefined;

    const inputTypes = new Map(
      (node.inputs ?? []).map((input) => [input.name, input.type]),
    );
    for (const [name, schema] of Object.entries(schemaProperties ?? {})) {
      const inputType = inputTypes.get(name);
      const isComplexInput =
        inputType !== undefined &&
        inputType !== "*" &&
        !WIDGET_INPUT_TYPES.has(inputType);
      if (
        schema.type &&
        PRIMITIVE_SCHEMA_TYPES.has(schema.type) &&
        !isComplexInput &&
        !widgetNames.includes(name)
      ) {
        widgetNames.push(name);
      }
    }

    return widgetNames;
  }

  private getWidgetInputs(node: ExportNode): Record<string, unknown> {
    const namedWidgets = node.widgets_values_named;
    if (
      namedWidgets &&
      typeof namedWidgets === "object" &&
      !Array.isArray(namedWidgets) &&
      Object.keys(namedWidgets).length > 0
    ) {
      return this.normalizeWidgetInputs(node, namedWidgets);
    }

    const widgets = node.widgets_values;
    if (!widgets) return {};
    if (!Array.isArray(widgets)) {
      return this.normalizeWidgetInputs(node, widgets);
    }

    if (node.type === "Power Lora Loader (rgthree)") {
      return this.getPowerLoraInputs(widgets);
    }

    const widgetNames = this.getWidgetNames(node);
    const inputs: Record<string, unknown> = {};

    widgets.forEach((value, index) => {
      const widgetName = widgetNames[index];
      if (widgetName) {
        inputs[widgetName] = value;
      } else if (widgetName !== null && value !== "" && value !== null) {
        throw new Error(
          `Missing widget mapping for ${node.type}#${node.id} at index ${index}; export the workflow in API format instead`,
        );
      }
    });

    return inputs;
  }

  private normalizeWidgetInputs(
    node: ExportNode,
    widgets: Record<string, unknown>,
  ): Record<string, unknown> {
    if (node.type !== "Power Lora Loader (rgthree)") return widgets;

    return Object.fromEntries(
      Object.entries(widgets).filter(
        ([name, value]) =>
          name.startsWith("lora_") &&
          value !== null &&
          typeof value === "object" &&
          !Array.isArray(value) &&
          typeof (value as Record<string, unknown>).lora === "string",
      ),
    );
  }

  private getPowerLoraInputs(
    widgets: unknown[],
  ): Record<string, Record<string, unknown>> {
    const loras = widgets.filter(
      (value): value is Record<string, unknown> =>
        value !== null &&
        typeof value === "object" &&
        !Array.isArray(value) &&
        typeof (value as Record<string, unknown>).lora === "string",
    );

    return Object.fromEntries(
      loras.map((value, index) => [`lora_${index + 1}`, value]),
    );
  }

  private getLinkParts(link: ExportLink) {
    if (Array.isArray(link)) {
      return {
        id: String(link[0]),
        originId: String(link[1]),
        originSlot: Number(link[2]),
      };
    }
    return {
      id: String(link.id),
      originId: String(link.origin_id),
      originSlot: Number(link.origin_slot),
    };
  }

  private getGroupDefinition(
    node: ExportNode,
    definitions: Record<string, GroupNodeDefinition>,
  ): GroupNodeDefinition | undefined {
    return (
      definitions[node.type] ??
      definitions[node.type.replace(/^workflow[\/>]/, "")]
    );
  }

  private expandGroupNode(
    node: ExportNode,
    definitions: Record<string, GroupNodeDefinition>,
  ): {
    nodes: ExportNode[];
    links: Array<{
      id: string;
      originId: string;
      originSlot: number;
    }>;
    outputs: Array<{ originId: string; originSlot: number }>;
  } | null {
    const definition = this.getGroupDefinition(node, definitions);
    if (!definition) return null;

    const localIds = new Map<string, string>();
    for (const localNode of definition.nodes) {
      localIds.set(
        String(localNode.index),
        `${node.id}__group_${String(localNode.index)}`,
      );
    }

    const widgetValues = Array.isArray(node.widgets_values)
      ? [...node.widgets_values]
      : [];
    let widgetOffset = 0;
    const expandedNodes: ExportNode[] = definition.nodes.map((localNode) => {
      const widgetCount = Array.isArray(localNode.widgets_values)
        ? localNode.widgets_values.length
        : 0;
      const widgets_values = Array.isArray(localNode.widgets_values)
        ? widgetValues.slice(widgetOffset, widgetOffset + widgetCount)
        : localNode.widgets_values;
      widgetOffset += widgetCount;

      return {
        ...localNode,
        id: localIds.get(String(localNode.index))!,
        inputs: (localNode.inputs ?? []).map((input) => ({
          ...input,
          link: null,
        })),
        outputs: (localNode.outputs ?? []).map((output) => ({
          ...output,
          links: null,
        })),
        widgets_values,
      } as ExportNode;
    });

    if (widgetOffset !== widgetValues.length) {
      throw new Error(
        `Group node ${node.type}#${node.id} has ${widgetValues.length - widgetOffset} unmapped widget values`,
      );
    }

    const nodeByIndex = new Map(
      expandedNodes.map((expandedNode, index) => [
        String(definition.nodes[index].index),
        expandedNode,
      ]),
    );
    const generatedLinks: Array<{
      id: string;
      originId: string;
      originSlot: number;
    }> = [];

    for (const groupLink of definition.links) {
      const [originIndex, originSlot, targetIndex, targetSlot, linkId] =
        groupLink;
      const targetNode = nodeByIndex.get(String(targetIndex));
      const targetInput = targetNode?.inputs?.[Number(targetSlot)];
      if (!targetInput) {
        throw new Error(
          `Group node ${node.type}#${node.id} links to missing local input ${targetIndex}:${targetSlot}`,
        );
      }

      if (originIndex === null || originIndex === undefined) {
        targetInput.link = node.inputs?.[Number(originSlot)]?.link ?? null;
        continue;
      }

      const originId = localIds.get(String(originIndex));
      if (!originId) {
        throw new Error(
          `Group node ${node.type}#${node.id} links from missing local node ${originIndex}`,
        );
      }

      const expandedLinkId = `${node.id}__group_link_${String(linkId)}`;
      targetInput.link = expandedLinkId;
      generatedLinks.push({
        id: expandedLinkId,
        originId,
        originSlot: Number(originSlot),
      });
    }

    const outputs = definition.external.map(([externalNode, outputSlot]) => {
      const originId = localIds.get(String(externalNode.index));
      if (!originId) {
        throw new Error(
          `Group node ${node.type}#${node.id} references missing external node ${externalNode.index}`,
        );
      }
      return { originId, originSlot: Number(outputSlot) };
    });

    return { nodes: expandedNodes, links: generatedLinks, outputs };
  }

  private findBypassInput(
    node: ExportNode,
    outputSlot: number,
  ): ComfyUIExportImage.Input | undefined {
    const output = node.outputs?.[outputSlot];
    const linkedInputs = (node.inputs ?? []).filter(
      (input) => input.link !== null && input.link !== undefined,
    );
    const compatibleInputs = linkedInputs.filter(
      (input) =>
        input.type === "*" ||
        output?.type === "*" ||
        input.type === output?.type,
    );

    return (
      compatibleInputs.find((input) => input.name === output?.name) ??
      compatibleInputs.find((_input, index) => index === outputSlot) ??
      compatibleInputs[0]
    );
  }

  private fromExportGraph(json_object: ComfyUIExportImage.Root): CWorkflow {
    const { nodes, links, version } = json_object;

    if (version !== 0.4 && version !== 1) {
      throw new Error(
        `Unsupported workflow JSON version: ${version}; supported versions are 0.4 and 1`,
      );
    }

    const groupDefinitions = ((json_object.extra as any)?.groupNodes ??
      {}) as Record<string, GroupNodeDefinition>;
    const linksById = new Map(
      links.map((link) => {
        const parts = this.getLinkParts(link);
        return [parts.id, parts] as const;
      }),
    );
    const expandedNodes: ExportNode[] = [];
    const groupOutputOrigins = new Map<
      string,
      { originId: string; originSlot: number }
    >();

    for (const node of nodes) {
      if ((node.mode ?? 0) !== 0) {
        expandedNodes.push(node);
        continue;
      }

      const expanded = this.expandGroupNode(node, groupDefinitions);
      if (!expanded) {
        expandedNodes.push(node);
        continue;
      }

      expandedNodes.push(...expanded.nodes);
      for (const link of expanded.links) {
        linksById.set(link.id, link);
      }
      expanded.outputs.forEach((output, outputSlot) => {
        groupOutputOrigins.set(`${node.id}:${outputSlot}`, output);
      });
    }

    const nodeById = new Map(
      expandedNodes.map((node) => [String(node.id), node]),
    );

    const resolveLink = (
      linkId: string | number,
      resolving = new Set<string>(),
    ): ResolvedOrigin => {
      const link = linksById.get(String(linkId));
      if (!link) throw new Error(`Missing link ${linkId}`);

      let originId = link.originId;
      let originSlot = link.originSlot;
      const visitedGroups = new Set<string>();
      while (true) {
        const groupKey = `${originId}:${originSlot}`;
        const groupOutput = groupOutputOrigins.get(groupKey);
        if (!groupOutput) break;
        if (visitedGroups.has(groupKey)) {
          throw new Error(`Cyclic group-node link at ${groupKey}`);
        }
        visitedGroups.add(groupKey);
        originId = groupOutput.originId;
        originSlot = groupOutput.originSlot;
      }

      const key = `${originId}:${originSlot}`;
      if (resolving.has(key)) {
        throw new Error(`Cyclic virtual-node link at ${key}`);
      }
      const nextResolving = new Set(resolving).add(key);
      const originNode = nodeById.get(originId);
      if (!originNode) {
        throw new Error(`Link ${linkId} references missing node ${originId}`);
      }

      if (originNode.type === PRIMITIVE_NODE_TYPE) {
        const values = originNode.widgets_values;
        if (!Array.isArray(values) || values.length === 0) {
          throw new Error(`PrimitiveNode#${originNode.id} has no value`);
        }
        return { kind: "value", value: values[0] };
      }

      if (originNode.type === "Reroute") {
        const upstream = (originNode.inputs ?? []).find(
          (input) => input.link !== null && input.link !== undefined,
        );
        if (!upstream) {
          throw new Error(`Reroute#${originNode.id} has no input link`);
        }
        return resolveLink(upstream.link!, nextResolving);
      }

      const mode = originNode.mode ?? 0;
      if (mode === 2) {
        throw new Error(
          `Active node depends on muted node ${originNode.type}#${originNode.id}`,
        );
      }
      if (mode === 4) {
        const bypassInput = this.findBypassInput(originNode, originSlot);
        if (
          !bypassInput ||
          bypassInput.link === null ||
          bypassInput.link === undefined
        ) {
          return {
            kind: "unavailable",
            message: `Cannot bypass ${originNode.type}#${originNode.id} output ${originSlot}`,
          };
        }
        return resolveLink(bypassInput.link, nextResolving);
      }
      if (mode !== 0) {
        throw new Error(
          `Unsupported node mode ${mode} for ${originNode.type}#${originNode.id}`,
        );
      }

      return {
        kind: "reference",
        originId,
        originSlot,
      };
    };

    const nodesDefine: WorkflowNodeDefine[] = [];
    for (const node of expandedNodes) {
      const mode = node.mode ?? 0;
      if (
        mode === 2 ||
        mode === 4 ||
        UI_ONLY_NODE_TYPES.has(node.type) ||
        node.type === PRIMITIVE_NODE_TYPE
      ) {
        continue;
      }
      if (mode !== 0) {
        throw new Error(
          `Unsupported node mode ${mode} for ${node.type}#${node.id}`,
        );
      }

      const inputs: Record<string, any> = {
        ...this.getWidgetInputs(node),
      };

      for (const input of node.inputs || []) {
        if (input.link === null || input.link === undefined) continue;

        const origin = resolveLink(input.link);
        if (origin.kind === "unavailable") {
          if (input.shape === 7) continue;
          throw new Error(origin.message);
        }
        inputs[input.name] =
          origin.kind === "value"
            ? origin.value
            : [origin.originId, origin.originSlot];
      }

      nodesDefine.push({
        index: node.id,
        class_type: node.type,
        inputs,
      });
    }

    return new CWorkflow(nodesDefine);
  }
}
