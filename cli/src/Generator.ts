import { CUIWorkflow } from "./Workflow";

import * as types from "@babel/types";
import generator from "@babel/generator";

import { WorkflowNode, WorkflowNodeInputRef } from "./types";

interface WkNodeGraphNode {
  node: WorkflowNode;
  children: WkNodeGraphNode[];
}

export class WorkflowCodeGenerator {
  constructor() {}

  private collectionDependencies(wk: CUIWorkflow) {
    const all_refs = wk.nodes.map((x) =>
      Object.values(x.data.inputs).filter((x) => Array.isArray(x))
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
      {} as Record<number, number[]>
    );
  }

  private collectionOutputMap(wk: CUIWorkflow) {
    const deps = this.collectionDependencies(wk);
    // 计算出每个node的最大输出参数个数
    const max_outputs = Object.entries(deps).reduce(
      (acc, [node_index, args_index]) => {
        acc[node_index] = Math.max(...args_index) + 1;
        return acc;
      },
      {} as Record<number | string, number>
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

  wkToGraph(wk: CUIWorkflow): WkNodeGraphNode[] {
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
  wkGraphSort(wk: CUIWorkflow) {
    const graph = this.wkToGraph(wk);
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

  generate(wk: CUIWorkflow) {
    const sortedNodes = this.wkGraphSort(wk);

    const outputMap = this.collectionOutputMap(wk);

    const astNodes: types.VariableDeclaration[] = [];

    for (const node of sortedNodes) {
      const nodeData = node.node.data;

      const inputs = nodeData.inputs;
      const inputExpressions = Object.entries(inputs).map(
        ([inputKey, inputValue]) => {
          if (Array.isArray(inputValue)) {
            const refNodeKey = inputValue[0];
            const refOutputIndex = inputValue[1];
            const refVarName = outputMap[`${refNodeKey}_${refOutputIndex}`];

            return types.objectProperty(
              types.identifier(inputKey),
              types.identifier(refVarName)
            );
          } else {
            let val;
            switch (typeof inputValue) {
              case "string": {
                val = types.stringLiteral(inputValue);
                break;
              }
              case "number": {
                val = types.numericLiteral(inputValue);
                break;
              }
              case "boolean": {
                val = types.booleanLiteral(inputValue);
                break;
              }
              case "object": {
                if (inputValue !== null) {
                  throw new Error("Wrong workflow");
                }
                val = types.nullLiteral();
                break;
              }
              default: {
                throw new Error("Wrong workflow");
              }
            }
            return types.objectProperty(types.identifier(inputKey), val);
          }
        }
      );

      const inputObjectExpression = types.objectExpression(inputExpressions);

      const outputs = nodeData.outputs;
      const outputIdentifiers = outputs.map((name, index) => {
        return types.identifier(name);
      });

      const leftArrayPattern = types.arrayPattern(outputIdentifiers);

      const callExpression = types.callExpression(
        types.memberExpression(
          types.identifier("cls"),
          types.identifier(nodeData.class_type)
        ),
        [inputObjectExpression]
      );

      const variableDeclarator = types.variableDeclarator(
        leftArrayPattern,
        callExpression
      );
      const variableDeclaration = types.variableDeclaration("const", [
        variableDeclarator,
      ]);

      astNodes.push(variableDeclaration);
    }

    const codeFragments = astNodes.map((node) => generator(node).code);
    const generatedCode = codeFragments.join("\n");

    return generatedCode;
  }
}

// if (require.main === module) {
//   (async () => {
//     const WorkflowMinNodes = (
//       await import("../tests/test-inputs/workflow-min.png.workflow.json", {
//         assert: {
//           type: "json",
//         },
//       })
//     ).default;
//     const generator = new WorkflowCodeGenerator();

//     const wk = new CUIWorkflow();
//     wk.nodes = WorkflowMinNodes as any;
//     const code = await generator.generate(wk);

//     console.log(code);
//   })();
// }
