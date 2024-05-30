#!/usr/bin/env node

const types = require("@babel/types");
const generator = require("@babel/generator").default;
const fs = require("fs");
const path = require("path");

const { Command } = require("commander");
const program = new Command();

const prettier = require("prettier");

const exifr = require("exifr");

const node_types = require("./comfyui.node.types.json");

function generateCode(nodes) {
  // 初始化变量名计数器和输出映射
  const outputMap = {};
  const counter = {};

  const uniqueName = (name) => {
    counter[name] ||= 0;
    counter[name] += 1;
    return `${name}_${counter[name]}`;
  };

  // 创建一个AST节点数组，用来保存所有的表达式声明
  const astNodes = [];

  const sortedNodes = Object.entries(nodes).sort(
    ([aid], [bid]) => Number(aid) - Number(bid)
  );

  // 遍历节点，生成每个节点的代码
  for (const [nodeKey, nodeValue] of sortedNodes) {
    // 处理输入参数
    const inputs = nodeValue.inputs;
    const inputExpressions = Object.entries(inputs).map(
      ([inputKey, inputValue]) => {
        if (Array.isArray(inputValue)) {
          // 映射输出为变量名
          const refNodeKey = inputValue[0];
          const refOutputIndex = inputValue[1];
          const refVarName = outputMap[`${refNodeKey}_${refOutputIndex}`];

          return types.objectProperty(
            types.identifier(inputKey),
            types.identifier(refVarName)
          );
        } else {
          let val;
          switch (typeof inputValue) {
            case "string": {
              val = types.stringLiteral(inputValue);
              break;
            }
            case "number": {
              val = types.numericLiteral(inputValue);
              break;
            }
            case "boolean": {
              val = types.booleanLiteral(inputValue);
              break;
            }
            case "object": {
              if (inputValue !== null) {
                throw new Error("Wrong workflow");
              }
              val = types.nullLiteral();
              break;
            }
            default: {
              throw new Error("Wrong workflow");
            }
          }
          return types.objectProperty(types.identifier(inputKey), val);
        }
      }
    );

    // 创建输入对象表达式
    const inputObjectExpression = types.objectExpression(inputExpressions);

    // 处理输出参数
    const outputs = nodeValue.outputs;
    const outputIdentifiers = outputs.map((name, index) => {
      const varName = uniqueName(name);
      outputMap[`${nodeKey}_${index}`] = varName;
      return types.identifier(varName);
    });

    // 创建左侧的数组模式
    const leftArrayPattern = types.arrayPattern(outputIdentifiers);

    // 创建表达式声明
    const callExpression = types.callExpression(
      types.memberExpression(
        types.identifier("cls"),
        types.identifier(nodeValue.type)
      ),
      [inputObjectExpression]
    );

    const variableDeclarator = types.variableDeclarator(
      leftArrayPattern,
      callExpression
    );
    const variableDeclaration = types.variableDeclaration("const", [
      variableDeclarator,
    ]);

    astNodes.push(variableDeclaration);
  }

  // 使用 generator 将 AST 节点数组转换为代码字符串
  const codeFragments = astNodes.map((node) => generator(node).code);
  const generatedCode = codeFragments.join("\n");

  return generatedCode;
}

function loadNodesFromJsonFile(filename) {
  const { prompt } = JSON.parse(
    fs.readFileSync(path.resolve(filename)).toString()
  );

  return convert_prompt_to_inner_nodes(prompt);
}

async function loadNodesFromPngFile(filename) {
  const file = fs.readFileSync(path.resolve(filename));
  const params = await exifr.parse(file);
  const workflow = JSON.parse(params.workflow);

  // TODO ... workflow => prompt
}

const convert_prompt_to_inner_nodes = (prompt) => {
  const types = node_types.properties;
  const nodes = {};

  // key => max_output_len
  const outputs_mapping = {};

  for (const [k, v] of Object.entries(prompt)) {
    const node = {
      type: v.class_type,
      inputs: v.inputs,
      outputs: [],
    };

    const schema = types[v.class_type];
    if (schema?.properties?.outputs?.items) {
      node.outputs = schema.properties.outputs.items.map((x) => x.type);
    }

    nodes[k] = node;

    for (const val of Object.values(v.inputs)) {
      if (!Array.isArray(val)) continue;
      const [nid, arg_idx] = val;
      outputs_mapping[nid] = Math.max(outputs_mapping[nid] ?? 0, arg_idx + 1);
    }
  }

  for (const [nid, max_len] of Object.entries(outputs_mapping)) {
    const node = nodes[nid];
    if (node.outputs.length >= max_len) {
      continue;
    }
    for (let arg_idx = 0; arg_idx < max_len; arg_idx++) {
      if (node.outputs[arg_idx]) continue;
      node.outputs[arg_idx] = `OUT_${arg_idx}`;
    }
  }

  return nodes;
};

const default_tpl = {
  esm: path.join(__dirname, "./tpls/esm.js"),
  cjs: path.join(__dirname, "./tpls/cjs.js"),
  web: path.join(__dirname, "./tpls/web.js"),
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
