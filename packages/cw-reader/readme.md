# cw-reader

ComfyUI Workflow Reader

```
npm install @stable-canvas/cw-reader
```

# Usage

- NodeJS

```ts
import { ImageReader } from "@stable-canvas/cw-reader";
const file1 = await fs.promises.readFile("./tests/img2img_workflow.png");
const reader = new ImageReader(file1.buffer);
const workflow = await reader.getWorkflowJson();
await fs.promises.writeFile(
  "./img2img_workflow.json",
  JSON.stringify(workflow, null, 2),
);
```

- ESM

```html
<input type="file" accept="image/*" />
<pre><code id="output">// Output will appear here</code></pre>

<script type="module">
  import { ImageReader } from "https://esm.run/@stable-canvas/cw-reader";

  const fileInput = dropZone.querySelector("input");
  const output = document.getElementById("output");

  async function handleFile(file) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const reader = new ImageReader(arrayBuffer);
      const workflow = await reader.getWorkflowJson();
      output.textContent = JSON.stringify(workflow, null, 2);
    } catch (err) {
      output.textContent = `Error: ${err.message}`;
    }
  }
</script>
```
