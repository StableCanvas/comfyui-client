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

  assert.equal(workflow.nodes[0].data.inputs.ckpt_name, "model.safetensors");
  assert.deepEqual(workflow.nodes[1].data.inputs.samples, ["1", 0]);
});

test("resolves current widgets from schema and explicit overrides", () => {
  const raw = {
    version: 1,
    state: {},
    nodes: [
      node("1", "CLIPLoader", {
        widgets_values: ["clip.safetensors", "flux", "cpu"],
      }),
      node("2", "EmptySD3LatentImage", {
        widgets_values: [1024, 768, 1],
      }),
      node("3", "InpaintModelConditioning", {
        widgets_values: [true],
      }),
      node("4", "WanImageToVideo", {
        inputs: [
          { name: "positive", type: "CONDITIONING", link: null },
          { name: "negative", type: "CONDITIONING", link: null },
          { name: "vae", type: "VAE", link: null },
        ],
        widgets_values: [832, 480, 81, 1],
      }),
    ],
    links: [],
    groups: [],
    config: {},
    extra: {},
  };

  const workflow = new JsonReader(raw).getWorkflow();

  assert.deepEqual(workflow.nodes[0].data.inputs, {
    clip_name: "clip.safetensors",
    type: "flux",
    device: "cpu",
  });
  assert.deepEqual(workflow.nodes[1].data.inputs, {
    width: 1024,
    height: 768,
    batch_size: 1,
  });
  assert.deepEqual(workflow.nodes[2].data.inputs, { noise_mask: true });
  assert.deepEqual(workflow.nodes[3].data.inputs, {
    width: 832,
    height: 480,
    length: 81,
    batch_size: 1,
  });
});

test("covers discovered widget mapping regressions", () => {
  const cases = [
    {
      type: "UNETLoader",
      widgets: ["model.safetensors", "fp8_e4m3fn"],
      expected: { unet_name: "model.safetensors", weight_dtype: "fp8_e4m3fn" },
    },
    {
      type: "DualCLIPLoader",
      widgets: ["clip_l.safetensors", "t5xxl.safetensors", "flux", "cpu"],
      expected: {
        clip_name1: "clip_l.safetensors",
        clip_name2: "t5xxl.safetensors",
        type: "flux",
        device: "cpu",
      },
    },
    {
      type: "FluxGuidance",
      widgets: [3.5],
      inputs: [{ name: "conditioning", type: "CONDITIONING", link: null }],
      expected: { guidance: 3.5 },
    },
    {
      type: "ModelSamplingSD3",
      widgets: [7],
      inputs: [{ name: "model", type: "MODEL", link: null }],
      expected: { shift: 7 },
    },
    {
      type: "RandomNoise",
      widgets: [123456, "randomize"],
      expected: { noise_seed: 123456, control_after_generate: "randomize" },
    },
    {
      type: "LTXVScheduler",
      widgets: [20, 2.05, 0.95, true, 0.1],
      expected: {
        steps: 20,
        max_shift: 2.05,
        base_shift: 0.95,
        stretch: true,
        terminal: 0.1,
      },
    },
    {
      type: "VAEDecodeTiled",
      widgets: [512, 64, 8, 4],
      inputs: [
        { name: "samples", type: "LATENT", link: null },
        { name: "vae", type: "VAE", link: null },
      ],
      expected: {
        tile_size: 512,
        overlap: 64,
        temporal_size: 8,
        temporal_overlap: 4,
      },
    },
    {
      type: "ControlNetApplySD3",
      widgets: [0.8, 0.1, 0.9],
      inputs: [
        { name: "positive", type: "CONDITIONING", link: null },
        { name: "negative", type: "CONDITIONING", link: null },
        { name: "control_net", type: "CONTROL_NET", link: null },
        { name: "vae", type: "VAE", link: null },
        { name: "image", type: "IMAGE", link: null },
      ],
      expected: { strength: 0.8, start_percent: 0.1, end_percent: 0.9 },
    },
    {
      type: "WanCameraEmbedding",
      widgets: ["Zoom In", 832, 480, 81, 1, 0.5, 0.5, 0.5, 0.5],
      expected: {
        camera_pose: "Zoom In",
        width: 832,
        height: 480,
        length: 81,
        speed: 1,
        fx: 0.5,
        fy: 0.5,
        cx: 0.5,
        cy: 0.5,
      },
    },
    {
      type: "SaveImage",
      widgets: ["ComfyUI", ""],
      inputs: [{ name: "images", type: "IMAGE", link: null }],
      expected: { filename_prefix: "ComfyUI" },
    },
    {
      type: "SaveAnimatedWEBP",
      widgets: ["ComfyUI", 16, false, 90, "default", ""],
      inputs: [{ name: "images", type: "IMAGE", link: null }],
      expected: {
        filename_prefix: "ComfyUI",
        fps: 16,
        lossless: false,
        quality: 90,
        method: "default",
      },
    },
  ];
  const raw = {
    version: 1,
    state: {},
    nodes: cases.map((item, index) =>
      node(String(index + 1), item.type, {
        widgets_values: item.widgets,
        inputs: item.inputs ?? [],
      }),
    ),
    links: [],
    groups: [],
    config: {},
    extra: {},
  };

  const workflow = new JsonReader(raw).getWorkflow();

  cases.forEach((item, index) => {
    assert.deepEqual(workflow.nodes[index].data.inputs, item.expected);
  });
});

