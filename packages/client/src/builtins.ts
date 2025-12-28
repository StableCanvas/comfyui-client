import { WorkflowOutputResolver } from "./client/types";
import { isNone } from "./utils/misc";
import { WorkflowOutput } from "./workflow/types";

export const RESOLVERS = {
  image: ((acc, output, { client }) => {
    if (output === null || output === undefined) {
      return acc;
    }

    const output_images: {
      filename?: string;
      subfolder?: string;
      type: string;
    }[] = (output?.images || []) as any;

    const images_url = output_images
      .map((image) => {
        const { filename, subfolder, type } = image;
        const type_should_be = [
          // SaveImage node output as "output"
          "output",
          // PreviewImage node output as "temp"
          "temp",
        ];
        if (
          isNone(filename) ||
          isNone(subfolder) ||
          !type_should_be.includes(type)
        ) {
          return null;
        }
        return client.viewURL(filename, subfolder, type);
      })
      .filter(Boolean) as string[];

    const images = images_url.map((image) => ({
      type: "url" as const,
      data: image,
    }));
    return {
      ...acc,
      images: [...acc.images, ...images],
    };
  }) as WorkflowOutputResolver<WorkflowOutput>,
};
