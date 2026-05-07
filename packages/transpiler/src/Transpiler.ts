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

interface SubgraphInfo {
  id: string;
  nodes: WorkflowNode[];
  /** 外部引用 → 主图变量名，按参数顺序 */
  params: { refNodeId: string; refOutputIdx: number; paramName: string }[];
  /** 被外部（主图）引用的输出列表，保持顺序 */
  exposedOutputs: { nodeId: string; outputIdx: number; varName: string }[];
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
        types.objectProperty(types.stringLiteral(key), toAst(val))
      );
      return types.objectExpression(properties);
    default:
      throw new Error(`Unsupported nested value type: ${typeof value}`);
  }
};

function parseNodeId(id: string): { groupId: string | null; localId: string } {
  const idx = id.indexOf(":");
  if (idx === -1) return { groupId: null, localId: id };
  return { groupId: id.substring(0, idx), localId: id.substring(idx + 1) };
}

export class Transpiler {
  constructor(readonly workflow: CWorkflow) {}

  // ---------- 依赖分析（不区分组） ----------
  private collectionDependencies() {
    const { workflow: wk } = this;
    const all_refs = wk.nodes.map((x) =>
      Object.values(x.data.inputs).filter((x) => Array.isArray(x))
    ) as WorkflowNodeInputRef[][];

    return all_refs.reduce((acc, x) => {
      x.forEach(([key, output_index]) => {
        acc[key] ||= [];
        acc[key].push(output_index);
      });
      return acc;
    }, {} as Record<string, number[]>);
  }

  // ---------- 分组 ----------
  private groupNodes(): {
    main: WorkflowNode[];
    subgraphs: Map<string, WorkflowNode[]>;
  } {
    const main: WorkflowNode[] = [];
    const subgraphs = new Map<string, WorkflowNode[]>();

    for (const node of this.workflow.nodes) {
      const { groupId } = parseNodeId(node.index);
      if (groupId === null) {
        main.push(node);
      } else {
        if (!subgraphs.has(groupId)) subgraphs.set(groupId, []);
        subgraphs.get(groupId)!.push(node);
      }
    }
    return { main, subgraphs };
  }

  // ---------- 为某一组节点构建依赖图并拓扑排序 ----------
  private buildGraphForNodes(
    nodes: WorkflowNode[],
    nodeIds?: Set<string>
  ): WkNodeGraphNode[] {
    const nodeMap = new Map<string, WkNodeGraphNode>();
    const roots: WkNodeGraphNode[] = [];
    const effectiveIds = nodeIds ?? new Set(nodes.map((n) => n.index));

    for (const node of nodes) {
      // 只考虑指向当前节点集合内部的引用
      const deps = Object.values(node.data.inputs)
        .filter((x) => Array.isArray(x))
        .map(([refIndex]: any) => String(refIndex))
        .filter((refId) => effectiveIds.has(refId));
      const isRoot = deps.length === 0;
      const graphNode: WkNodeGraphNode = { node, children: [] };
      if (isRoot) roots.push(graphNode);
      nodeMap.set(node.index, graphNode);
    }

    for (const node of nodes) {
      const graphNode = nodeMap.get(node.index)!;
      const deps = Object.values(node.data.inputs)
        .filter((x) => Array.isArray(x))
        .map(([refIndex]: any) => String(refIndex))
        .filter((refId) => effectiveIds.has(refId));

      for (const dep of deps) {
        const parent = nodeMap.get(dep);
        if (parent) parent.children.push(graphNode);
      }
    }

    return roots;
  }

  private topologicalSort(roots: WkNodeGraphNode[]): WkNodeGraphNode[] {
    const sorted: WkNodeGraphNode[] = [];
    const visited = new Set<WkNodeGraphNode>();

    const bfs = (node: WkNodeGraphNode) => {
      if (visited.has(node)) return;
      visited.add(node);
      for (const child of node.children) bfs(child);
      sorted.push(node);
    };

    for (const node of roots) bfs(node);
    return sorted.reverse();
  }

