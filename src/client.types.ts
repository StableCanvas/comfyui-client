import { ComfyUIApiClient } from "./ComfyUIApiClient";

import { WorkflowOutput } from "./types";
import { ComfyUiWsTypes } from "./ws.typs";

export type WorkflowOutputResolver<T = unknown> = (
  acc: WorkflowOutput<T>,
  output: Record<string, unknown>,
  ctx: { client: ComfyUIApiClient; prompt_id: string; node_id: string }
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
