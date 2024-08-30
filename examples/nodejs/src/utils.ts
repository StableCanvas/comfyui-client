import "esm-hook";
import fetch from "node-fetch";
import fs from "fs";
import { WorkflowOutput } from "../../../src/types";
import path from "path";
import { isNone } from "../../../src/misc";

export const save_url_to_file = async (url: string, filepath: string) => {
  const res = await fetch(url);
  const fileStream = fs.createWriteStream(filepath);
  await new Promise<void>((resolve, reject) => {
    if (!res.body) {
      reject("No body in response");
      return;
    }
    res.body.pipe(fileStream);
    res.body.on("error", (err) => {
      reject(err);
    });
    fileStream.on("finish", function () {
      resolve();
    });
  });
};

export const save_wf_outputs = async (outputs: WorkflowOutput) => {
  for (const image of outputs.images) {
    const url = image;
    switch (image.type) {
      case "url": {
        const url = image.data;
        const filename = new URLSearchParams(new URL(url).search).get(
          "filename"
        );
        if (isNone(filename)) {
          console.error("No filename in URL");
          continue;
        }
        const filepath = path.join(__dirname, "../outputs", filename);
        await save_url_to_file(url, filepath);
        break;
      }
      case "buff": {
        const filename = `image-${Date.now()}-${Math.random().toString(36).slice(2)}.png`;
        const filepath = path.join(__dirname, "../outputs", filename);
        fs.writeFileSync(filepath, Buffer.from(image.data));
        break;
      }
    }
  }
};
