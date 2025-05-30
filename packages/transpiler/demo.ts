import { ImageReader } from "@stable-canvas/cw-reader";
import { Transpiler } from "./src/main";
import fs from "fs";

(async () => {
  const file1 = await fs.promises.readFile("./tests/img2img_workflow.png");
  const reader = new ImageReader(file1.buffer);
  const workflow = await reader.getWorkflow();
  const transpiler = new Transpiler(workflow);
  const code = transpiler.toCode();
  await fs.promises.writeFile("./demo_output.ts", code, {
    encoding: "utf-8",
  });
  console.log(`Output to ${process.cwd()}/demo_output.ts`);
  // console.log(code);
})().catch(console.error);