test("inlines primitives and removes notes and reroutes", () => {
  const raw = {
    version: 1,
    state: {},
    nodes: [
      node("1", "PrimitiveNode", {
        outputs: [{ name: "STRING", type: "STRING", slot_index: 0 }],
        widgets_values: ["hello"],
      }),
      node("2", "Reroute", {
        inputs: [{ name: "", type: "*", link: 1 }],
        outputs: [{ name: "", type: "*", links: [2] }],
      }),
      node("3", "CLIPTextEncode", {
        inputs: [{ name: "text", type: "STRING", link: 2 }],
        widgets_values: [],
      }),
      node("4", "Note", { widgets_values: ["documentation"] }),
    ],
    links: [
      [1, 1, 0, 2, 0, "STRING"],
      [2, 2, 0, 3, 0, "STRING"],
    ],
    groups: [],
    config: {},
    extra: {},
  };

  const workflow = new JsonReader(raw).getWorkflow();

  assert.equal(workflow.nodes.length, 1);
  assert.equal(workflow.nodes[0].data.class_type, "CLIPTextEncode");
  assert.equal(workflow.nodes[0].data.inputs.text, "hello");
});

test("removes terminal muted nodes and rejects live muted dependencies", () => {
  const terminalMuted = {
    version: 1,
    state: {},
    nodes: [
      node("1", "CheckpointLoaderSimple", {
        widgets_values: ["model.safetensors"],
      }),
      node("2", "SaveImage", {
        mode: 2,
        inputs: [{ name: "images", type: "IMAGE", link: 1 }],
        widgets_values: ["ComfyUI"],
      }),
    ],
    links: [[1, 1, 0, 2, 0, "IMAGE"]],
    groups: [],
    config: {},
    extra: {},
  };

  const workflow = new JsonReader(terminalMuted).getWorkflow();
  assert.deepEqual(
    workflow.nodes.map((item) => item.data.class_type),
    ["CheckpointLoaderSimple"],
  );

  const dependedOnMuted = structuredClone(terminalMuted);
  dependedOnMuted.nodes[0].mode = 2;
  dependedOnMuted.nodes[1].mode = 0;

  assert.throws(
    () => new JsonReader(dependedOnMuted).getWorkflow(),
    /depends on muted node/,
  );
});

