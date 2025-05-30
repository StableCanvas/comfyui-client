import * as fs from "fs";
import * as path from "path";
import { Command } from "commander";
import * as prettier from "prettier";
import { ImageReader, JsonReader } from "@stable-canvas/cw-reader";
import { Transpiler } from "@stable-canvas/comfyui-client-transpiler";

const program = new Command();
const default_tpl = {
  esm: path.join(__dirname, "../data/tpls/esm.js"),
  cjs: path.join(__dirname, "../data/tpls/cjs.js"),
  web: path.join(__dirname, "../data/tpls/web.js"),
} as Record<string, string>;

const workflowFromJson = async (filepath: string) => {
  if (!fs.existsSync(filepath)) {
    throw new Error("file not exists: " + filepath);
  }
  const jsonObj = JSON.parse(fs.readFileSync(filepath, "utf-8"));
  const reader = new JsonReader(jsonObj);
  return reader.getWorkflow();
};

const workflowFromImage = async (filepath: string) => {
  if (!fs.existsSync(filepath)) {
    throw new Error("file not exists: " + filepath);
  }
  const file = fs.readFileSync(filepath);
  const reader = new ImageReader(file.buffer);
  const workflow = await reader.getWorkflow();
  return workflow;
};

const workflowFromFile = async (file: string) => {
  if (file.endsWith(".json")) {
    return workflowFromJson(file);
  } else {
    return workflowFromImage(file);
  }
};

const generateCodeFromFile = async (file: string) => {
  const workflow = await workflowFromFile(file);
  const transpiler = new Transpiler(workflow);
  return transpiler.toCode();
};

async function main() {
  program
    .name("nodejs-comfy-ui-client-code-gen")
    .description(
      "Use this tool to generate the corresponding calling code using workflow",
    )
    .version("0.8.0");

  program
    .option(
      "-t, --template [template]",
      "Specify the template for generating code, builtin tpl: [esm,cjs,web,none]",
      "esm",
    )
    .option(
      "-o, --out [output]",
      "Specify the output file for the generated code. default to stdout",
    )
    .option(
      "-i, --in <input>",
      "Specify the input file, support .json/.png file",
    );

  program.parse();

  const {
    template: template_file,
    out: output_file,
    in: input_file,
  } = program.opts();

  if (!input_file) {
    console.error("ERR: input file is required");
    process.exit(1);
  }

  if (
    ["esm", "cjs", "web", "none"].indexOf(template_file) === -1 &&
    !fs.existsSync(template_file)
  ) {
    console.error("ERR: template file is not valid");
    process.exit(1);
  }

  let generatedCode = await generateCodeFromFile(input_file);

  if (template_file && template_file !== "none") {
    const templatePath =
      default_tpl[template_file] ?? path.resolve(template_file);
    const templateContent = fs.readFileSync(templatePath, "utf-8");
    generatedCode = templateContent.replace(
      "/** CODE INJECTION HERE */",
      generatedCode,
    );
  }

  // format
  generatedCode = await prettier.format(generatedCode, {
    parser: "babel",
    semi: true,
    singleQuote: false,
    tabWidth: 2,
  });

  if (output_file) {
    const outputPath = path.resolve(output_file);
    fs.writeFileSync(outputPath, generatedCode, "utf-8");
    console.log(`Code has been written to ${outputPath}`);
  } else {
    console.log(generatedCode);
  }
}

main().catch((err) => {
  console.error(err);
});
