import * as fs from "fs";
import * as path from "path";
import { Command } from "commander";
import * as prettier from "prettier";
import packageJson from "../package.json";
import { ImageReader, JsonReader } from "@stable-canvas/cw-reader";
import {
  Transpiler,
  type TranspilerOptions,
} from "@stable-canvas/comfyui-client-transpiler";

const program = new Command();
const CODE_INJECTION_MARKER = "/** CODE INJECTION HERE */";
const default_tpl = {
  esm: path.join(__dirname, "../data/tpls/esm.txt"),
  ts: path.join(__dirname, "../data/tpls/ts.txt"),
  cjs: path.join(__dirname, "../data/tpls/cjs.txt"),
  web: path.join(__dirname, "../data/tpls/web.txt"),
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
  const extension = path.extname(file).toLowerCase();

  if (extension === ".json") {
    return workflowFromJson(file);
  }

  if (extension === ".png") {
    return workflowFromImage(file);
  }

  throw new Error(`unsupported input file type: ${extension || "(none)"}`);
};

const generateCodeFromFile = async (
  file: string,
  options?: TranspilerOptions,
) => {
  const workflow = await workflowFromFile(file);
  const transpiler = new Transpiler(workflow, options);
  return transpiler.toCode();
};

async function main() {
  program
    .name("cuc-w2c")
    .description(
      "Use this tool to generate the corresponding calling code using workflow",
    )
    .version(packageJson.version);

  program
    .requiredOption(
      "-i, --in <input>",
      "Specify the input file, support .json/.png file",
    )
    .option(
      "-t, --template <template>",
      "Specify the template for generating code, builtin tpl: [esm,ts,cjs,web,none]",
      "esm",
    )
    .option(
      "-o, --out <output>",
      "Specify the output file for the generated code. default to stdout",
    )
    .option(
      "--unicode-escape",
      "Escape non-ASCII characters as Unicode escape sequences",
    )
    .option("--debug", "Print the full error stack when code generation fails");

  program.parse();

  const {
    template: template_file,
    out: output_file,
    in: input_file,
    unicodeEscape,
  } = program.opts();

  if (
    ["esm", "ts", "cjs", "web", "none"].indexOf(template_file) === -1 &&
    !fs.existsSync(template_file)
  ) {
    throw new Error(`template file is not valid: ${template_file}`);
  }

  let generatedCode = await generateCodeFromFile(input_file, {
    unicodeEscape,
  });

  if (template_file && template_file !== "none") {
    const templatePath =
      default_tpl[template_file] ?? path.resolve(template_file);
    const templateContent = fs.readFileSync(templatePath, "utf-8");
    if (!templateContent.includes(CODE_INJECTION_MARKER)) {
      throw new Error(
        `template does not contain ${CODE_INJECTION_MARKER}: ${templatePath}`,
      );
    }
    generatedCode = templateContent.replace(
      CODE_INJECTION_MARKER,
      () => generatedCode,
    );
  }

  // format
  const parser =
    template_file === "ts" ||
    template_file?.toLowerCase().endsWith(".ts") ||
    output_file?.toLowerCase().endsWith(".ts")
      ? "typescript"
      : "babel";
  generatedCode = await prettier.format(generatedCode, {
    parser,
    semi: true,
    singleQuote: false,
    tabWidth: 2,
  });

  if (output_file) {
    const inputPath = path.resolve(input_file);
    const outputPath = path.resolve(output_file);
    if (inputPath === outputPath) {
      throw new Error("output file cannot overwrite the input file");
    }
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, generatedCode, "utf-8");
    console.log(`Code has been written to ${outputPath}`);
  } else {
    process.stdout.write(generatedCode);
  }
}

main().catch((err) => {
  const message = err instanceof Error ? err.message : String(err);
  console.error(`ERR: ${message}`);
  if (process.argv.includes("--debug") && err instanceof Error && err.stack) {
    console.error(err.stack);
  }
  process.exitCode = 1;
});
