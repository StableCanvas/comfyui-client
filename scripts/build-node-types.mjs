import { Project, Writers } from "ts-morph";
import fs from "fs";
import path from "path";
import url from "url";

// 非法变量名
const INVALID_VARIABLE_NAME = /^a-zA-Z|[\. \-*/+~]/;

function generateTypes(inputSchema) {
  const project = new Project();
  const sourceFile = project.createSourceFile("generated.ts", "", {
    overwrite: true,
  });

  // 创建 namespace
  const namespace = sourceFile.addModule({
    name: "ComfyUINodeTypes",
    isExported: true,
  });

  // 添加 NodeTypes 接口
  const nodeTypesInterface = namespace.addInterface({
    name: "NodeTypes",
    isExported: true,
  });

  // 为每个节点类型添加属性和接口
  for (const [nodeName, nodeSchema] of Object.entries(inputSchema.properties)) {
    // 向 NodeTypes 接口添加属性
    nodeTypesInterface.addProperty({
      name: nodeName,
      type: nodeName,
      hasQuestionToken: true,
    });

    // 为每个节点类型创建接口
    const nodeInterface = namespace.addInterface({
      name: nodeName,
      isExported: true,
    });

    // 添加 inputs 属性
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
    }

    // 添加 outputs 属性
    if (nodeSchema.properties.outputs) {
      const type = Array.from(nodeSchema.properties.outputs.items || [])
        .map(() => `unknown`)
        .join(", ");
      nodeInterface.addProperty({
        name: "outputs",
        type: `[${type}]`,
        hasQuestionToken: true,
        docs: [
          {
            description: "\n" + nodeSchema.properties.outputs.description,
          },
        ],
      });
    }

    // 添加索引签名
    nodeInterface.addIndexSignature({
      keyName: "k",
      keyType: "string",
      returnType: "unknown",
    });
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
