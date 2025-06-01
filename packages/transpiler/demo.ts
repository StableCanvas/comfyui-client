import { ImageReader, JsonReader } from "@stable-canvas/cw-reader";
import { Transpiler } from "./src/main";
import fs from "fs";

// ## From Workflow API Format
(async () => {
  const file1 = await fs.promises.readFile("./tests/workflow-min.json");
  const reader = new JsonReader(JSON.parse(file1.toString("utf-8")));
  const workflow = await reader.getWorkflow();
  const transpiler = new Transpiler(workflow);
  const code = transpiler.toCode();
  await fs.promises.writeFile("./demo_output.ts", code, {
    encoding: "utf-8",
  });
  console.log(`Output to ${process.cwd()}/demo_output.ts`);
  // console.log(code);
})().catch(console.error);

// ## From Workflow png file
// (async () => {
//   const file1 = await fs.promises.readFile("./tests/img2img_workflow.png");
//   const reader = new ImageReader(file1.buffer);
//   const workflow = await reader.getWorkflow();
//   const transpiler = new Transpiler(workflow);
//   const code = transpiler.toCode();
//   await fs.promises.writeFile("./demo_output.ts", code, {
//     encoding: "utf-8",
//   });
//   console.log(`Output to ${process.cwd()}/demo_output.ts`);
//   // console.log(code);
// })().catch(console.error);
