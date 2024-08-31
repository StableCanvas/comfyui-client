import type { CachedFnOptions } from "./CachedFn";

export interface IComfyApiConfig {
  /**
   * The host address of the API server, defaults to '127.0.0.1:8188'.
   * @type {string} [api_host="127.0.0.1:8188"]
   */
  api_host?: string;

  /**
   * The base path for the API endpoints, default is an empty string.
   * @type {string} [api_base=""]
   */
  api_base?: string;

  /**
   * The client identification string, default is an empty string.
   * @type {string} [clientId=""]
   */
  clientId?: string;

  /**
   * The name of the session, used for identifying the session instance, default is an empty string.
   * @type {string} [sessionName=""]
   */
  sessionName?: string;

  /**
   * The username for authentication, default is 'sc-comfy-ui-client'.
   * @type {string} [user="""]
   */
  user?: string;

  /**
   * Whether to use SSL for the connections, defaults to false.
   * @type {boolean} [ssl=false]
   */
  ssl?: boolean;

  /**
   * These settings are for compatibility with Node.js environments.
   * @type {typeof WebSocket} [WebSocket] - The WebSocket class to use.
   */
  WebSocket?: typeof WebSocket;
  /**
   * These settings are for compatibility with Node.js environments.
   * @type {typeof fetch} [fetch] - The fetch function to use.
   */
  fetch?: typeof fetch;

  cache?: CachedFnOptions;
}

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
