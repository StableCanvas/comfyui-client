import "esm-hook";
import fetch from "node-fetch";
import fs from "fs";
import { WorkflowOutput, Client } from "../../../src/main";
import path from "path";
import { isNone } from "../../../src/utils/misc";
import { Errors } from "../../../src/utils/Errors";
// import { ComfyUIApiClient } from "../../../src/main";

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
    switch (image.type) {
      case "url": {
        const { data: url } = image;
        const filename = new URLSearchParams(new URL(url).search).get(
          "filename",
        );
        if (isNone(filename)) {
          console.error("No filename in URL");
          continue;
        }
        const filepath = path.join(__dirname, "../outputs", filename);
        await save_url_to_file(url, filepath);
        console.log(`Saved ${url} to ${filepath}`);
        break;
      }
      case "buff": {
        const { mime, data } = image;
        const ext = mime.split("/")[1] ?? "png";
        const filename = `image-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const filepath = path.join(__dirname, "../outputs", filename);
        fs.writeFileSync(filepath, Buffer.from(data));
        console.log(`Saved image to ${filepath}`);
        break;
      }
    }
  }
};

export function runDemo(main: () => Promise<void>, client: Client) {
  return main()
    .then(() => console.log("done"))
    .catch((err) => {
      if (err instanceof Errors.HttpError) {
        console.log(`[Errors.HttpError]`);
        console.log(JSON.stringify(err.json));
        console.log(err.message);
      } else {
        console.error(err);
      }
    })
    .finally(() => {
      console.log(2);
      return client.free({ unload_models: true, free_memory: true });
    })
    .finally(() => {
      console.log(2);
      client.close();
      // setTimeout(() => process.exit());
    });
}
