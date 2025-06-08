import * as types from "@babel/types";
import { generate } from "@babel/generator";

import {
  type WorkflowNode,
  type WorkflowNodeInputRef,
  type CWorkflow,
} from "@stable-canvas/cw-reader";

interface WkNodeGraphNode {
  node: WorkflowNode;
  children: WkNodeGraphNode[];
}

const INVALID_VARIABLE_NAME = /^a-zA-Z|[\|\. \-*/+~]/;
const IS_INVALID_VAR = (name: string) => INVALID_VARIABLE_NAME.test(name);
const VAR = (name: string) => (IS_INVALID_VAR(name) ? `["${name}"]` : name);

const toAst = (value: any): types.Expression => {
  if (value === null) {
    return types.nullLiteral();
  }
  switch (typeof value) {
    case "string":
      return types.stringLiteral(value);
    case "number":
      return types.numericLiteral(value);
    case "boolean":
      return types.booleanLiteral(value);
    case "object":
      if (value === null) {
        return types.nullLiteral();
      }
      if (Array.isArray(value)) {
        return types.arrayExpression(value.map(toAst));
      }
      const properties = Object.entries(value).map(([key, val]) =>
        types.objectProperty(types.stringLiteral(key), toAst(val)),
      );
      return types.objectExpression(properties);
    default:
      throw new Error(`Unsupported nested value type: ${typeof value}`);
  }
};

export class Transpiler {
  constructor(readonly workflow: CWorkflow) {}

  private collectionDependencies() {
    const { workflow: wk } = this;
    const all_refs = wk.nodes.map((x) =>
      Object.values(x.data.inputs).filter((x) => Array.isArray(x)),
    ) as WorkflowNodeInputRef[][];

    // node_index -> [output_index]
    return all_refs.reduce(
      (acc, x) => {
        x.forEach(([key, output_index]) => {
          acc[key] ||= [];
          acc[key].push(output_index);
        });
        return acc;
      },
      {} as Record<number, number[]>,
    );
  }

  private collectionOutputMap() {
    const { workflow: wk } = this;
    const deps = this.collectionDependencies();
    // 计算出每个node的最大输出参数个数
    const max_outputs = Object.entries(deps).reduce(
      (acc, [node_index, args_index]) => {
        acc[node_index] = Math.max(...args_index) + 1;
        return acc;
      },
      {} as Record<number | string, number>,
    );

    const nodes = wk.nodes;
    const outputMap: Record<string, string> = {};
    const counter: Record<string, number> = {};

    const uniqueName = (name: string): string => {
      counter[name] ||= 0;
      counter[name] += 1;
      return `${name}_${counter[name]}`;
    };

    for (const node of nodes) {
      const nodeIndex = node.index;
      const nodeData = node.data;
      const outputs = nodeData.outputs;
      const args_len = max_outputs[nodeIndex];
      if (args_len > outputs.length) {
        for (let i = outputs.length; i < args_len; i++) {
          outputs.push(`OUT_${i}`);
        }
      }

      outputs.forEach((name, index) => {
        const varName = uniqueName(name);
        outputMap[`${nodeIndex}_${index}`] = varName;
        outputs[index] = varName;
      });
    }

    return outputMap;
  }

  private wkToGraph(): WkNodeGraphNode[] {
    const { workflow: wk } = this;
    // 没有依赖任何节点的节点作为根节点
    // 可能有多个根节点
    const nodes = {} as Record<number, WkNodeGraphNode>;
    const rootNodes = [] as WkNodeGraphNode[];

    for (const node of wk.nodes) {
      const deps = Object.values(node.data.inputs)
        .filter((x) => Array.isArray(x))
        .map(([node_index, _]: any) => Number(node_index));
      const is_root = deps.length === 0;
      const graph_node = {
        node: node,
        children: [],
      };
      if (is_root) {
        rootNodes.push(graph_node);
      }
      nodes[node.index] = graph_node;
    }

    for (const node of wk.nodes) {
      const graph_node = nodes[node.index];
      const deps = Object.values(node.data.inputs)
        .filter((x) => Array.isArray(x))
        .map(([node_index, _]: any) => Number(node_index));

      for (const dep of deps) {
        nodes[dep].children.push(graph_node);
      }
    }

    return rootNodes;
  }

  // 根据 graph 结构排序
  // 从根节点开始广度优先
  private wkGraphSort() {
    const graph = this.wkToGraph();
    const sorted = [] as WkNodeGraphNode[];

    const visited = new Set<WkNodeGraphNode>();

    const bfs = (node: WkNodeGraphNode) => {
      if (visited.has(node)) {
        return;
      }
      visited.add(node);

      for (const child of node.children) {
        bfs(child);
      }

      sorted.push(node);
    };

    for (const node of graph) {
      bfs(node);
    }

    return sorted.reverse();
  }

  toCode() {
    const sortedNodes = this.wkGraphSort();
    const outputMap = this.collectionOutputMap();
    const astNodes: types.VariableDeclaration[] = [];

    for (const node of sortedNodes) {
      const nodeData = node.node.data;

      const inputs = nodeData.inputs;

      const inputExpressions = Object.entries(inputs).map(
        ([inputKey, inputValue]) => {
          if (Array.isArray(inputValue)) {
            // value from link
            const refNodeKey = inputValue[0];
            const refOutputIndex = inputValue[1];
            const refVarName = outputMap[`${refNodeKey}_${refOutputIndex}`];

            return types.objectProperty(
              types.stringLiteral(inputKey),
              types.identifier(refVarName),
            );
          } else {
            // value from json
            return types.objectProperty(
              types.stringLiteral(inputKey),
              toAst(inputValue),
            );
          }
        },
      );

      const inputObjectExpression = types.objectExpression(inputExpressions);

      const outputs = nodeData.outputs;
      const outputIdentifiers = outputs.map((name, index) => {
        return types.identifier(name);
      });

      const leftArrayPattern = types.arrayPattern(outputIdentifiers);

      const callExpression = types.callExpression(
        IS_INVALID_VAR(nodeData.class_type)
          ? types.memberExpression(
              types.identifier("cls"),
              types.identifier(`"${nodeData.class_type}"`),
              true,
            )
          : types.memberExpression(
              types.identifier("cls"),
              types.identifier(nodeData.class_type),
              false,
            ),
        [inputObjectExpression],
      );

      const variableDeclarator = types.variableDeclarator(
        leftArrayPattern,
        callExpression,
      );
      const variableDeclaration = types.variableDeclaration("const", [
        variableDeclarator,
      ]);

      if (nodeData._meta?.title) {
        // 如果有 title 增加作为注释 comment
        types.addComment(variableDeclaration, "leading", nodeData._meta.title);
      }
      astNodes.push(variableDeclaration);
    }

    const codeFragments = astNodes.map((node) => generate(node).code);
    const generatedCode = codeFragments.join("\n");

    return generatedCode;
  }
}