  // ---------- 为某一组节点分配输出变量名 ----------
  private buildOutputMap(
    nodes: WorkflowNode[],
    deps: Record<string, number[]>
  ): Map<string, string> {
    // 计算每个节点被引用的最大输出索引
    const maxOutputs: Record<string, number> = {};
    for (const [nodeId, outs] of Object.entries(deps)) {
      maxOutputs[nodeId] = Math.max(...outs) + 1;
    }

    const outputMap = new Map<string, string>();
    const counter: Record<string, number> = {};

    const uniqueName = (name: string): string => {
      counter[name] ||= 0;
      counter[name] += 1;
      return `${name}_${counter[name]}`;
    };

    for (const node of nodes) {
      const outputs = node.data.outputs.slice(); // 复制一份，避免修改原数据
      const neededLen = maxOutputs[node.index] ?? 0;
      while (outputs.length < neededLen) {
        outputs.push(`OUT_${outputs.length}`);
      }

      outputs.forEach((rawName, idx) => {
        const varName = uniqueName(rawName);
        outputMap.set(`${node.index}_${idx}`, varName);
        // 回写便于后续使用
        outputs[idx] = varName;
      });
      // 更新节点的 outputs 字段为含变量名的版本（仅在本次生成中有效）
      (node as any)._outputVarNames = outputs;
    }

    return outputMap;
  }

  // ---------- 提取子图信息 ----------

  private analyzeSubgraph(
    subId: string,
    nodes: WorkflowNode[],
    mainOutputMap: Map<string, string>
  ): SubgraphInfo {
    const extInputsMap = new Map<
      string,
      { refNodeId: string; refOutputIdx: number }
    >();
    const visitedOrder: string[] = [];

    for (const node of nodes) {
      for (const val of Object.values(node.data.inputs)) {
        if (!Array.isArray(val)) continue;
        const [refNodeId, refOutIdx] = val as WorkflowNodeInputRef;
        const { groupId } = parseNodeId(String(refNodeId));
        if (groupId !== subId) {
          const key = `${refNodeId}_${refOutIdx}`;
          if (!extInputsMap.has(key)) {
            extInputsMap.set(key, {
              refNodeId: String(refNodeId),
              refOutputIdx: Number(refOutIdx),
            });
            visitedOrder.push(key);
          }
        }
      }
    }

    const params: SubgraphInfo["params"] = visitedOrder.map((key) => {
      const { refNodeId, refOutputIdx } = extInputsMap.get(key)!;
      const paramName =
        mainOutputMap.get(key) ?? `unknown_${refNodeId}_${refOutputIdx}`;
      return { refNodeId, refOutputIdx, paramName };
    });

    // 收集外部对子图输出的引用（按发现顺序保持稳定）
    const exposedList: { nodeId: string; outputIdx: number }[] = [];
    const exposedSet = new Set<string>();
    for (const node of this.workflow.nodes) {
      if (parseNodeId(node.index).groupId === subId) continue;
      for (const val of Object.values(node.data.inputs)) {
        if (!Array.isArray(val)) continue;
        const [refNodeId, refOutIdx] = val as WorkflowNodeInputRef;
        if (parseNodeId(String(refNodeId)).groupId === subId) {
          const key = `${refNodeId}_${refOutIdx}`;
          if (!exposedSet.has(key)) {
            exposedSet.add(key);
            exposedList.push({
              nodeId: String(refNodeId),
              outputIdx: Number(refOutIdx),
            });
          }
        }
      }
    }

    return {
      id: subId,
      nodes,
      params,
      exposedOutputs: exposedList.map((e) => ({ ...e, varName: "" })),
    };
  }

