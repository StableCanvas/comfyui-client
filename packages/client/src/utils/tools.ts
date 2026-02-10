import { WorkflowOutput } from "../workflow/types";
import { arrayBufferToBase64 as a2b } from "./arrayBuffer";

const b64pkg = (b64: string, type: string) => `data:${type};base64,${b64}`;
const url2mime = (url: string) =>
  url.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg";

export const outToB64Urls = (
  result: WorkflowOutput,
  {
    fetch = globalThis.fetch,
  }: {
    fetch?: typeof globalThis.fetch;
  } = {},
): Promise<string[]> =>
  Promise.all(
    result.images.map((x) => {
      switch (x.type) {
        case "buff":
          return b64pkg(a2b(x.data), x.mime || "image/png");
        case "url":
          return fetch(x.data)
            .then((res) => res.blob())
            .then(async (blob) =>
              b64pkg(a2b(await blob.arrayBuffer()), url2mime(x.data)),
            );
        default:
          // @ts-ignore
          throw new Error(`Unknown image type: ${x.type}`);
      }
    }),
  );
