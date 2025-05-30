import { Client } from "./Client";

import { WorkflowOutput } from "../workflow/types";
import { ComfyUiWsTypes } from "./ws.types";
import type { CachedFnOptions } from "../utils/CachedFn";

export type WorkflowOutputResolver<T = unknown> = (
  acc: WorkflowOutput<T>,
  output: Record<string, unknown>,
  ctx: { client: Client; prompt_id: string; node_id: string },
) => WorkflowOutput<T>;
export type EnqueueOptions<T = unknown> = {
  /**
   * this data for PNG info
   */
  workflow?: Record<string, unknown>;
  disable_random_seed?: boolean;
  progress?: (p: ComfyUiWsTypes.Messages.Progress) => void;
  resolver?: WorkflowOutputResolver<T>;
  polling_ms?: number;
};
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
