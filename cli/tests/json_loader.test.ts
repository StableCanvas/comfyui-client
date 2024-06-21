import { JsonLoader } from "../src/JsonLoader";

import * as path from "path";

describe("JsonLoader", () => {
  it("should load json file to workflow", async () => {
    const loader = new JsonLoader();

    const workflow = await loader.loadFromFile(
      path.join(__dirname, "../tests/test-inputs/workflow-min.json")
    );

    expect(workflow.nodes).toEqual([
      {
        data: {
          class_type: "CheckpointLoaderSimple",
          inputs: {
            ckpt_name: "lofi_v5.baked.fp16.safetensors",
          },
          outputs: ["MODEL", "CLIP", "VAE"],
        },
        index: 1,
      },
      {
        data: {
          class_type: "CLIPTextEncode",
          inputs: {
            clip: ["1", 1],
            text: "best quality, 1girl",
          },
          outputs: ["CONDITIONING"],
        },
        index: 2,
      },
      {
        data: {
          class_type: "CLIPTextEncode",
          inputs: {
            clip: ["1", 1],
            text: "worst quality, bad anatomy, embedding:NG_DeepNegative_V1_75T",
          },
          outputs: ["CONDITIONING"],
        },
        index: 3,
      },
      {
        data: {
          class_type: "EmptyLatentImage",
          inputs: {
            batch_size: 1,
            height: 512,
            width: 512,
          },
          outputs: ["LATENT"],
        },
        index: 4,
      },
      {
        data: {
          class_type: "KSampler",
          inputs: {
            cfg: 4,
            denoise: 1,
            latent_image: ["4", 0],
            model: ["1", 0],
            negative: ["3", 0],
            positive: ["2", 0],
            sampler_name: "dpmpp_2m_sde_gpu",
            scheduler: "karras",
            seed: 2765233096,
            steps: 35,
          },
          outputs: ["LATENT"],
        },
        index: 5,
      },
      {
        data: {
          class_type: "VAEDecode",
          inputs: {
            samples: ["5", 0],
            vae: ["1", 2],
          },
          outputs: ["IMAGE"],
        },
        index: 6,
      },
      {
        data: {
          class_type: "SaveImage",
          inputs: {
            filename_prefix: "from-sc-comfy-ui-client",
            images: ["6", 0],
          },
          outputs: [],
        },
        index: 7,
      },
    ]);
  });
});
