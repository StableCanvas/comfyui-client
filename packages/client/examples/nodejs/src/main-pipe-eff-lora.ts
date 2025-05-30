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

  const { images } = await new EfficientPipe()
    .with(client)
    .model("LOFI_V5.fp16.safetensors")
    .prompt("A beautiful sunset over the mountains")
    .negative("Low quality, blurry")
    .size(1024, 768)
    .steps(35)
    .cfg(5)
    .lora("LowRA.safetensors")
    .lora("add_detail.safetensors")
    .seed()
    .save()
    .wait();

  const img0 = Buffer.from(images[0].data);
  const filepath = path.join(__dirname, "../outputs", "pipe-eff-lora-out1.png");
  await fs.writeFile(filepath, img0);
}

runDemo(main, client);
