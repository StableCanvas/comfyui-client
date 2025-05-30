import exifr from "exifr";
import { ComfyUIExportImage } from "./Image.types";
import { JsonReader } from "./JsonReader";
import { CWorkflow } from "./Workflow";

export class ImageReader {
  constructor(readonly file: ArrayBufferLike) {}

  async getWorkflowJson(): Promise<ComfyUIExportImage.Root> {
    const parsed = await exifr.parse(this.file, { userComment: true });
    const { workflow } = parsed;
    if (!workflow || typeof workflow !== "string")
      throw new Error("No workflow found in image");
    const json = JSON.parse(workflow);
    if (!json) throw new Error("No workflow found in image");
    return json as ComfyUIExportImage.Root;
  }

  async getWorkflow(): Promise<CWorkflow> {
    const root = await this.getWorkflowJson();
    const reader = new JsonReader(root);
    return reader.getWorkflow();
  }
}
