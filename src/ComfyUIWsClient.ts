import { IComfyApiConfig } from "./types";
import { EventEmitter } from "eventemitter3";
import { version } from "../package.json";

type ComfyUIClientEvents = {
  // TODO: Add types for these events
  status: any;
  progress: any;
  executing: any;
  executed: any;
  execution_start: any;
  execution_error: any;
  execution_cached: any;
  reconnected: any;
  reconnecting: any;
  b_preview: any;

  message: any;
};

export class ComfyUIWsClient extends EventEmitter<ComfyUIClientEvents> {
  static DEFAULT_API_HOST = "127.0.0.1:8188";
  static DEFAULT_API_BASE = "";
  static DEFAULT_SESSION_NAME = "";
  static DEFAULT_USER = "comfy-client";

  api_host: string;
  api_base: string;
  clientId?: string;
  sessionName: string;
  socket?: WebSocket | null;
  WebSocket: typeof WebSocket;
  ssl: boolean;
  user: string;
  fetch: typeof fetch;

  readonly IS_BROWSER = typeof window !== "undefined";

  protected registered = new Set();

  constructor(config: IComfyApiConfig) {
    super();
    this.api_host = config.api_host ?? ComfyUIWsClient.DEFAULT_API_HOST;
    this.api_base = config.api_base ?? ComfyUIWsClient.DEFAULT_API_BASE;
    this.clientId = config.clientId;
    this.sessionName =
      config.sessionName ?? ComfyUIWsClient.DEFAULT_SESSION_NAME;
    this.WebSocket = config.WebSocket ?? WebSocket;
    this.ssl = config.ssl ?? false;
    this.user = config.user ?? ComfyUIWsClient.DEFAULT_USER;
    this.fetch = config.fetch ?? fetch;
  }

  apiURL(route: string): string {
    return `http${this.ssl ? "s" : ""}://${this.api_host}${
      this.api_base
    }${route}`;
  }

  async fetchApi(route: string, options?: RequestInit): Promise<Response> {
    if (!this.closed) {
      throw new Error("Client is closed");
    }
    const headers: HeadersInit = {
      "Comfy-User": this.user,
      // "User-Agent": `ComfyUIClient/${version}`,
      Accept: "*/*",
      ...(options?.headers ?? {}),
    };

    const url = this.apiURL(route);
    return this.fetch(url, {
      ...options,
      headers,
    });
  }

  addEventListener(
    type: keyof ComfyUIClientEvents | (string & {}),
    callback: (...args: any) => void,
    options: any
  ) {
    super.on(type as any, callback, options);
    this.registered.add(type);
  }

  /**
   * Poll status  for colab and other things that don't support websockets.
   */
  private pollQueue() {
    setInterval(async () => {
      try {
        const resp = await this.fetchApi("/prompt");
        const status = await resp.json();
        this.emit("status", status);
      } catch (error) {
        this.emit("status", null);
      }
    }, 1000);
  }

  /**
   * Creates and connects a WebSocket for realtime updates
   * @param {boolean} isReconnect If the socket is connection is a reconnect attempt
   */
  private createSocket(isReconnect = false) {
    if (this.socket) {
      return;
    }

    let opened = false;
    this.socket = new this.WebSocket(
      `ws${this.ssl ? "s" : ""}://${this.api_host}${this.api_base}/ws${
        this.sessionName ?? ""
      }`
    );
    this.socket.binaryType = "arraybuffer";

    this.socket.addEventListener("open", () => {
      opened = true;
      if (isReconnect) {
        this.emit("reconnected");
      }
    });

    this.socket.addEventListener("error", () => {
      if (this.socket) this.socket.close();
      if (!isReconnect && !opened) {
        this.pollQueue();
      }
    });

    this.socket.addEventListener("close", () => {
      setTimeout(() => {
        this.socket = null;
        this.createSocket(true);
      }, 300);
      if (opened) {
        this.emit("status", null);
        this.emit("reconnecting");
      }
    });

    const isImageMessage = (event: MessageEvent) => {
      if (this.IS_BROWSER) {
        return event.data instanceof Blob;
      } else {
        return Buffer.isBuffer(event.data);
      }
    };

    this.socket.addEventListener("message", (event) => {
      try {
        if (isImageMessage(event)) {
          const view = new DataView(event.data);
          const eventType = view.getUint32(0);
          const buffer = event.data.slice(4);
          switch (eventType) {
            case 1:
              const view2 = new DataView(event.data);
              const imageType = view2.getUint32(0);
              let imageMime;
              switch (imageType) {
                case 1:
                default:
                  imageMime = "image/jpeg";
                  break;
                case 2:
                  imageMime = "image/png";
              }
              const image = this.IS_BROWSER
                ? new Blob([buffer.slice(4)], {
                    type: imageMime,
                  })
                : buffer;
              this.emit("b_preview", image);
              break;
            default:
              throw new Error(
                `Unknown binary websocket message of type ${eventType}`
              );
          }
        } else {
          const msg = JSON.parse(event.data);
          this.emit("message", msg);

          switch (msg.type) {
            case "status":
              if (msg.data.sid) {
                this.clientId = msg.data.sid;
              }
              this.emit("status", msg.data.status);
              break;
            case "progress":
              this.emit("progress", msg.data);
              break;
            case "executing":
              this.emit("executing", msg.data);
              break;
            case "executed":
              this.emit("executed", msg.data);
              break;
            case "execution_start":
              this.emit("execution_start", msg.data);
              break;
            case "execution_error":
              this.emit("execution_error", msg.data);
              break;
            case "execution_cached":
              this.emit("execution_cached", msg.data);
              break;
            default:
              if (this.registered.has(msg.type)) {
                this.emit(msg.type, msg.data);
              } else {
                throw new Error(`Unknown message type ${msg.type}`);
              }
          }
        }
      } catch (error) {
        console.warn("Unhandled message:", event.data, error);
      }
    });
  }

  /**
   * Initializes sockets and realtime updates
   */
  init() {
    this.createSocket();
  }

  closed = false;
  /**
   * Closes the WebSocket connection and cleans up event listeners
   */
  close() {
    if (this.closed) {
      return;
    }
    this.closed = true;
    if (this.socket) {
      if (this.socket.readyState === this.WebSocket.OPEN) {
        this.socket.close(1000, "Client closed");
      }
      if ("removeAllListeners" in this.socket) {
        (this.socket.removeAllListeners as any)?.();
      }
      this.socket = null;
    }
    this.removeAllListeners();
  }
}
