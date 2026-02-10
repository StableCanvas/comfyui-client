import { WorkflowOutput } from "../workflow/types";
import { arrayBufferToBase64 } from "./arrayBuffer";

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
          return arrayBufferToBase64(x.data);
        case "url":
          return fetch(x.data)
            .then((res) => res.blob())
            .then(async (blob) =>
              arrayBufferToBase64(await blob.arrayBuffer()),
            );
        default:
          // @ts-ignore
          throw new Error(`Unknown image type: ${x.type}`);
      }
    }),
  );
