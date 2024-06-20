import * as fs from "fs";
import * as path from "path";
import { Command } from "commander";
import * as prettier from "prettier";

const program = new Command();
const default_tpl = {
  esm: path.join(__dirname, "../data/tpls/esm.js"),
  cjs: path.join(__dirname, "../data/tpls/cjs.js"),
  web: path.join(__dirname, "../data/tpls/web.js"),
};

async function main() {
  program
    .name("nodejs-comfy-ui-client-code-gen")
    .description(
      "Use this tool to generate the corresponding calling code using workflow"
    )
    .version("0.8.0");

  program
    .option(
      "-t, --template [template]",
      "Specify the template for generating code, builtin tpl: [esm,cjs,web,none]",
      "esm"
    )
    .option(
      "-o, --out [output]",
      "Specify the output file for the generated code"
    )
    .option("-i, --in <input>", "Specify the input file, support .json file");

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

  if (input_file.endsWith(".png")) {
    console.error("ERR: png input is not support");
    process.exit(1);
  }

  console.error("Working progress...");
  process.exit(1);

  const nodes = await (input_file.endsWith(".png")
    ? loadNodesFromPngFile(input_file)
    : loadNodesFromJsonFile(input_file));

  // console.log(JSON.stringify(nodes, null, 2));
  // process.exit();

  let generatedCode = generateCode(nodes);

  if (template_file && template_file !== "none") {
    const templatePath =
      default_tpl[template_file] ?? path.resolve(template_file);
    const templateContent = fs.readFileSync(templatePath, "utf-8");
    generatedCode = templateContent.replace(
      "/** CODE INJECTION HERE */",
      generatedCode
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
