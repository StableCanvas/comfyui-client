import { CUIWorkflow } from "./Workflow";

import * as types from "@babel/types";
import generator from "@babel/generator";

import { WorkflowNodeInputRef } from "./types";

export class WorkflowCodeGenerator {
  constructor() {}

  private collectionDependencies(wk: CUIWorkflow) {
    const all_refs = wk.nodes.map((x) =>
      Object.values(x.data.inputs).filter((x) => Array.isArray(x))
    ) as WorkflowNodeInputRef[][];

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
      {}
    );

    const nodes = wk.nodes;
    // 初始化变量名计数器和输出映射
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

  generate(wk: CUIWorkflow) {
    const nodes = wk.nodes;

    const outputMap = this.collectionOutputMap(wk);

    // 创建一个AST节点数组，用来保存所有的表达式声明
    const astNodes: any[] = [];

    const sortedNodes = Object.entries(nodes).sort(
      ([aid], [bid]) => Number(aid) - Number(bid)
    );

    // 遍历节点，生成每个节点的代码
    for (const [nodeKey, nodeValue] of sortedNodes) {
      const nodeData = nodeValue.data;

      // 处理输入参数
      const inputs = nodeData.inputs;
      const inputExpressions = Object.entries(inputs).map(
        ([inputKey, inputValue]) => {
          if (Array.isArray(inputValue)) {
            // 映射输出为变量名
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

      // 创建输入对象表达式
      const inputObjectExpression = types.objectExpression(inputExpressions);

      // 处理输出参数
      const outputs = nodeData.outputs;
      const outputIdentifiers = outputs.map((name, index) => {
        return types.identifier(name);
      });

      // 创建左侧的数组模式
      const leftArrayPattern = types.arrayPattern(outputIdentifiers);

      // 创建表达式声明
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

    // 使用 generator 将 AST 节点数组转换为代码字符串
    const codeFragments = astNodes.map((node) => generator(node).code);
    const generatedCode = codeFragments.join("\n");

    return generatedCode;
  }
}
