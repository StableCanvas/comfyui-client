import { EfficientPipe, Client } from "../../../src/main";
import { WebSocket } from "ws";
import { promises as fs } from "fs";
import path from "path";
import { runDemo } from "./utils";

const client = new Client({
  WebSocket,
});

async function main() {
  client.connect();

  const input_image = await fs.readFile(
    path.join(__dirname, "../inputs", "input1.jpg"),
  );

  const { images } = await new EfficientPipe()
    .with(client)
    .model("case-h-beta.baked.fp16.safetensors")
    .image(input_image)
    .prompt("furry, A husky girl with pearls, oil painting style")
    .negative("low quality, blurry")
    .size(640, 960)
    .steps(35)
    .cfg(5)
    .denoise(0.6)
    .cnet("control_v11p_sd15_openpose.pth", input_image)
    .seed()
    .save()
    .wait();

  const img0 = Buffer.from(images[0].data);
  const filepath = path.join(__dirname, "../outputs", "pipe-eff-cnet-out1.png");
  await fs.writeFile(filepath, img0);
}

runDemo(main, client);
