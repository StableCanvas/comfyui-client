import { BasePipe, Client } from "../../../src/main";
import { WebSocket } from "ws";
import { promises as fs } from "fs";
import path from "path";

const client = new Client({
  WebSocket,
});

async function main() {
  client.connect();

  const { images } = await new BasePipe()
    .with(client)
    .model("LOFI_V5.fp16.safetensors")
    .prompt("A beautiful sunset over the mountains")
    .negative("Low quality, blurry")
    .size(1024, 768)
    .steps(35)
    .cfg(5)
    .save()
    .wait();

  const img0 = Buffer.from(images[0].data);
  const filepath = path.join(__dirname, "../outputs", "pipe1-out.png");
  await fs.writeFile(filepath, img0);
}

main()
  .then(() => console.log("done"))
  .catch(console.error)
  .finally(() => client.close());
