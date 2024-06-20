import { WorkflowCodeGenerator } from "./Generator";
import { JsonLoader } from "./JsonLoader";
import { CUIWorkflow } from "./Workflow";

import * as path from "path";

const main = async () => {
  const loader = new JsonLoader();
  const wk = loader.loadFromFile(
    path.join(__dirname, "../data/workflow-min.json")
  );

  const generator = new WorkflowCodeGenerator();

  const code = generator.generate(wk);

  console.log(code);
};

main()
  .then(() => {
    console.log("done");
  })
  .catch((e) => {
    console.error(e);
  });
