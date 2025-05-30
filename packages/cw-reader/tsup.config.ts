import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/main.ts"],
  splitting: false,
  sourcemap: true,
  clean: true,
  format: ["cjs", "esm", "iife"],
  globalName: "WorkflowReader",
  // dts: true,
  experimentalDts: true,
});
