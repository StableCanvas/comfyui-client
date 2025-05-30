import { WorkflowCodeGenerator } from "../src/Generator";
import { ImageLoader } from "../src/ImageLoader";
import { CUIWorkflow } from "../src/Workflow";
import * as path from "path";
import * as fs from "fs";

import * as WorkflowMinNodes from "./test-inputs/workflow-min.png.workflow.json";

describe("WorkflowCodeGenerator", () => {
  it("should to generate code", async () => {
    const generator = new WorkflowCodeGenerator();

    const wk = new CUIWorkflow();
    wk.nodes = WorkflowMinNodes as any;
    const code = await generator.generate(wk);

    // NOTE: this code without formatting
    expect(code).toEqual(
      `
const [MODEL_1, CLIP_1, VAE_1] = cls.CheckpointLoaderSimple({
  "ckpt_name": "EPIC-la-v1.ckpt"
});
const [CONDITIONING_2] = cls.CLIPTextEncode({
  "text": "beautiful scenery nature glass bottle landscape, , purple galaxy bottle,",
  "clip": CLIP_1
});
const [CONDITIONING_1] = cls.CLIPTextEncode({
  "text": "text, watermark",
  "clip": CLIP_1
});
const [LATENT_1] = cls.EmptyLatentImage({
  "width": 512,
  "height": 512,
  "batch_size": 1
});
const [LATENT_2] = cls.KSampler({
  "seed": 156680208700286,
  "control_after_generate": "randomize",
  "steps": 20,
  "cfg": 8,
  "sampler_name": "euler",
  "scheduler": "normal",
  "denoise": 1,
  "model": MODEL_1,
  "positive": CONDITIONING_2,
  "negative": CONDITIONING_1,
  "latent_image": LATENT_1
});
const [IMAGE_1] = cls.VAEDecode({
  "samples": LATENT_2,
  "vae": VAE_1
});
const [] = cls.SaveImage({
  "filename_prefix": "ComfyUI",
  "images": IMAGE_1
});
    `.trim(),
    );
  });

  it("should to generate code from HiResfix_workflow.png", async () => {
    const loader = new ImageLoader();
    const json = await loader.loadFromFile(
      path.join(__dirname, "../tests/test-inputs/HiResfix_workflow.png"),
    );
    const workflow = await loader.imageWkToWorkflow(json);
    const generator = new WorkflowCodeGenerator();
    const code = await generator.generate(workflow);
    const expected_code = fs
      .readFileSync(
        path.join(
          __dirname,
          "../tests/test-inputs/HiResfix_workflow.png.expected.txt",
        ),
      )
      .toString("utf-8");
    expect(code.trim()).toEqual(expected_code.trim());
  });
});
