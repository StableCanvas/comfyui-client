export * from "./client/WsClient";
export * from "./client/Client";
export * from "./workflow/Workflow";
export * from "./plugins/Plugin";
export * as plugins from "./plugins";
export * as builtins from "./builtins";
export * from "./pipeline";

export * from "./client/types";
export * from "./client/ws.types";
export * from "./client/response.types";

export * from "./workflow/types";
export * from "./pipeline/types";

import { WsClient } from "./client/WsClient";
import { Client } from "./client/Client";
import { Workflow } from "./workflow/Workflow";
import { Plugin } from "./plugins/Plugin";

/**
 * @deprecated use `Client` instead
 */
export const ComfyUIApiClient = Client;

/**
 * @deprecated use `WsClient` instead
 */
export const ComfyUIWsClient = WsClient;

/**
 * @deprecated use `Workflow` instead
 */
export const ComfyUIWorkflow = Workflow;

/**
 * @deprecated use `Plugin` instead
 */
export const ClientPlugin = Plugin;
