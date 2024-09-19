import "esm-hook";
import { ComfyUIApiClient } from "../../../src/main";
import WebSocket from "ws";
import fetch from "node-fetch";

import fs from "fs";

const payload = {
  prompt: {
    "3": {
      inputs: {
        seed: 1075047725723808,
        steps: 30,
        cfg: 8,
        sampler_name: "dpmpp_2m_sde_gpu",
        scheduler: "karras",
        denoise: 1,
        model: ["4", 0],
        positive: ["6", 0],
        negative: ["7", 0],
        latent_image: ["5", 0],
      },
      class_type: "KSampler",
    },
    "4": {
      inputs: { ckpt_name: "LOFI_V4.safetensors" },
      class_type: "CheckpointLoaderSimple",
    },
    "5": {
      inputs: { width: 512, height: 768, batch_size: 1 },
      class_type: "EmptyLatentImage",
    },
    "6": {
      inputs: { text: "1girl", clip: ["4", 1] },
      class_type: "CLIPTextEncode",
    },
    "7": {
      inputs: {
        text: "text,error,username,fake,drawing,painting,worst quality, bad anatomy, NG_DeepNegative_V1_75T,",
        clip: ["4", 1],
      },
      class_type: "CLIPTextEncode",
    },
    "8": {
      inputs: { samples: ["3", 0], vae: ["4", 2] },
      class_type: "VAEDecode",
    },
    "9": {
      inputs: { filename_prefix: "ComfyUI", images: ["8", 0] },
      class_type: "SaveImage",
    },
  },
  workflow: {
    last_node_id: 10,
    last_link_id: 9,
    nodes: [
      {
        id: 4,
        type: "CheckpointLoaderSimple",
        pos: [54, 70],
        size: { "0": 315, "1": 98 },
        flags: {},
        order: 0,
        mode: 0,
        outputs: [
          { name: "MODEL", type: "MODEL", links: [1], slot_index: 0 },
          { name: "CLIP", type: "CLIP", links: [3, 5], slot_index: 1 },
          { name: "VAE", type: "VAE", links: [8], slot_index: 2 },
        ],
        properties: { "Node name for S&R": "CheckpointLoaderSimple" },
        widgets_values: ["LOFI_V4.safetensors"],
      },
      {
        id: 5,
        type: "EmptyLatentImage",
        pos: [57, 665],
        size: { "0": 315, "1": 106 },
        flags: {},
        order: 1,
        mode: 0,
        outputs: [
          { name: "LATENT", type: "LATENT", links: [2], slot_index: 0 },
        ],
        properties: { "Node name for S&R": "EmptyLatentImage" },
        widgets_values: [512, 768, 1],
      },
      {
        id: 3,
        type: "KSampler",
        pos: [500, 59],
        size: { "0": 315, "1": 262 },
        flags: {},
        order: 4,
        mode: 0,
        inputs: [
          { name: "model", type: "MODEL", link: 1 },
          { name: "positive", type: "CONDITIONING", link: 4 },
          { name: "negative", type: "CONDITIONING", link: 6 },
          { name: "latent_image", type: "LATENT", link: 2 },
        ],
        outputs: [
          { name: "LATENT", type: "LATENT", links: [7], slot_index: 0 },
        ],
        properties: { "Node name for S&R": "KSampler" },
        widgets_values: [
          1075047725723808,
          "randomize",
          30,
          8,
          "dpmpp_2m_sde_gpu",
          "karras",
          1,
        ],
      },
      {
        id: 9,
        type: "SaveImage",
        pos: [510, 366],
        size: [567, 426],
        flags: {},
        order: 6,
        mode: 0,
        inputs: [{ name: "images", type: "IMAGE", link: 9 }],
        properties: {},
        widgets_values: ["ComfyUI"],
      },
      {
        id: 8,
        type: "VAEDecode",
        pos: [847, 268],
        size: { "0": 210, "1": 46 },
        flags: {},
        order: 5,
        mode: 0,
        inputs: [
          { name: "samples", type: "LATENT", link: 7 },
          { name: "vae", type: "VAE", link: 8 },
        ],
        outputs: [{ name: "IMAGE", type: "IMAGE", links: [9], slot_index: 0 }],
        properties: { "Node name for S&R": "VAEDecode" },
      },
      {
        id: 6,
        type: "CLIPTextEncode",
        pos: [50, 220],
        size: { "0": 422.84503173828125, "1": 164.31304931640625 },
        flags: {},
        order: 2,
        mode: 0,
        inputs: [{ name: "clip", type: "CLIP", link: 3 }],
        outputs: [
          {
            name: "CONDITIONING",
            type: "CONDITIONING",
            links: [4],
            slot_index: 0,
          },
        ],
        title: "Prompt",
        properties: { "Node name for S&R": "CLIPTextEncode" },
        widgets_values: ["1girl"],
      },
      {
        id: 7,
        type: "CLIPTextEncode",
        pos: [50, 420],
        size: { "0": 425.27801513671875, "1": 180.6060791015625 },
        flags: {},
        order: 3,
        mode: 0,
        inputs: [{ name: "clip", type: "CLIP", link: 5 }],
        outputs: [
          {
            name: "CONDITIONING",
            type: "CONDITIONING",
            links: [6],
            slot_index: 0,
          },
        ],
        title: "Negative",
        properties: { "Node name for S&R": "CLIPTextEncode" },
        widgets_values: [
          "text,error,username,fake,drawing,painting,worst quality, bad anatomy, NG_DeepNegative_V1_75T,",
        ],
      },
    ],
    links: [
      [1, 4, 0, 3, 0, "MODEL"],
      [2, 5, 0, 3, 3, "LATENT"],
      [3, 4, 1, 6, 0, "CLIP"],
      [4, 6, 0, 3, 1, "CONDITIONING"],
      [5, 4, 1, 7, 0, "CLIP"],
      [6, 7, 0, 3, 2, "CONDITIONING"],
      [7, 3, 0, 8, 0, "LATENT"],
      [8, 4, 2, 8, 1, "VAE"],
      [9, 8, 0, 9, 0, "IMAGE"],
    ],
    groups: [],
    config: {},
    extra: {},
    version: 0.4,
  },
};

const client = new ComfyUIApiClient({
  api_host: "127.0.0.1:8188",
  api_base: "",
  sessionName: "",
  WebSocket: WebSocket as any,
  fetch: fetch as any,
});
const main = async () => {
  client.connect();
  const resp = await client.runPrompt(payload.prompt, {
    workflow: payload.workflow,
  });
  console.log(resp);
};

main()
  .then(() => console.log("done"))
  .catch((e) => console.error(e))
  .finally(() => client.close());
