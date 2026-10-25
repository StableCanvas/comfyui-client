#!/usr/bin/env node
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { ImageReader, JsonReader } from "@stable-canvas/cw-reader";
import { Transpiler } from "../dist/main.mjs";

const WORKFLOW_EXTENSIONS = new Set([".json", ".png"]);

function printHelp() {
  console.log(`Usage: node scripts/check-examples.mjs [options] <file-or-directory...>

Options:
  --json           Print a machine-readable report
  --strict-skips   Treat images without workflow metadata as failures
  --verbose        Include error stacks
  --help           Show this help

Run pnpm build first so ../dist/main.mjs reflects the current source.`);
}

function parseArgs(argv) {
  const options = {
    json: false,
    strictSkips: false,
    verbose: false,
    help: false,
    targets: [],
  };

  for (const arg of argv) {
    if (arg === "--json") options.json = true;
    else if (arg === "--strict-skips") options.strictSkips = true;
    else if (arg === "--verbose") options.verbose = true;
    else if (arg === "--help" || arg === "-h") options.help = true;
    else if (arg.startsWith("-")) throw new Error(`Unknown option: ${arg}`);
    else options.targets.push(path.resolve(arg));
  }

  return options;
}

async function collectFiles(target) {
  const info = await stat(target);
  if (info.isFile()) {
    return WORKFLOW_EXTENSIONS.has(path.extname(target).toLowerCase())
      ? [target]
      : [];
  }
  if (!info.isDirectory()) return [];

  const files = [];
  for (const entry of await readdir(target, { withFileTypes: true })) {
    const fullPath = path.join(target, entry.name);
    if (entry.isDirectory()) files.push(...(await collectFiles(fullPath)));
    else if (
      entry.isFile() &&
      WORKFLOW_EXTENSIONS.has(path.extname(entry.name).toLowerCase())
    ) {
      files.push(fullPath);
    }
  }
  return files;
}

function countValues(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return counts;
}

function difference(left, right) {
  const result = [];
  for (const [value, count] of left) {
    const extra = count - (right.get(value) ?? 0);
    for (let index = 0; index < extra; index += 1) result.push(value);
  }
  return result.sort();
}

