export type WorkflowOutput<D = unknown> = {
  images: (
    | {
        type: "buff";
        data: ArrayBuffer;
        mime: string;
      }
    | {
        type: "url";
        data: string;
      }
  )[];
  prompt_id: string;

  /**
   * Allows for a custom resolver to be provided.
   *
   * The custom resolver can parse non-image data into the `data` property, supporting generics.
   *
   * Related: https://github.com/StableCanvas/comfyui-client/issues/10
   */
  data?: D;
};
export interface IWorkflow {
  // id => node
  prompt: Record<string, WorkflowPromptNode>;

  // TODO
  workflow?: {
    nodes: [];
    links: [];
    groups: [];
    config: {};
    extra: {};
    version: 0.4;
  };
}
export type WorkflowPromptNode = {
  class_type: string;
  inputs: Record<string, any>;
};
