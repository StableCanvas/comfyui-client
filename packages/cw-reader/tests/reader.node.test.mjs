import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { JsonReader } from "../dist/main.mjs";

function node(id, type, extra = {}) {
  return {
    id,
    type,
    pos: [0, 0],
    size: [100, 100],
    flags: {},
    order: 0,
    mode: 0,
    properties: {},
    ...extra,
  };
}

test("reads workflow JSON v1 object links", () => {
  const raw = {
    version: 1,
    state: {},
    nodes: [
      node("1", "CheckpointLoaderSimple", {
        outputs: [{ name: "LATENT", type: "LATENT", slot_index: 0 }],
        widgets_values: { ckpt_name: "model.safetensors" },
      }),
      node("2", "VAEDecode", {
        inputs: [{ name: "samples", type: "LATENT", link: 5 }],
        widgets_values: {},
      }),
    ],
    links: [
      {
        id: 5,
        origin_id: "1",
        origin_slot: 0,
        target_id: "2",
        target_slot: 0,
        type: "LATENT",
      },
    ],
    groups: [],
    config: {},
    extra: {},
  };

  const workflow = new JsonReader(raw).getWorkflow();

  assert.equal(
    workflow.nodes[0].data.inputs.ckpt_name,
    "model.safetensors"
  );
  assert.deepEqual(workflow.nodes[1].data.inputs.samples, ["1", 0]);
});

test("rejects muted or bypassed nodes instead of silently changing behavior", () => {
  const raw = {
    version: 1,
    state: {},
    nodes: [node("1", "KSampler", { mode: 2 })],
    links: [],
    groups: [],
    config: {},
    extra: {},
  };

  assert.throws(
    () => new JsonReader(raw).getWorkflow(),
    /Node mode 2 is not supported/
  );
});

test("rejects unknown widget mapping", () => {
  const raw = {
    version: 1,
    state: {},
    nodes: [node("1", "UnknownNode", { widgets_values: ["value"] })],
    links: [],
    groups: [],
    config: {},
    extra: {},
  };

  assert.throws(
    () => new JsonReader(raw).getWorkflow(),
    /Missing widget mapping/
  );
});

test("still reads legacy workflow JSON v0.4", () => {
  const raw = JSON.parse(
    readFileSync(new URL("../img2img_workflow.json", import.meta.url), "utf8")
  );
  const workflow = new JsonReader(raw).getWorkflow();

  assert.equal(workflow.nodes.length, 8);
  assert.deepEqual(workflow.nodes[2].data.inputs.samples, ["3", 0]);
});
