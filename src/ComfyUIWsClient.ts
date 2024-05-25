import { IComfyApiConfig } from "./types";
import { EventEmitter } from "eventemitter3";

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

/**
 * A client for interacting with the ComfyUI API server using WebSockets.
 *
 * @example
 * ```typescript
 * const client = new ComfyUIWsClient({
 *  api_host: "YOUR_API_HOST"
 * });
 *
 * // Connect to the server
 * client.connect();
 *
 * // Listen for status updates
 * client.on("status", (status) => {
 *   console.log("Status:", status);
 * });
 *
 * // when done, close the client
 * client.close();
 */
export class ComfyUIWsClient {
  static DEFAULT_API_HOST = "127.0.0.1:8188";
  static DEFAULT_API_BASE = "";
  static DEFAULT_SESSION_NAME = "";
  static DEFAULT_USER = "";

  api_host: string;
  api_base: string;
  clientId?: string;
  sessionName: string;
  socket?: WebSocket | null;
  WebSocket: typeof WebSocket;
  ssl: boolean;
  user: string;
  fetch: typeof fetch;

  events: EventEmitter<ComfyUIClientEvents> = new EventEmitter();

  readonly IS_BROWSER = typeof window !== "undefined";

  protected registered = new Set();

  protected socket_callbacks: Record<string, any> = {};

  constructor(config: IComfyApiConfig) {
    this.api_host = config.api_host ?? ComfyUIWsClient.DEFAULT_API_HOST;
    this.api_base = config.api_base ?? ComfyUIWsClient.DEFAULT_API_BASE;
    this.clientId = config.clientId;
    this.sessionName =
      config.sessionName ?? ComfyUIWsClient.DEFAULT_SESSION_NAME;
    this.WebSocket = config.WebSocket ?? WebSocket;
    this.ssl = config.ssl ?? false;
    this.user = config.user ?? ComfyUIWsClient.DEFAULT_USER;
    if (!globalThis.fetch) {
      throw new Error("fetch is not defined");
    }
    this.fetch = config.fetch ?? globalThis.fetch.bind(globalThis);
  }

  /**
   * Generates the URL for the API endpoint based on the provided route.
   *
   * @param {string} route - The route for the API endpoint.
   * @return {string} The generated URL for the API endpoint.
   */
  apiURL(route: string): string {
    return `http${this.ssl ? "s" : ""}://${this.api_host}${
      this.api_base
    }${route}`;
  }

