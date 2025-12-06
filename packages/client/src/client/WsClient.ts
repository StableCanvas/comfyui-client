import { EventEmitter } from "eventemitter3";
import { ComfyUIClientEvents } from "./ws.types";
import { uuidv4 } from "../utils/misc";
import { IComfyApiConfig } from "./types";
import {
  ConnectError,
  HttpError,
  PollingTimeoutError,
  WebSocketParseError,
  WebSocketTimeoutError,
} from "./errors";

/**
 * A client for interacting with the ComfyUI API server using WebSockets.
 *
 * NOTE: CORS policy: Request header field comfy-user is not allowed by Access-Control-Allow-Headers in preflight response. Please config.use empty string in browser.
 *
 * @example
 * ```typescript
 * const client = new WsClient({
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
export class WsClient {
  static DEFAULT_API_HOST = "127.0.0.1:8188";
  static DEFAULT_API_BASE = "";
  static DEFAULT_USER = "";
  static IS_BROWSER = typeof window !== "undefined";

  static readBinaryData(buf: ArrayBuffer) {
    const view = new DataView(buf);
    const eventType = view.getUint32(0);
    const imageType = view.getUint32(1);

    switch (eventType) {
      case 3: {
        const decoder = new TextDecoder();
        const data = buf.slice(4);
        const nodeIdLength = view.getUint32(4);
        return [
          {
            type: "progress_text",
            data: {
              nodeId: decoder.decode(data.slice(4, 4 + nodeIdLength)),
              text: decoder.decode(data.slice(4 + nodeIdLength)),
            },
          },
        ] as const;
      }

      case 1: {
        const mimeTypes = {
          1: "image/jpeg",
          2: "image/png",
        } as any;

        const mime = mimeTypes[imageType] || "image/png";
        const image = buf.slice(8);

        const imageBlob = new Blob([image], {
          type: mime,
        });

        return [
          {
            type: "b_preview",
            data: imageBlob,
          },
        ] as const;
      }

      case 4: {
        // PREVIEW_IMAGE_WITH_METADATA
        const decoder4 = new TextDecoder();
        const metadataLength = view.getUint32(4);
        const metadataBytes = buf.slice(8, 8 + metadataLength);
        const metadata = JSON.parse(decoder4.decode(metadataBytes));
        const imageData4 = buf.slice(8 + metadataLength);

        let imageMime4 = metadata.image_type;

        const imageBlob4 = new Blob([imageData4], {
          type: imageMime4,
        });

        return [
          {
            type: "b_preview_with_metadata",
            data: {
              blob: imageBlob4,
              nodeId: metadata.node_id,
              displayNodeId: metadata.display_node_id,
              parentNodeId: metadata.parent_node_id,
              realNodeId: metadata.real_node_id,
              promptId: metadata.prompt_id,
            },
          },
          {
            type: "b_preview",
            data: imageBlob4,
          },
        ] as const;
      }
      default:
        throw new WebSocketParseError(
          `Unknown binary websocket message of type ${eventType}`,
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

  events: EventEmitter<ComfyUIClientEvents & Record<string & {}, any>> =
    new EventEmitter();

  protected socket_callbacks: Record<string, any> = {};

  get registered() {
    return this.events.eventNames();
  }

  constructor(config: IComfyApiConfig) {
    this.api_host = config.api_host ?? WsClient.DEFAULT_API_HOST;
    this.api_base = config.api_base ?? WsClient.DEFAULT_API_BASE;
    this.clientId = config.clientId ?? uuidv4();
    this.WebSocket = config.WebSocket ?? globalThis.WebSocket;
    this.ssl = config.ssl ?? false;
    this.user = config.user ?? WsClient.DEFAULT_USER;
    if (!globalThis.fetch) {
      throw new ConnectError("fetch is not defined");
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
    let [pathname, query] = (this.api_base + route).split("?");
    url.pathname = pathname;
    url.pathname = url.pathname.replace(/\/+/g, "/");
    if (query) {
      url.search = query;
    }
    if (this.clientId) {
      url.searchParams.set("clientId", this.clientId);
    }
    return url.toString();
  }

  internalURL(route: string): string {
    return this.apiURL(`/internal${route}`);
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
      throw new ConnectError("Client is closed");
    }
    const url = this.apiURL(route);
    const res = await this.fetch(url, {
      ...options,
      headers: this.apiHeaders(options),
    });
    const { status, statusText } = res;

    if (status < 200 || status >= 400) {
      throw new HttpError(
        `Endpoint Bad Request (${status} ${statusText}): ${url}`,
        status,
        await res.json(),
      );
    }

    return res;
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
    options?: any,
  ) {
    this.events.on(type as any, callback as any, options);

    return () => {
      this.events.off(type as any, callback as any);
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
    options?: any,
  ) {
    return this.addEventListener(type, callback, options);
  }

  /**
   * Adds an event listener for the specified event type.
   *
   * @param {keyof ComfyUIClientEvents | (string & {})} type - The type of event to listen for.
   * @param {(...args: any) => void} callback - The callback function to be executed when the event is triggered.
   * @param {any} options - (Optional) Additional options for the event listener.
   * @return {() => void} A function that removes the event listener when called.
   */
  once<T extends EventEmitter.EventNames<ComfyUIClientEvents>>(
    type: T,
    callback: EventEmitter.EventListener<ComfyUIClientEvents, T>,
    options?: any,
  ) {
    this.events.once(type as any, callback as any, options);

    return () => {
      this.events.off(type as any, callback as any);
    };
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
    // FIXME: 优化点
    // 这里不需要一直 polling ，只有有任务的时候才需要 polling
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
    options?: boolean | AddEventListenerOptions,
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
      throw new ConnectError(
        "WebSocket is not defined, please provide a WebSocket implementation",
      );
    }
    if (this.closed) {
      return;
    }

    let opened = false;

    this.socket = new this.WebSocket(this.wsURL());
    this.socket.binaryType = "arraybuffer";

    this.addSocketCallback(this.socket, "open", () => {
      opened = true;
      if (isReconnect) {
        this.events.emit("reconnected");
      } else {
        this.events.emit("connected");
      }
    });

    this.addSocketCallback(this.socket, "error", (ev: Event) => {
      // Expose websocket errors as unhandled events
      // Allows for catching 404 and other network errors
      const err = ev as ErrorEvent;
      const is404Error = err.message?.includes("404");

      this.events.emit("connection_error", {
        type: "404",
        message: err.message,
      });

      if (this.socket) this.socket.close();

      if (!is404Error && !isReconnect && !opened) {
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

    const isBinaryData = (event: MessageEvent) => {
      if (typeof event.data === "string") {
        return false;
      }
      if (ArrayBuffer && event.data instanceof ArrayBuffer) {
        return true;
      }
      if (Buffer && Buffer.isBuffer(event.data)) {
        return true;
      }
      return false;
    };

    this.addSocketCallback(this.socket, "message", async (event) => {
      this.events.emit("message", event);

      if (isBinaryData(event)) {
        const binaryEvents = WsClient.readBinaryData(event.data);
        for (const ev of binaryEvents) {
          switch (ev.type) {
            case "b_preview": {
              // TODO add types
              this.events.emit("b_preview", ev.data);
              this.events.emit("image_data", {
                image: await ev.data.arrayBuffer(),
                mime: ev.data.type,
              });
              break;
            }
            case "b_preview_with_metadata": {
              // TODO add types
              this.events.emit("b_preview_with_metadata", ev.data);
              this.events.emit("image_data", {
                image: await ev.data.blob.arrayBuffer(),
                mime: ev.data.blob.type,
              });
              break;
            }
            case "progress_text": {
              // TODO add types
              this.events.emit("progress_text", ev.data);
              break;
            }
            default:
              return;
          }
        }
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
            this.events.emit(msg.type, msg.data);
            break;
        }

        const is_unhandled_message =
          msg.type !== "message" &&
          this.registered.includes(msg.type) === false;
        if (is_unhandled_message) {
          this.events.emit("unhandled", msg);
        }
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
    this.events.emit("close");

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
   * @param {number} [options.timeout_ms] - The timeout for the connection in milliseconds.
   * @return {Promise<boolean>} - A promise that resolves to true if the connection was successful, false otherwise.
   */
  connect({
    polling = {
      enabled: false,
    },
    websocket = {
      enabled: true,
    },
    timeout_ms = 15 * 1000,
  }: {
    polling?: {
      enabled: boolean;
      interval?: number;
    };
    websocket?: {
      enabled: boolean;
    };
    timeout_ms?: number;
  } = {}) {
    if (polling?.enabled) {
      this._polling_interval = polling.interval ?? this._polling_interval;
      this.startPollingQueue();
      return new Promise(async (resolve, reject) => {
        const timer = setTimeout(() => {
          reject(new PollingTimeoutError(timeout_ms));
        }, timeout_ms);
        // ping to ok or fail
        const resp = await this.fetchApi("/system_stats");
        resolve(resp.ok && resp.status === 200);
        clearTimeout(timer);
      });
    }
    if (websocket?.enabled) {
      this.createSocket();
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          reject(new WebSocketTimeoutError(timeout_ms));
        }, timeout_ms);
        this.once("connected", () => {
          resolve(true);
          clearTimeout(timer);
        });
      });
    }
    throw new ConnectError("You must enable either polling or websocket");
  }

  /**
   * Disconnects the WebSocket connection and cleans up event listeners.
   */
  disconnect() {
    if (!this.socket) {
      process.nextTick(this._disconnectPolling.bind(this));
    } else {
      this._disconnectSocket();
    }
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
    try {
      if (socket.readyState === socket.OPEN) {
        socket.close(1000, "Client closed");
      }
    } catch (error) {
      // pass
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
