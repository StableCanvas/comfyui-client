import { WorkflowCodeGenerator } from "../src/Generator";
import { CUIWorkflow } from "../src/Workflow";

import * as WorkflowMinNodes from "./test-inputs/workflow-min.png.workflow.json";

describe("WorkflowCodeGenerator", () => {
  it("should to generate code", async () => {
    const generator = new WorkflowCodeGenerator();

    const wk = new CUIWorkflow();
    wk.nodes = WorkflowMinNodes as any;
    const code = await generator.generate(wk);

    expect(code).toEqual(
      `
const [MODEL_1, CLIP_1, VAE_1] = cls.CheckpointLoaderSimple({
  Node name for S&R: "CheckpointLoaderSimple"
});
const [CONDITIONING_2] = cls.CLIPTextEncode({
  Node name for S&R: "CLIPTextEncode",
  clip: CLIP_1
});
const [CONDITIONING_1] = cls.CLIPTextEncode({
  Node name for S&R: "CLIPTextEncode",
  clip: CLIP_1
});
const [LATENT_1] = cls.EmptyLatentImage({
  Node name for S&R: "EmptyLatentImage"
});
const [LATENT_2] = cls.KSampler({
  Node name for S&R: "KSampler",
  model: MODEL_1,
  positive: CONDITIONING_2,
  negative: CONDITIONING_1,
  latent_image: LATENT_1
});
const [IMAGE_1] = cls.VAEDecode({
  Node name for S&R: "VAEDecode",
  samples: LATENT_2,
  vae: VAE_1
});
const [] = cls.SaveImage({
  images: IMAGE_1
});
    `.trim()
    );
  });
});