  /**
   * Fetches API data based on the provided route and options.
   *
   * @param {string} route - The route for the API request.
   * @param {RequestInit} [options] - (Optional) Additional options for the request.
   * @return {Promise<Response>} A promise that resolves to the API response.
   */
  async fetchApi(route: string, options?: RequestInit): Promise<Response> {
    if (this.closed) {
      throw new Error("Client is closed");
    }
    const headers: HeadersInit = {
      // NOTE: CORS policy: Request header field comfy-user is not allowed by Access-Control-Allow-Headers in preflight response.
      // 因为 ComfyUI 没有配置 Access-Control-Allow-Headers 包含这个 comfy-user 所以在浏览器中请使用空白
      ...(this.user
        ? {
            "Comfy-User": this.user,
          }
        : {}),
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

  /**
   * Adds an event listener for the specified event type.
   *
   * @param {keyof ComfyUIClientEvents | (string & {})} type - The type of event to listen for.
   * @param {(...args: any) => void} callback - The callback function to be executed when the event is triggered.
   * @param {any} options - (Optional) Additional options for the event listener.
   * @return {() => void} A function that removes the event listener when called.
   */
  addEventListener(
    type: keyof ComfyUIClientEvents | (string & {}),
    callback: (...args: any) => void,
    options: any
  ) {
    this.events.on(type as any, callback, options);
    this.registered.add(type);

    return () => {
      this.events.off(type as any, callback);
      this.registered.delete(type);
    };
  }

  /**
   * Adds an event listener for the specified event type.
   *
   * @param {keyof ComfyUIClientEvents | (string & {})} type - The type of event to listen for.
   * @param {(...args: any) => void} callback - The callback function to be executed when the event is triggered.
   * @param {any} options - (Optional) Additional options for the event listener.
   * @return {() => void} A function that removes the event listener when called.
   */
  on(
    type: keyof ComfyUIClientEvents | (string & {}),
    callback: (...args: any) => void,
    options: any
  ) {
    return this.addEventListener(type, callback, options);
  }

  /**
   * Poll status  for colab and other things that don't support websockets.
   */
  private pollQueue() {
    setInterval(async () => {
      try {
        const resp = await this.fetchApi("/prompt");
        const status = await resp.json();
        this.events.emit("status", status);
      } catch (error) {
        this.events.emit("status", null);
      }
    }, 1000);
  }

  protected addSocketCallback<K extends keyof WebSocketEventMap>(
    socket: WebSocket,
    type: K,
    listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ) {
    this.socket_callbacks[type] = listener;
    socket.addEventListener(type, listener, options);
    return () => {
      delete this.socket_callbacks[type];
      socket.removeEventListener(type, listener, options);
    };
  }

  /**
   * Removes all event listeners from the given WebSocket and clears the socket_callbacks object.
   */
  protected removeSocketCallbacks() {
    if (this.socket) {
      for (const type in this.socket_callbacks) {
        const listener = this.socket_callbacks[type];
        this.socket.removeEventListener(type, listener);
      }
    }
    this.socket_callbacks = {};
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

    this.addSocketCallback(this.socket, "open", () => {
      opened = true;
      if (isReconnect) {
        this.events.emit("reconnected");
      }
    });

    this.addSocketCallback(this.socket, "error", () => {
      if (this.socket) this.socket.close();
      if (!isReconnect && !opened) {
        this.pollQueue();
      }
    });

    this.addSocketCallback(this.socket, "close", () => {
      setTimeout(() => {
        this.socket = null;
        this.createSocket(true);
      }, 300);
      if (opened) {
        this.events.emit("status", null);
        this.events.emit("reconnecting");
      }
    });

    const isImageMessage = (event: MessageEvent) => {
      if (this.IS_BROWSER) {
        return event.data instanceof Blob;
      } else {
        return Buffer.isBuffer(event.data);
      }
    };

    this.addSocketCallback(this.socket, "message", (event) => {
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
              this.events.emit("b_preview", image);
              break;
            default:
              throw new Error(
                `Unknown binary websocket message of type ${eventType}`
              );
          }
        } else {
          const msg = JSON.parse(event.data);
          this.events.emit("message", msg);

          switch (msg.type) {
            case "status":
              if (msg.data.sid) {
                this.clientId = msg.data.sid;
              }
              this.events.emit("status", msg.data.status);
              break;
            case "progress":
              this.events.emit("progress", msg.data);
              break;
            case "executing":
              this.events.emit("executing", msg.data);
              break;
            case "executed":
              this.events.emit("executed", msg.data);
              break;
            case "execution_start":
              this.events.emit("execution_start", msg.data);
              break;
            case "execution_error":
              this.events.emit("execution_error", msg.data);
              break;
            case "execution_cached":
              this.events.emit("execution_cached", msg.data);
              break;
            default:
              if (this.registered.has(msg.type)) {
                this.events.emit(msg.type, msg.data);
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
   *
   * @deprecated move to client.connect()
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

    this.disconnect();
    this.events.removeAllListeners();
  }

  /**
   * Connects to the WebSocket server by creating a new socket connection.
   */
  connect() {
    this.createSocket();
    return this;
  }

  /**
   * Disconnects the WebSocket connection and cleans up event listeners.
   */
  disconnect() {
    const { socket } = this;
    if (!socket) return;
    this.socket = null;
    if (socket.readyState === this.WebSocket.OPEN) {
      socket.close(1000, "Client closed");
    }
    this.removeSocketCallbacks();
    if ("removeAllListeners" in socket) {
      (socket.removeAllListeners as any)?.();
    }
  }
}
