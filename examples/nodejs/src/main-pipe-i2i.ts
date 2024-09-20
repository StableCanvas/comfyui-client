import { BasePipe, Client } from "../../../src/main";
import { WebSocket } from "ws";
import { promises as fs } from "fs";
import path from "path";

const client = new Client({
  WebSocket,
});

async function main() {
  client.connect();

  const input_image = await fs.readFile(
    path.join(__dirname, "../inputs", "input1.jpg"),
  );

  const { images } = await new BasePipe()
    .with(client)
    .model("sdxl\\Juggernaut-X-RunDiffusion-NSFW.safetensors")
    .image(input_image)
    .prompt("A husky with pearls, oil painting style")
    .negative("low quality, blurry")
    .size(640, 960)
    .steps(35)
    .cfg(7)
    .denoise(0.5)
    .save()
    .on("progress", (progress) => {
      console.log(progress);
    })
    .wait();

  const img0 = Buffer.from(images[0].data);
  const filepath = path.join(__dirname, "../outputs", "pipe2-out.png");
  await fs.writeFile(filepath, img0);
}

main()
  .then(() => console.log("done"))
  .catch(console.error)
  .finally(() => client.close());
