import { ImageReader } from "./src/main";
import fs from "fs";

(async () => {
  const file1 = await fs.promises.readFile("./tests/img2img_workflow.png");
  const reader = new ImageReader(file1.buffer);
  const workflow = await reader.getWorkflowJson();
  await fs.promises.writeFile(
    "./img2img_workflow.json",
    JSON.stringify(workflow, null, 2),
  );
})().catch(console.error);
