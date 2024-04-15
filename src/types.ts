export interface IComfyApiConfig {
  api_host?: string;
  api_base?: string;
  clientId?: string;
  sessionName?: string;
  user?: string;

  ssl?: boolean;

  // nodejs compatible
  WebSocket?: typeof WebSocket;
  fetch?: typeof fetch;
}
