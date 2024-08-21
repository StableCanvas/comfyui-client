import { Project, Writers } from "ts-morph";
import fs from "fs";
import path from "path";
import url from "url";

// 非法变量名
const INVALID_VARIABLE_NAME = /^a-zA-Z|[\. \-*/+~]/;
const VAR = (name) => (INVALID_VARIABLE_NAME.test(name) ? `["${name}"]` : name);

function addInterface(nodeName, nodeSchema, namespace) {
  const nodeInterface = namespace.addInterface({
    name: nodeName,
    isExported: true,
  });

  if (nodeSchema.properties.inputs) {
    nodeInterface.addProperty({
      name: "inputs",
      type: `{
            ${Object.entries(nodeSchema.properties.inputs.properties)
              .map(
                ([inputName, inputSchema]) =>
                  `${INVALID_VARIABLE_NAME.test(inputName) ? `["${inputName}"]` : inputName}: ${getTypeFromSchema(inputSchema)};`
              )
              .join("\n")}
            [k: string]: unknown;
          }`,
      hasQuestionToken: true,
      docs: [
        {
          description: "\n" + nodeSchema.properties.inputs.description,
        },
      ],
    });
  } else {
    nodeInterface.addProperty({
      name: "inputs",
      type: "{ [k: string]: unknown }",
      hasQuestionToken: true,
    });
  }

  let output_types = "";
  let output_desc = "NO_OUTPUTS";
  if (nodeSchema.properties.outputs) {
    output_types = Array.from(nodeSchema.properties.outputs.items || [])
      .map(() => `unknown`)
      .join(", ");
    output_desc = "\n" + nodeSchema.properties.outputs.description;
  }
  nodeInterface.addProperty({
    name: "outputs",
    type: `[${output_types}]`,
    hasQuestionToken: true,
    docs: [
      {
        description: output_desc,
      },
    ],
  });

  nodeInterface.addIndexSignature({
    keyName: "k",
    keyType: "string",
    returnType: "unknown",
  });
}

function generateTypes(inputSchema) {
  const project = new Project();
  const sourceFile = project.createSourceFile("generated.ts", "", {
    overwrite: true,
  });

  const namespace = sourceFile.addModule({
    name: "ComfyUINodeTypes",
    isExported: true,
  });

  const nodeTypesInterface = namespace.addInterface({
    name: "NodeTypes",
    isExported: true,
  });

  for (const [nodeName, nodeSchema] of Object.entries(inputSchema.properties)) {
    const interfaceName = nodeName.replace(
      /[ \-+=|:{}\(\)\]\[\/\\><@#%,'.?!]/g,
      "_"
    );

    try {
      nodeTypesInterface.addProperty({
        name: INVALID_VARIABLE_NAME.test(nodeName)
          ? `["${nodeName}"]`
          : nodeName,
        type: `ComfyUINodeTypes["${interfaceName}"]`,
        type: interfaceName,
        hasQuestionToken: true,
      });
    } catch (error) {
      console.error(error);
      console.log(nodeName, nodeSchema);
      process.exit(1);
    }

    try {
      addInterface(interfaceName, nodeSchema, namespace);
    } catch (error) {
      console.error(error);
      console.log(nodeName, nodeSchema);
      process.exit(1);
    }
  }

  return sourceFile.getFullText();
}

function getTypeFromSchema(schema) {
  switch (schema.type) {
    case "string":
      return "string";
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    case "object":
      return "{ [k: string]: unknown }";
    default:
      return "unknown";
  }
}

const [
  input_node_types_json_file_path = "./scripts/data/comfyui.node.types.json",
] = process.argv.slice(2);

if (!fs.existsSync(input_node_types_json_file_path)) {
  console.error(`File not found: ${input_node_types_json_file_path}`);
  process.exit(1);
}

const inputSchema = JSON.parse(
  fs.readFileSync(input_node_types_json_file_path, "utf-8")
);

try {
  console.time("generateTypes");
  const generatedCode = generateTypes(inputSchema);
  console.timeEnd("generateTypes");
  const __dirname =
    globalThis.__dirname || path.dirname(url.fileURLToPath(import.meta.url));
  fs.writeFileSync(
    path.resolve(__dirname, "../src/schema/comfyui.node.types.ts"),
    generatedCode
  );
  console.log(
    "Types generated successfully. Check ./src/schema/comfyui.node.types.ts"
  );
} catch (error) {
  console.error(error);
  process.exit(1);
}
