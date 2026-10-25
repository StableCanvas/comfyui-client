import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  copyFileSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const packageRoot = fileURLToPath(new URL("..", import.meta.url));
const cliPath = join(packageRoot, "index.js");
const fixture = join(packageRoot, "tests/test-inputs/workflow_api.json");
const nativeSubgraphFixture = join(
  packageRoot,
  "../cw-reader/tests/native_subgraph_fixture.json",
);
const packageJson = JSON.parse(
  readFileSync(join(packageRoot, "package.json"), "utf8"),
);

function run(args, options = {}) {
  return spawnSync(process.execPath, [cliPath, ...args], {
    cwd: packageRoot,
    encoding: "utf8",
    ...options,
  });
}

function makeTempDir(t) {
  const dir = mkdtempSync(join(tmpdir(), "cuc-w2c-test-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  return dir;
}

test("prints the package version", () => {
  const result = run(["--version"]);

  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout.trim(), packageJson.version);
});

test("generates code from the TypeScript preset", (t) => {
  const dir = makeTempDir(t);
  const output = join(dir, "nested", "workflow.ts");
  const result = run(["-i", fixture, "-t", "ts", "-o", output]);

  assert.equal(result.status, 0, result.stderr);
  const code = readFileSync(output, "utf8");
  assert.match(code, /import WebSocket from "ws";/);
  assert.match(code, /CheckpointLoaderSimple/);
});

test("pins the browser client to a stable major version", (t) => {
  const dir = makeTempDir(t);
  const output = join(dir, "workflow.js");
  const result = run(["-i", fixture, "-t", "web", "-o", output]);

  assert.equal(result.status, 0, result.stderr);
  const code = readFileSync(output, "utf8");
  assert.match(code, /@stable-canvas\/comfyui-client@1\/\+esm/);
  assert.doesNotMatch(code, /@latest/);
});

test("does not require node-fetch for the CommonJS preset", (t) => {
  const dir = makeTempDir(t);
  const output = join(dir, "workflow.cjs");
  const result = run(["-i", fixture, "-t", "cjs", "-o", output]);

  assert.equal(result.status, 0, result.stderr);
  const code = readFileSync(output, "utf8");
  assert.match(code, /require\("ws"\)/);
  assert.doesNotMatch(code, /node-fetch/);
});

test("accepts JSON inputs with uppercase extensions", (t) => {
  const dir = makeTempDir(t);
  const input = join(dir, "workflow.JSON");
  const output = join(dir, "workflow.js");
  copyFileSync(fixture, input);

  const result = run(["-i", input, "-t", "none", "-o", output]);

  assert.equal(result.status, 0, result.stderr);
  assert.match(readFileSync(output, "utf8"), /CheckpointLoaderSimple/);
});

test("expands native subgraphs before generating CLI output", (t) => {
  const dir = makeTempDir(t);
  const output = join(dir, "workflow.js");
  const result = run(["-i", nativeSubgraphFixture, "-t", "none", "-o", output]);

  assert.equal(result.status, 0, result.stderr);
  const code = readFileSync(output, "utf8");
  assert.match(code, /cls\.TextWorker/);
  assert.match(code, /cls\.PostProcess/);
  assert.doesNotMatch(
    code,
    /cls\["[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"\]/i,
  );
});

test("rejects templates without the injection marker", (t) => {
  const dir = makeTempDir(t);
  const template = join(dir, "template.js");
  writeFileSync(template, "export const value = 1;\n");

  const result = run(["-i", fixture, "-t", template]);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /template does not contain/);
});

test("reports missing option values as a CLI error", () => {
  const result = run(["-i", fixture, "-o"]);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /argument missing|required/i);
  assert.doesNotMatch(result.stderr, /ERR_INVALID_ARG_TYPE/);
});

test("does not overwrite the input workflow", () => {
  const result = run(["-i", fixture, "-o", fixture]);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /cannot overwrite the input file/);
});
