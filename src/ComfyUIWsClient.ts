import { IComfyApiConfig } from "./types";
import { EventEmitter } from "eventemitter3";
import { ComfyUiWsTypes } from "./ws.typs";
import { uuidv4 } from "./misc";

type ComfyUIClientEvents = {
  status: [ComfyUiWsTypes.Messages.Status["status"] | null];
  progress: [ComfyUiWsTypes.Messages.Progress];
  executing: [ComfyUiWsTypes.Messages.Executing];
  executed: [ComfyUiWsTypes.Messages.Executed];
  execution_interrupted: [ComfyUiWsTypes.Messages.ExecutionInterrupted];

  // this group events
  execution_start: any;
  execution_error: any;
  execution_cached: any;

  // this web client events
  reconnected: any;
  reconnecting: any;

  /**
   * load image data from websocket
   */
  image_data: [ArrayBuffer];

  /**
   * get all messages
   */
  message: any;
};

/**
 * A client for interacting with the ComfyUI API server using WebSockets.
 *
 * NOTE: CORS policy: Request header field comfy-user is not allowed by Access-Control-Allow-Headers in preflight response. Please config.use empty string in browser.
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
  static DEFAULT_USER = "";
  static IS_BROWSER = typeof window !== "undefined";

  static loadImageData(buf: ArrayBuffer) {
    const view = new DataView(buf);
    const eventType = view.getUint32(0);
    switch (eventType) {
      case 1:
        const view2 = new DataView(buf);
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
        const image_buffer = buf.slice(8);
        return image_buffer;
        break;
      default:
        throw new Error(
          `Unknown binary websocket message of type ${eventType}`
        );
    }
  }

  api_host: string;
  api_base: string;
  clientId?: string;
  socket?: WebSocket | null;
  WebSocket: typeof WebSocket;
  ssl: boolean;
  user: string;
  fetch: typeof fetch;

  events: EventEmitter<ComfyUIClientEvents> = new EventEmitter();

  protected registered = new Set();

  protected socket_callbacks: Record<string, any> = {};

  constructor(config: IComfyApiConfig) {
    this.api_host = config.api_host ?? ComfyUIWsClient.DEFAULT_API_HOST;
    this.api_base = config.api_base ?? ComfyUIWsClient.DEFAULT_API_BASE;
    this.clientId = config.clientId ?? uuidv4();
    this.WebSocket = config.WebSocket ?? globalThis.WebSocket;
    this.ssl = config.ssl ?? false;
    this.user = config.user ?? ComfyUIWsClient.DEFAULT_USER;
    if (!globalThis.fetch) {
      throw new Error("fetch is not defined");
    }
    this.fetch = config.fetch ?? globalThis.fetch.bind(globalThis);

    if (!this.WebSocket) {
      console.warn("No WebSocket implementation available, WebSocket disabled");
    }
  }

  /**
   * Returns the headers for the API request.
   *
   * @param {RequestInit} [options] - (Optional) Additional options for the request.
   * @return {HeadersInit} The headers for the API request.
   */
  apiHeaders(options?: RequestInit) {
    const headers: HeadersInit = {
      ...(this.user
        ? {
            "Comfy-User": this.user,
          }
        : {}),
      // "User-Agent": `ComfyUIClient/${version}`,
      Accept: "*/*",
      ...(options?.headers ?? {}),
    };
    return headers;
  }

  /**
   * Generates the URL for the API endpoint based on the provided route.
   *
   * @param {string} route - The route for the API endpoint.
   * @return {string} The generated URL for the API endpoint.
   */
  apiURL(route: string): string {
    const url = new URL(`http${this.ssl ? "s" : ""}://${this.api_host}`);
    url.pathname = this.api_base + route;
    url.pathname = url.pathname.replace(/\/+/g, "/");
    return url.toString();
  }

  /**
   * Generates a URL for viewing a specific file with the given filename, subfolder, and type.
   *
   * @param {string} filename - The name of the file to view.
   * @param {string} subfolder - The subfolder where the file is located.
   * @param {string} type - The type of the file.
   * @return {string} The URL for viewing the file.
   */
  viewURL(filename: string, subfolder: string, type: string): string {
    const query = new URLSearchParams({
      filename,
      subfolder,
      type,
    }).toString();
    return `http${this.ssl ? "s" : ""}://${this.api_host}${
      this.api_base
    }/view?${query}`;
  }

  /**
   * Generates the WebSocket URL based on the current API host and SSL configuration.
   *
   * @return {string} The generated WebSocket URL.
   */
  wsURL(): string {
    const url = new URL(`ws${this.ssl ? "s" : ""}://${this.api_host}`);
    url.pathname = "/ws";
    if (this.clientId) {
      url.searchParams.set("clientId", this.clientId);
    }
    return url.toString();
  }

  /**
   * Fetches API data based on the provided route and options.
   *
   * NOTE: CORS policy: Request header field comfy-user is not allowed by Access-Control-Allow-Headers in preflight response. Please use empty string in browser.
   *
   * @param {string} route - The route for the API request.
   * @param {RequestInit} [options] - (Optional) Additional options for the request.
   * @return {Promise<Response>} A promise that resolves to the API response.
   */
  async fetchApi(route: string, options?: RequestInit): Promise<Response> {
    if (this.closed) {
      throw new Error("Client is closed");
    }
    const url = this.apiURL(route);
    return this.fetch(url, {
      ...options,
      headers: this.apiHeaders(options),
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
  addEventListener<T extends EventEmitter.EventNames<ComfyUIClientEvents>>(
    type: T,
    callback: EventEmitter.EventListener<ComfyUIClientEvents, T>,
    options?: any
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
  on<T extends EventEmitter.EventNames<ComfyUIClientEvents>>(
    type: T,
    callback: EventEmitter.EventListener<ComfyUIClientEvents, T>,
    options?: any
  ) {
    return this.addEventListener(type, callback, options);
  }

  protected _polling_timer: any = null;
  protected _polling_interval = 1000;
  /**
   * Poll status for colab and other things that don't support websockets.
   */
  private startPollingQueue() {
    if (this._polling_timer) {
      return;
    }
    this._polling_timer = setInterval(async () => {
      try {
        const resp = await this.fetchApi("/prompt");
        const status = await resp.json();
        this.events.emit("status", status);
      } catch (error) {
        this.events.emit("status", null);
      }
    }, this._polling_interval);
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
    if (!this.WebSocket) {
      throw new Error(
        "WebSocket is not defined, please provide a WebSocket implementation"
      );
    }

    let opened = false;

    this.socket = new this.WebSocket(this.wsURL());
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
        this.startPollingQueue();
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
      if (typeof event.data === "string") {
        return false;
      }
      if (ComfyUIWsClient.IS_BROWSER) {
        return event.data instanceof Blob;
      }
      if (ArrayBuffer && event.data instanceof ArrayBuffer) {
        return true;
      }
      if (Buffer && Buffer.isBuffer(event.data)) {
        return true;
      }
      return false;
    };

    this.addSocketCallback(this.socket, "message", (event) => {
      this.events.emit("message", event);
      try {
        if (isImageMessage(event)) {
          const image = ComfyUIWsClient.loadImageData(event.data);
          this.events.emit("image_data", image);
        } else {
          const msg = JSON.parse(event.data);

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
            case "execution_interrupted":
              this.events.emit("execution_interrupted", msg.data);
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
   *
   * @param {Object} options - The options for connecting to the server.
   * @param {Object} options.polling - The options for polling.
   * @param {boolean} options.polling.enabled - Whether polling is enabled.
   * @param {number} [options.polling.interval] - The interval for polling.
   * @param {Object} options.websocket - The options for the WebSocket connection.
   * @param {boolean} options.websocket.enabled - Whether the WebSocket connection is enabled.
   * @return {this} - The instance of the class.
   */
  connect({
    polling = {
      enabled: false,
    },
    websocket = {
      enabled: true,
    },
  }: {
    polling?: {
      enabled: boolean;
      interval?: number;
    };
    websocket?: {
      enabled: boolean;
    };
  } = {}) {
    if (polling?.enabled) {
      this._polling_interval = polling.interval ?? this._polling_interval;
      this.startPollingQueue();
    }
    if (websocket?.enabled) {
      this.createSocket();
    }
    return this;
  }

  /**
   * Disconnects the WebSocket connection and cleans up event listeners.
   */
  disconnect() {
    this._disconnectSocket();
    this._disconnectPolling();
  }

  /**
   * Disconnects the WebSocket connection and cleans up event listeners.
   *
   * @return {void} This function does not return anything.
   */
  _disconnectSocket() {
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

  /**
   * Disconnects the polling timer and sets it to null.
   *
   * @return {void}
   */
  _disconnectPolling() {
    if (this._polling_timer !== null) {
      clearInterval(this._polling_timer);
      this._polling_timer = null;
    }
  }
}