function sameJsonValue(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function isNodeInputRef(value) {
  return (
    Array.isArray(value) &&
    value.length === 2 &&
    (typeof value[0] === "string" || typeof value[0] === "number") &&
    Number.isInteger(value[1]) &&
    value[1] >= 0
  );
}

function getExpectedNodeTypes(root) {
  if (!Array.isArray(root?.nodes) || !Array.isArray(root?.links)) return null;

  const groupDefinitions = root.extra?.groupNodes ?? {};
  const helperTypes = new Set([
    "Note",
    "MarkdownNote",
    "Reroute",
    "PrimitiveNode",
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

  function getGroupDefinition(node) {
    return (
      groupDefinitions[node.type] ??
      groupDefinitions[node.type.replace(/^workflow[/>]/, "")]
    );
  }

  function visit(node, stack) {
    const mode = node.mode ?? 0;
    if (mode === 2 || mode === 4 || helperTypes.has(node.type)) return [];

    const definition = getGroupDefinition(node);
    if (!definition) return [node.type];

    if (stack.has(node.type)) {
      throw new Error(`Cyclic group definition: ${node.type}`);
    }
    const nextStack = new Set(stack).add(node.type);
    return definition.nodes.flatMap((child) => visit(child, nextStack));
  }

  return root.nodes.flatMap((node) => visit(node, new Set()));
}

function executeGeneratedCode(code, filename) {
  const calls = [];
  const cls = new Proxy(
    {},
    {
      get:
        (_target, classType) =>
        (...args) => {
          const producer = calls.length;
          calls.push({
            classType: String(classType),
            inputs: args[0],
            argumentCount: args.length,
          });
          return Array.from({ length: 128 }, (_value, output) => ({
            __transpilerToken: true,
            producer,
            output,
          }));
        },
    },
  );

  new vm.Script(code, { filename });
  vm.runInNewContext(code, { cls }, { filename, timeout: 5_000 });
  return calls;
}

function validateGraph(workflow, calls) {
  const nodes = workflow.nodes;
  const nodeById = new Map(nodes.map((node) => [node.index, node]));
  const mappedNodes = Array(calls.length).fill(null);
  const usedNodeIds = new Set();

  function matchesInputs(node, call) {
    if (call.argumentCount !== 1) return false;
    if (!call.inputs || typeof call.inputs !== "object") return false;

    const expected = node.data.inputs;
    const actual = call.inputs;
    const expectedKeys = Object.keys(expected).sort();
    const actualKeys = Object.keys(actual).sort();
    if (!sameJsonValue(expectedKeys, actualKeys)) return false;

    for (const key of expectedKeys) {
      const expectedValue = expected[key];
      const actualValue = actual[key];

      if (isNodeInputRef(expectedValue)) {
        if (!actualValue?.__transpilerToken) return false;
        if (actualValue.output !== Number(expectedValue[1])) return false;

        const producerNode = mappedNodes[actualValue.producer];
        if (!producerNode) return false;
        if (producerNode.index !== String(expectedValue[0])) return false;
      } else if (!sameJsonValue(actualValue, expectedValue)) {
        return false;
      }
    }
    return true;
  }

  function search(callIndex) {
    if (callIndex === calls.length) return usedNodeIds.size === nodeById.size;

    const call = calls[callIndex];
    for (const node of nodes) {
      if (usedNodeIds.has(node.index)) continue;
      if (node.data.class_type !== call.classType) continue;
      if (!matchesInputs(node, call)) continue;

      usedNodeIds.add(node.index);
      mappedNodes[callIndex] = node;
      if (search(callIndex + 1)) return true;
      mappedNodes[callIndex] = null;
      usedNodeIds.delete(node.index);
    }
    return false;
  }

  return search(0);
}

function classifyReadError(error, extension) {
  const message = String(error?.message ?? error);
  if (extension === ".png" && message.includes("No workflow found in image")) {
    return "no-workflow-metadata";
  }
  if (message.includes("Missing widget mapping"))
    return "missing-widget-mapping";
  if (message.includes("Node mode")) return "unsupported-node-mode";
  if (message.includes("Unsupported workflow JSON version"))
    return "unsupported-version";
  if (message.includes("Missing link")) return "missing-link";
  return "read-error";
}

async function validateFile(file, options) {
  const extension = path.extname(file).toLowerCase();
  const started = Date.now();
  const result = { file, status: "failed", category: "unknown" };

  try {
    const raw = await readFile(file);
    const buffer = raw.buffer.slice(
      raw.byteOffset,
      raw.byteOffset + raw.byteLength,
    );
    const root =
      extension === ".json"
        ? JSON.parse(raw.toString("utf8"))
        : await new ImageReader(buffer).getWorkflowJson();
    const workflow = new JsonReader(root).getWorkflow();
    result.nodes = workflow.nodes.length;

    const expectedNodeTypes = getExpectedNodeTypes(root);
    if (expectedNodeTypes) {
      const expectedCounts = countValues(expectedNodeTypes);
      const normalizedCounts = countValues(
        workflow.nodes.map((node) => node.data.class_type),
      );
      const missingNodes = difference(expectedCounts, normalizedCounts);
      const extraNodes = difference(normalizedCounts, expectedCounts);
      if (missingNodes.length || extraNodes.length) {
        result.category = "reader-node-multiset";
        result.missingNodes = missingNodes;
        result.extraNodes = extraNodes;
        return result;
      }
    }
    const code = new Transpiler(workflow).toCode();
    result.generatedBytes = Buffer.byteLength(code);

    let calls;
    try {
      calls = executeGeneratedCode(code, file);
    } catch (error) {
      result.status = "failed";
      result.category = "generated-code";
      result.error = String(error?.message ?? error);
      if (options.verbose) result.stack = String(error?.stack ?? error);
      return result;
    }

    result.calls = calls.length;
    const expectedCounts = countValues(
      workflow.nodes.map((node) => node.data.class_type),
    );
    const actualCounts = countValues(calls.map((call) => call.classType));
    const missingNodes = difference(expectedCounts, actualCounts);
    const extraNodes = difference(actualCounts, expectedCounts);
    if (missingNodes.length || extraNodes.length) {
      result.category = "node-multiset";
      result.missingNodes = missingNodes;
      result.extraNodes = extraNodes;
      return result;
    }

    if (!validateGraph(workflow, calls)) {
      result.category = "graph-mismatch";
      result.error =
        "Generated calls do not preserve node inputs, references, or slots";
      return result;
    }

    result.status = "passed";
    result.category = "ok";
  } catch (error) {
    result.category = classifyReadError(error, extension);
    result.error = String(error?.message ?? error);
    if (options.verbose) result.stack = String(error?.stack ?? error);
    if (result.category === "no-workflow-metadata" && !options.strictSkips) {
      result.status = "skipped";
    }
  } finally {
    result.durationMs = Date.now() - started;
  }

  return result;
}

function summarize(results) {
  const byCategory = {};
  for (const result of results) {
    byCategory[result.category] = (byCategory[result.category] ?? 0) + 1;
  }
  return {
    total: results.length,
    passed: results.filter((result) => result.status === "passed").length,
    failed: results.filter((result) => result.status === "failed").length,
    skipped: results.filter((result) => result.status === "skipped").length,
    byCategory,
  };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }
  if (options.targets.length === 0) {
    printHelp();
    process.exitCode = 2;
    return;
  }

  const files = (
    await Promise.all(options.targets.map((target) => collectFiles(target)))
  )
    .flat()
    .sort((left, right) => left.localeCompare(right));

  const results = [];
  for (const file of files) results.push(await validateFile(file, options));
  const summary = summarize(results);

  if (options.json) {
    console.log(JSON.stringify({ summary, results }, null, 2));
  } else {
    for (const result of results) {
      const location = path.relative(process.cwd(), result.file) || result.file;
      if (result.status === "passed") {
        console.log(
          `[PASS] ${location} (nodes=${result.nodes}, calls=${result.calls})`,
        );
      } else if (result.status === "skipped") {
        console.log(`[SKIP] ${location} (${result.category})`);
      } else {
        const detail =
          result.error ??
          `missing=[${result.missingNodes?.join(",") ?? ""}] extra=[${result.extraNodes?.join(",") ?? ""}]`;
        console.log(`[FAIL] ${location} (${result.category}) ${detail}`);
      }
    }
    console.log(
      `\nSummary: total=${summary.total} passed=${summary.passed} failed=${summary.failed} skipped=${summary.skipped}`,
    );
    console.log(`Categories: ${JSON.stringify(summary.byCategory)}`);
  }

  if (summary.failed > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
