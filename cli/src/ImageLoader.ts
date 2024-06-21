import * as fs from "fs";
import * as path from "path";

import prettier from "prettier";

import exifr from "exifr";
import { ComfyUIExportImage } from "./Image.types";

// TODO
export class ImageLoader {
  constructor() {}

  async loadFromFile(filepath: string) {
    const parsed = await exifr.parse(filepath);
    // console.log(parsed);
    const { workflow } = parsed;
    if (!workflow || typeof workflow !== "string") {
      throw new Error("No workflow found in image");
    }
    const json = JSON.parse(workflow);
    if (!json) {
      throw new Error("No workflow found in image");
    }

    return json as ComfyUIExportImage.Root;
  }
}

if (require.main === module) {
  const loader = new ImageLoader();
  loader
    .loadFromFile(path.join(__dirname, "../tests/test-inputs/workflow-min.png"))
    .then((json) => {
      console.log(json);
    });
}