  // ---------- 生成子图函数体 ----------
  private generateSubgraphCode(info: SubgraphInfo): string {
    const { nodes, params } = info;

    const paramNames = params.map((p) => p.paramName);

    const depsAll = this.collectionDependencies();
    const internalDeps: Record<string, number[]> = {};
    for (const node of nodes) {
      internalDeps[node.index] = depsAll[node.index] || [];
    }

    const sorted = this.topologicalSort(
      this.buildGraphForNodes(nodes, new Set(nodes.map((n) => n.index)))
    );
    const outputMap = this.buildOutputMap(nodes, internalDeps);

    // 填充 exposedOutputs 的 varName
    for (const graphNode of sorted) {
      const vars = (graphNode.node as any)._outputVarNames as string[];
      if (!vars) continue;
      for (const exp of info.exposedOutputs) {
        if (exp.nodeId === graphNode.node.index) {
          exp.varName = vars[exp.outputIdx] ?? `OUT_${exp.outputIdx}`;
        }
      }
    }

    const bodyStatements: types.Statement[] = [];

    for (const graphNode of sorted) {
      const nodeData = graphNode.node.data;
      const inputs = nodeData.inputs;
      const inputExpressions = Object.entries(inputs).map(
        ([inputKey, inputValue]) => {
          if (Array.isArray(inputValue)) {
            const [refNodeId, refOutIdx] = inputValue as WorkflowNodeInputRef;
            const { groupId } = parseNodeId(String(refNodeId));
            if (groupId === info.id) {
              const varName =
                outputMap.get(`${refNodeId}_${refOutIdx}`) ?? "UNKNOWN_LINK";
              return types.objectProperty(
                types.stringLiteral(inputKey),
                types.identifier(varName)
              );
            } else {
              const param = params.find(
                (p) =>
                  p.refNodeId === String(refNodeId) &&
                  p.refOutputIdx === Number(refOutIdx)
              );
              const varName = param?.paramName ?? "UNKNOWN_PARAM";
              return types.objectProperty(
                types.stringLiteral(inputKey),
                types.identifier(varName)
              );
            }
          } else {
            return types.objectProperty(
              types.stringLiteral(inputKey),
              toAst(inputValue)
            );
          }
        }
      );

      const inputObjectExpression = types.objectExpression(inputExpressions);
      const outputs = (graphNode.node as any)._outputVarNames as string[];
      const outputIdentifiers = outputs.map((name) => types.identifier(name));
      const leftArrayPattern = types.arrayPattern(outputIdentifiers);

      const callExpression = types.callExpression(
        IS_INVALID_VAR(nodeData.class_type)
          ? types.memberExpression(
              types.identifier("cls"),
              types.identifier(`"${nodeData.class_type}"`),
              true
            )
          : types.memberExpression(
              types.identifier("cls"),
              types.identifier(nodeData.class_type),
              false
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

      if (nodeData._meta?.title) {
        types.addComment(variableDeclaration, "leading", nodeData._meta.title);
      }
      bodyStatements.push(variableDeclaration);
    }

    // 构建 return 语句
    const returnElements = info.exposedOutputs.map((exp) => {
      const varName = exp.varName || `OUT_${exp.outputIdx}`;
      return types.identifier(varName);
    });
    const returnStatement = types.returnStatement(
      types.arrayExpression(returnElements)
    );
    bodyStatements.push(returnStatement);

    const func = types.functionDeclaration(
      types.identifier(`sub${info.id}`),
      paramNames.map((p) => types.identifier(p)),
      types.blockStatement(bodyStatements)
    );

    return generate(func).code;
  }

  // ---------- 生成主图代码 ----------
  private generateMainCode(
    mainNodes: WorkflowNode[],
    subInfos: Map<string, SubgraphInfo>
  ): string {
    const depsAll = this.collectionDependencies();
    const mainDeps: Record<string, number[]> = {};
    for (const node of mainNodes) {
      mainDeps[node.index] = depsAll[node.index] || [];
    }

    // 主图输出映射（只考虑主图节点间的依赖）
    const mainOutputMap = this.buildOutputMap(mainNodes, mainDeps);

    // 构建所有需要排序的单元：主图节点 + 子图虚拟节点
    interface GraphNode {
      id: string;
      type: "main" | "subcall";
      mainNode?: WorkflowNode;
      subInfo?: SubgraphInfo;
      deps: string[];
    }

    const graph = new Map<string, GraphNode>();

    // 添加主图节点
    for (const node of mainNodes) {
      const deps: string[] = [];
      for (const val of Object.values(node.data.inputs)) {
        if (!Array.isArray(val)) continue;
        const [refNodeId, _refOutIdx] = val as WorkflowNodeInputRef;
        const { groupId: refGroup } = parseNodeId(String(refNodeId));
        if (refGroup === null) {
          deps.push(String(refNodeId));
        } else {
          // 依赖子图虚拟节点
          deps.push(`sub_${refGroup}`);
        }
      }
      graph.set(node.index, {
        id: node.index,
        type: "main",
        mainNode: node,
        deps,
      });
    }

    // 添加子图虚拟节点
    for (const [subId, subInfo] of subInfos) {
      const deps: string[] = subInfo.params.map((p) => p.refNodeId);
      // 避免重复添加（可能没有参数）
      graph.set(`sub_${subId}`, {
        id: `sub_${subId}`,
        type: "subcall",
        subInfo,
        deps,
      });
    }

    // 拓扑排序（Kahn）
    const inDegree = new Map<string, number>();
    for (const [id, gnode] of graph) {
      inDegree.set(id, gnode.deps.length);
    }
    const queue: string[] = [];
    for (const [id, deg] of inDegree) {
      if (deg === 0) queue.push(id);
    }
    const sortedIds: string[] = [];
    while (queue.length) {
      const id = queue.shift()!;
      sortedIds.push(id);
      const gnode = graph.get(id)!;
      // 更新所有依赖此节点的节点入度
      for (const [otherId, otherNode] of graph) {
        if (otherNode.deps.includes(id)) {
          const newDeg = (inDegree.get(otherId) ?? 1) - 1;
          inDegree.set(otherId, newDeg);
          if (newDeg === 0) queue.push(otherId);
        }
      }
    }

    // 生成语句，同时建立子图调用返回变量名映射
    const subCallVarMap = new Map<string, Map<string, string>>(); // subId -> (nodeId:outIdx -> varName)
    const statements: types.Statement[] = [];

    for (const id of sortedIds) {
      const gnode = graph.get(id)!;
      if (gnode.type === "main") {
        const node = gnode.mainNode!;
        const nodeData = node.data;
        const inputs = nodeData.inputs;
        const inputExpressions: types.ObjectProperty[] = [];

        for (const [inputKey, inputValue] of Object.entries(inputs)) {
          if (Array.isArray(inputValue)) {
            const [refNodeId, refOutIdx] = inputValue as WorkflowNodeInputRef;
            const { groupId: refGroup } = parseNodeId(String(refNodeId));

            let varName: string;
            if (refGroup === null) {
              varName =
                mainOutputMap.get(`${refNodeId}_${refOutIdx}`) ??
                "UNKNOWN_LINK";
            } else {
              // 从子图调用变量映射中获取
              const subKey = `sub_${refGroup}`;
              const map = subCallVarMap.get(subKey);
              varName =
                map?.get(`${refNodeId}:${refOutIdx}`) ??
                `sub${refGroup}_${refOutIdx}`;
            }
            inputExpressions.push(
              types.objectProperty(
                types.stringLiteral(inputKey),
                types.identifier(varName)
              )
            );
          } else {
            inputExpressions.push(
              types.objectProperty(
                types.stringLiteral(inputKey),
                toAst(inputValue)
              )
            );
          }
        }

        const inputObjectExpression = types.objectExpression(inputExpressions);
        const outputs = (node as any)._outputVarNames as string[];
        const outputIdentifiers = outputs.map((name) => types.identifier(name));
        const leftArrayPattern = types.arrayPattern(outputIdentifiers);

        const callExpression = types.callExpression(
          IS_INVALID_VAR(nodeData.class_type)
            ? types.memberExpression(
                types.identifier("cls"),
                types.identifier(`"${nodeData.class_type}"`),
                true
              )
            : types.memberExpression(
                types.identifier("cls"),
                types.identifier(nodeData.class_type),
                false
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

        if (nodeData._meta?.title) {
          types.addComment(
            variableDeclaration,
            "leading",
            nodeData._meta.title
          );
        }
        statements.push(variableDeclaration);
      } else {
        // 子图调用
        const subInfo = gnode.subInfo!;
        const paramNames = subInfo.params.map((p) =>
          types.identifier(p.paramName)
        );
        const retVars = subInfo.exposedOutputs.map((exp, idx) => {
          const name = exp.varName || `sub${subInfo.id}_${idx}`;
          return types.identifier(name);
        });
        const leftArray = types.arrayPattern(retVars);
        const callExpr = types.callExpression(
          types.identifier(`sub${subInfo.id}`),
          paramNames
        );
        const decl = types.variableDeclaration("const", [
          types.variableDeclarator(leftArray, callExpr),
        ]);
        statements.push(decl);

        // 记录返回变量映射
        const varMap = new Map<string, string>();
        subInfo.exposedOutputs.forEach((exp, idx) => {
          varMap.set(
            `${exp.nodeId}:${exp.outputIdx}`,
            (retVars[idx] as types.Identifier).name
          );
        });
        subCallVarMap.set(`sub_${subInfo.id}`, varMap);
      }
    }

    return statements.map((stmt) => generate(stmt).code).join("\n");
  }

  // ---------- 公共入口 ----------
  toCode(): string {
    const { main, subgraphs } = this.groupNodes();

    // 先分析子图（需要主图的输出映射来解析参数名，但主图输出映射还未生成，因为子图参数依赖的主图变量可能还未分配）
    // 因此，我们需要先为主图节点分配输出映射（只考虑主图内部依赖）
    const depsAll = this.collectionDependencies();
    const mainDeps: Record<string, number[]> = {};
    for (const node of main) {
      mainDeps[node.index] = depsAll[node.index] || [];
    }
    const mainOutputMap = this.buildOutputMap(main, mainDeps);

    // 分析每个子图
    const subInfos = new Map<string, SubgraphInfo>();
    for (const [subId, nodes] of subgraphs.entries()) {
      const info = this.analyzeSubgraph(subId, nodes, mainOutputMap);
      subInfos.set(subId, info);
    }

    // 生成子图函数代码
    const subFunctions = Array.from(subInfos.values()).map((info) =>
      this.generateSubgraphCode(info)
    );

    // 生成主图代码
    const mainCode = this.generateMainCode(main, subInfos);

    // 组合
    const parts = [mainCode, ...subFunctions];
    return parts.join("\n\n");
  }
}