test("rewires bypassed node outputs to compatible inputs", () => {
  const raw = {
    version: 1,
    state: {},
    nodes: [
      node("1", "CheckpointLoaderSimple", {
        outputs: [{ name: "MODEL", type: "MODEL", slot_index: 0 }],
        widgets_values: ["model.safetensors"],
      }),
      node("2", "ModelSamplingAuraFlow", {
        mode: 4,
        inputs: [{ name: "model", type: "MODEL", link: 1 }],
        outputs: [{ name: "MODEL", type: "MODEL", links: [2] }],
        widgets_values: [3],
      }),
      node("3", "KSampler", {
        inputs: [{ name: "model", type: "MODEL", link: 2 }],
        widgets_values: [1, "fixed", 20, 8, "euler", "normal", 1],
      }),
    ],
    links: [
      [1, 1, 0, 2, 0, "MODEL"],
      [2, 2, 0, 3, 0, "MODEL"],
    ],
    groups: [],
    config: {},
    extra: {},
  };

  const workflow = new JsonReader(raw).getWorkflow();

  assert.deepEqual(
    workflow.nodes.map((item) => item.data.class_type),
    ["CheckpointLoaderSimple", "KSampler"],
  );
  assert.deepEqual(workflow.nodes[1].data.inputs.model, ["1", 0]);
});

test("expands group nodes and preserves external links and widgets", () => {
  const raw = {
    version: 1,
    state: {},
    nodes: [
      node("1", "PrimitiveNode", {
        outputs: [{ name: "STRING", type: "STRING", slot_index: 0 }],
        widgets_values: ["hello"],
      }),
      node("10", "workflow/Prompt", {
        inputs: [{ name: "text", type: "STRING", link: 1 }],
        outputs: [{ name: "CONDITIONING", type: "CONDITIONING", links: [2] }],
        widgets_values: [512, 768, 2],
      }),
      node("11", "ConditioningZeroOut", {
        inputs: [{ name: "conditioning", type: "CONDITIONING", link: 2 }],
        widgets_values: [],
      }),
    ],
    links: [
      [1, 1, 0, 10, 0, "STRING"],
      [2, 10, 0, 11, 0, "CONDITIONING"],
    ],
    groups: [],
    config: {},
    extra: {
      groupNodes: {
        Prompt: {
          nodes: [
            {
              index: 0,
              type: "CLIPTextEncode",
              mode: 0,
              inputs: [{ name: "text", type: "STRING", link: null }],
              outputs: [
                { name: "CONDITIONING", type: "CONDITIONING", links: [] },
              ],
              widgets_values: [],
            },
            {
              index: 1,
              type: "EmptySD3LatentImage",
              mode: 0,
              inputs: [],
              outputs: [{ name: "LATENT", type: "LATENT", links: [] }],
              widgets_values: [1024, 1024, 1],
            },
          ],
          links: [[null, 0, 0, 0, 101, "STRING"]],
          external: [[{ index: 0 }, 0, "CONDITIONING"]],
          config: {},
        },
      },
    },
  };

  const workflow = new JsonReader(raw).getWorkflow();

  assert.deepEqual(
    workflow.nodes.map((item) => [item.index, item.data.class_type]),
    [
      ["10__group_0", "CLIPTextEncode"],
      ["10__group_1", "EmptySD3LatentImage"],
      ["11", "ConditioningZeroOut"],
    ],
  );
  assert.equal(workflow.nodes[0].data.inputs.text, "hello");
  assert.deepEqual(workflow.nodes[1].data.inputs, {
    width: 512,
    height: 768,
    batch_size: 2,
  });
  assert.deepEqual(workflow.nodes[2].data.inputs.conditioning, [
    "10__group_0",
    0,
  ]);
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
    /Missing widget mapping/,
  );
});

test("still reads legacy workflow JSON v0.4", () => {
  const raw = JSON.parse(
    readFileSync(new URL("../img2img_workflow.json", import.meta.url), "utf8"),
  );
  const workflow = new JsonReader(raw).getWorkflow();

  assert.equal(workflow.nodes.length, 8);
  assert.deepEqual(workflow.nodes[2].data.inputs.samples, ["3", 0]);
});
