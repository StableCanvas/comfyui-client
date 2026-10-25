import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { JsonReader } from "@stable-canvas/cw-reader";
import { Transpiler } from "../dist/main.mjs";

function node(index, classType, inputs, outputs) {
  return {
    index,
    data: {
      class_type: classType,
      inputs,
      outputs,
    },
  };
}

test("deduplicates repeated dependencies before topo sort", () => {
  const workflow = {
    nodes: [
      node(
        "1",
        "EmptyLatentImage",
        {
          width: ["4", 0],
          height: ["4", 1],
          batch_size: 1,
        },
        ["LATENT"],
      ),
      node("2", "KSampler", { latent_image: ["1", 0] }, ["LATENT"]),
      node("3", "VAEDecode", { samples: ["2", 0] }, ["IMAGE"]),
      node("4", "ResolutionSelector", {}, ["INT", "INT"]),
      node("5", "SaveImage", { images: ["3", 0] }, []),
    ],
  };

  const code = new Transpiler(workflow).toCode();

  for (const classType of [
    "ResolutionSelector",
    "EmptyLatentImage",
    "KSampler",
    "VAEDecode",
    "SaveImage",
  ]) {
    assert.match(code, new RegExp(`cls\\.${classType}`));
  }
});

test("does not emit injected class types or comments", () => {
  const workflow = {
    nodes: [node("1", 'X"; process.exit(1); cls["', {}, [])],
  };
  workflow.nodes[0].data._meta = {
    title: "x */ process.exit(1); /*",
  };

  const code = new Transpiler(workflow).toCode();

  const cls = new Proxy(
    {},
    {
      get: () => () => [],
    },
  );
  const sandboxProcess = {
    exit: () => {
      throw new Error("injection executed");
    },
  };

  assert.doesNotThrow(() =>
    new Function("cls", "process", code)(cls, sandboxProcess),
  );
});

test("generates valid identifiers for invalid output names", () => {
  const workflow = {
    nodes: [node("1", "SimpleCondition", {}, ["*"])],
  };

  const code = new Transpiler(workflow).toCode();

  assert.match(code, /OUT_0_1/);
  assert.doesNotThrow(() => new Function(code));
});

test("does not treat array widget values as node references", () => {
  const workflow = {
    nodes: [
      node(
        "1",
        "Lora Loader (LoraManager)",
        {
          text: "",
          loras: [],
          nested: { options: [1, 2, 3] },
        },
        ["MODEL", "CLIP"],
      ),
      node("2", "SaveImage", { images: ["1", 0] }, ["IMAGE"]),
    ],
  };

  const code = new Transpiler(workflow).toCode();

  assert.match(code, /"loras": \[\]/);
  assert.match(code, /"options": \[1, 2, 3\]/);
  assert.doesNotThrow(() =>
    new Function("cls", code)(
      new Proxy({}, { get: () => () => Array(2).fill(undefined) }),
    ),
  );
});

test("converts workflows with widgets_values_named", async () => {
  const raw = JSON.parse(
    readFileSync(new URL("./demo-wk.json", import.meta.url), "utf8"),
  );
  const workflow = await new JsonReader(raw).getWorkflow();
  const code = new Transpiler(workflow).toCode();

  assert.equal(workflow.nodes.length, 13);
  assert.deepEqual(
    workflow.nodes.find((item) => item.data.class_type === "ResolutionSelector")
      ?.data.inputs,
    {
      aspect_ratio: "1:1 (Square)",
      megapixels: 1,
      multiple: 16,
    },
  );
  assert.deepEqual(
    workflow.nodes.find((item) => item.data.class_type === "SeedNode")?.data
      .inputs,
    {
      seed: 210,
      fixed: "increment",
    },
  );

  for (const classType of [
    "CLIPLoader",
    "UNETLoader",
    "LoraLoaderModelOnly",
    "ResolutionSelector",
    "ModelAttentionBackend",
    "SeedNode",
    "KSampler",
  ]) {
    assert.match(code, new RegExp(`cls\\.${classType}`));
  }

  const cls = new Proxy(
    {},
    {
      get: () => () => Array(128).fill(undefined),
    },
  );
  assert.doesNotThrow(() => new Function("cls", code)(cls));
});

test("flattens native subgraph instances before generating code", async () => {
  const raw = JSON.parse(
    readFileSync(
      new URL(
        "../../cw-reader/tests/native_subgraph_fixture.json",
        import.meta.url,
      ),
      "utf8",
    ),
  );
  const workflow = await new JsonReader(raw).getWorkflow();
  const code = new Transpiler(workflow).toCode();

  assert.match(code, /cls\.TextWorker/);
  assert.match(code, /cls\.PostProcess/);
  assert.doesNotMatch(
    code,
    /cls\["[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"\]/i,
  );

  const cls = new Proxy(
    {},
    {
      get: () => () => Array(128).fill(undefined),
    },
  );
  assert.doesNotThrow(() => new Function("cls", code)(cls));
});

test("avoids subgraph parameter and output name collisions", async () => {
  const raw = JSON.parse(
    readFileSync(
      new URL("./subgraph_api_banana.json", import.meta.url),
      "utf8",
    ),
  );
  const workflow = await new JsonReader(raw).getWorkflow();
  const code = new Transpiler(workflow).toCode();

  assert.doesNotThrow(() => new Function(code));
});
