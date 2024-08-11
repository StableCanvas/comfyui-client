import { WorkflowOutputResolver } from "./client.types";
import { isNone } from "./misc";
import { WorkflowOutput } from "./types";

export const RESOLVERS = {
  image: ((acc, output, { client }) => {
    const output_images: {
      filename?: string;
      subfolder?: string;
      type: string;
    }[] = (output.images || []) as any;

    const images_url = output_images
      .map((image) => {
        const { filename, subfolder, type } = image;
        if (isNone(filename) || isNone(subfolder) || type !== "output") {
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
