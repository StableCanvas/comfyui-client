import { CachedFn } from "../utils/CachedFn";
import type { Plugin } from "../plugins/Plugin";
import { WsClient } from "./WsClient";
import { RESOLVERS } from "../builtins";
import {
  WorkflowOutputResolver,
  EnqueueOptions,
  IComfyApiConfig,
  PromptBody,
  PromptQueueItem,
} from "./types";
import { ComfyUIClientResponseTypes } from "./response.types";
import { WorkflowOutput } from "../workflow/types";
import { WorkflowExecutionError } from "../workflow/errors";
import {
  ClientEnqueueError,
  ClientRequestError,
  PromptEnqueueError,
  PromptExecutionFailedError,
  PromptNotFoundError,
  PromptTimeoutError,
} from "./errors";

/**
 * The Client class provides a high-level interface for interacting with the ComfyUI API.
 *
 * @extends WsClient
 *
 * @example
 * ```typescript
 * const client = new Client({
 *  api_host: "YOUR_API_HOST",
 *  clientId: "YOUR_CLIENT_ID",
 * });
 *
 * const extensions = await client.getEmbeddings();
 * console.log(extensions);
 * ```
 */
export class Client extends WsClient {
  private _cached_fn: CachedFn;

  // NOTE: useless ... just for debug
  private _plugins = [] as Plugin[];

  constructor(
    config: Omit<IComfyApiConfig, "fetch" | "WebSocket"> & {
      // NOTE: This is written to reduce type issues... because sometimes `as any` is unavoidable
      fetch?: any;
      WebSocket?: any;
    },
  ) {
    super(config);

    const cache_ns = `${config.api_host}`;
    this._cached_fn = new CachedFn(cache_ns, config.cache);
  }

  /**
   * Use a plugin by calling its install method on this instance.
   *
   * @param {Plugin} plugin - The plugin to install.
   */
  use(plugin: Plugin) {
    plugin.install(this);
    this._plugins.push(plugin);
  }

  /**
   * Gets a list of extension urls
   * @returns An array of script urls to import
   */
  async getExtensions(): Promise<string[]> {
    const invoke = async () => {
      const resp = await this.fetchApi("/extensions", { cache: "no-store" });
      return await resp.json();
    };
    const cached = this._cached_fn.warp("extensions", invoke);
    return cached();
  }

  /**
   * Gets a list of embedding names
   * @returns An array of script urls to import
   */
  async getEmbeddings(): Promise<string[]> {
    const invoke = async () => {
      const resp = await this.fetchApi("/embeddings", { cache: "no-store" });
      return await resp.json();
    };
    const cached = this._cached_fn.warp("embeddings", invoke);
    return cached();
  }

  /**
   * Loads node object definitions for the graph
   * @returns {Promise<ComfyUIClientResponseTypes.ObjectInfo>} The object info for the graph
   */
  async getNodeDefs(): Promise<ComfyUIClientResponseTypes.ObjectInfo> {
    const invoke = async () => {
      const resp = await this.fetchApi("/object_info", { cache: "no-store" });
      const node_defs = await resp.json();
      return node_defs;
    };
    const cached = this._cached_fn.warp("object_info", invoke);
    return cached();
  }

  /**
   * Clears the node object definitions cache
   */
  resetCache() {
    this._cached_fn.reset();
  }

  /**
   *
   * @param {number} queue_index The index at which to queue the prompt, passing -1 will insert the prompt at the front of the queue
   * @param {Object} options
   * @param {Object} options.prompt The prompt to queue
   * @param {Object} options.workflow This png info to be added to resulting image
   * @returns {Promise<ComfyUIClientResponseTypes.QueuePrompt>} The response from the server
   */
  async queuePrompt(
    queue_index: number,
    { prompt, workflow }: { prompt: any; workflow: any },
  ): Promise<ComfyUIClientResponseTypes.QueuePrompt> {
    const body: Record<string, unknown> = {
      client_id: this.clientId,
      prompt,
      extra_data: { extra_pnginfo: { workflow } },
    };

    if (queue_index === -1) {
      body.front = true;
    } else if (queue_index !== 0) {
      body.number = queue_index;
    }

    const res = await this.fetchApi("/prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (res.status !== 200) {
      const error_resp = await res.text();
      try {
        const error_data = JSON.parse(error_resp);
        // TODO throw Error class
        throw { response: error_data };
      } catch (error) {
        throw { response: error_resp };
      }
    }

    return await res.json();
  }

  /**
   * Loads a list of items (queue or history)
   * @param {"queue" | "history"} type The type of items to load, queue or history
   * @returns The items of the specified type grouped by their status
   */
  async getItems(type: "history"): ReturnType<Client["getHistory"]>;
  async getItems(type: "queue"): ReturnType<Client["getQueue"]>;
  async getItems(type: "queue" | "history"): Promise<any> {
    if (type === "queue") {
      return this.getQueue();
    }
    return this.getHistory();
  }

  /**
   * Gets the current state of the queue
   * @returns The currently running and queued items
   */
  async getQueue(): Promise<{
    Running: Array<PromptBody>;
    Pending: Array<PromptBody>;
  }> {
    try {
      const res = await this.fetchApi("/queue");
      const data = await res.json();
      return {
        Running: data.queue_running.map((prompt: any) => ({
          prompt,
          remove: { name: "Cancel", cb: () => this.interrupt() },
        })),
        Pending: data.queue_pending.map((prompt: any) => ({ prompt })),
      };
    } catch (error) {
      console.error(error);
      return { Running: [], Pending: [] };
    }
  }

  /**
   * Gets the prompt execution history
   * @returns Prompt history including node outputs
   */
  async getHistory(max_items = 200): Promise<{
    History: Array<PromptQueueItem>;
  }> {
    try {
      const res = await this.fetchApi(`/history?max_items=${max_items}`);
      return { History: Object.values(await res.json()) };
    } catch (error) {
      console.error(error);
      return { History: [] };
    }
  }

  /**
   * Gets system & device stats
   * @returns {ComfyUIClientResponseTypes.SystemStatsRoot} System stats such as python version, OS, per device info
   */

  async getSystemStats(): Promise<ComfyUIClientResponseTypes.SystemStatsRoot> {
    const res = await this.fetchApi("/system_stats");
    return res.json();
  }

  /**
   * Sends a POST request to the API
   * @param {string} type The endpoint to post to
   * @param {any} body Optional POST data
   */
  private async postApi(type: string, body: any) {
    await this.fetchApi("/" + type, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * Deletes an item from the specified list
   * @param {"queue" | "history"} type The type of item to delete, queue or history
   * @param {any} id The id of the item to delete
   */
  async deleteItem(type: "queue" | "history", id: any) {
    await this.postApi(type, { delete: [id] });
  }

  /**
   * Clears the specified list
   * @param {"queue" | "history"} type The type of list to clear, queue or history
   */
  async clearItems(type: "queue" | "history") {
    await this.postApi(type, { clear: true });
  }

  /**
   * Interrupts the execution of the running prompt
   */
  async interrupt() {
    await this.postApi("interrupt", null);
  }

  /**
   * Free up memory by unloading models and freeing memory
   */
  async free(params?: { unload_models?: boolean; free_memory?: boolean }) {
    await this.postApi("free", params);
  }

  /**
   * Gets user configuration data and where data should be stored
   * @returns { Promise<{ storage: "server" | "browser", users?: Promise<string, unknown>, migrated?: boolean }> }
   */
  async getUserConfig() {
    return (await this.fetchApi("/users")).json();
  }

  /**
   * Creates a new user
   * @param { string } username
   * @returns The fetch response
   */
  async createUser(username: string): Promise<Response> {
    return this.fetchApi("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
  }

  /**
   * Gets all setting values for the current user
   * @returns { Promise<string, unknown> } A dictionary of id -> value
   */
  async getSettings(): Promise<Record<string, unknown>> {
    return (await this.fetchApi("/settings")).json();
  }

  /**
   * Gets a setting for the current user
   * @param { string } id The id of the setting to fetch
   * @returns { Promise<unknown> } The setting value
   */
  async getSetting(id: string): Promise<unknown> {
    return (await this.fetchApi(`/settings/${encodeURIComponent(id)}`)).json();
  }

  /**
   * Stores a dictionary of settings for the current user
   * @param { Record<string, unknown> } settings Dictionary of setting id -> value to save
   * @returns { Promise<void> }
   */
  async storeSettings(settings: Record<string, unknown>): Promise<Response> {
    return this.fetchApi(`/settings`, {
      method: "POST",
      body: JSON.stringify(settings),
    });
  }

  /**
   * Stores a setting for the current user
   * @param { string } id The id of the setting to update
   * @param { unknown } value The value of the setting
   * @returns { Promise<void> }
   */
  async storeSetting(id: string, value: unknown): Promise<Response> {
    return this.fetchApi(`/settings/${encodeURIComponent(id)}`, {
      method: "POST",
      body: JSON.stringify(value),
    });
  }

  /**
   * Gets a user data file for the current user
   * @param { string } file The name of the userdata file to load
   * @param { RequestInit } [options]
   * @returns { Promise<unknown> } The fetch response object
   */
  async getUserData(file: string, options?: RequestInit): Promise<Response> {
    return this.fetchApi(`/userdata/${encodeURIComponent(file)}`, options);
  }

  /**
   * Stores a user data file for the current user
   * @param { string } file The name of the userdata file to save
   * @param { any } data The data to save to the file
   * @param { RequestInit & { stringify?: boolean, throwOnError?: boolean } } [options]
   * @returns { Promise<void> }
   */
  async storeUserData(
    file: string,
    data: any,
    options?: RequestInit & { stringify?: boolean; throwOnError?: boolean },
  ): Promise<void> {
    const resp = await this.fetchApi(`/userdata/${encodeURIComponent(file)}`, {
      method: "POST",
      body: options?.stringify ? JSON.stringify(data) : data,
      ...options,
    });
    if (resp.status !== 200) {
      const error = await resp.text();
      throw new ClientRequestError(
        `Error storing user data file '${file}': ${resp.status} ${error}`,
      );
    }
  }

  // ----------------- get status ++ -----------------

  /**
   * Retrieves the list of samplers from the node definitions.
   *
   * @return {Promise<string[]>} A promise that resolves to an array of strings representing the sampler names.
   */
  async getSamplers() {
    const node_config = await this.getNodeDefs();
    // find KSampler node
    const node = node_config["KSampler"];
    const sampler_name = node?.input?.required?.["sampler_name"]?.[0] || [];
    return sampler_name as string[];
  }

  /**
   * Retrieves the list of schedulers from the node definitions.
   *
   * @return {Promise<string[]>} A promise that resolves to an array of strings representing the scheduler names.
   */
  async getSchedulers() {
    const node_config = await this.getNodeDefs();
    // find Scheduler node
    const node = node_config["KSampler"];
    const scheduler_name = node?.input?.required?.["scheduler"]?.[0] || [];
    return scheduler_name as string[];
  }

  /**
   * Retrieves the list of model names from the node definitions.
   *
   * @return {Promise<string[]>} A promise that resolves to an array of strings representing the model names.
   */
  async getSDModels() {
    const node_config = await this.getNodeDefs();
    // find CheckpointLoaderSimple node
    const node = node_config["CheckpointLoaderSimple"];
    const model_name = node?.input?.required?.["ckpt_name"]?.[0] || [];
    return model_name as string[];
  }

  /**
   * Retrieves the list of model names from the node definitions.
   *
   * @return {Promise<string[]>} A promise that resolves to an array of strings representing the model names.
   */
  async getCNetModels() {
    const node_config = await this.getNodeDefs();
    // find ControlNetLoader node
    const node = node_config["ControlNetLoader"];
    const model_name = node?.input?.required?.["control_net_name"]?.[0] || [];
    return model_name as string[];
  }

  /**
   * Retrieves the list of model names from the node definitions for the UpscaleModelLoader node.
   *
   * @return {Promise<string[]>} A promise that resolves to an array of strings representing the model names.
   */
  async getUpscaleModels() {
    const node_config = await this.getNodeDefs();
    // find UpscaleModelLoader node
    const node = node_config["UpscaleModelLoader"];
    const model_name = node?.input?.required?.["model_name"]?.[0] || [];
    return model_name as string[];
  }

  /**
   * Retrieves the list of hypernetwork names from the node definitions.
   *
   * @return {Promise<string[]>} A promise that resolves to an array of strings representing the hypernetwork names.
   */
  async getHyperNetworks() {
    const node_config = await this.getNodeDefs();
    // find HypernetworkLoader node
    const node = node_config["HypernetworkLoader"];
    const model_name = node?.input?.required?.["hypernetwork_name"]?.[0] || [];
    return model_name as string[];
  }

  /**
   * Retrieves the list of LoRAs from the node definitions.
   *
   * @return {Promise<string[]>} A promise that resolves to an array of strings representing the LoRAs.
   */
  async getLoRAs() {
    const node_config = await this.getNodeDefs();
    // find LoraLoader node
    const node = node_config["LoraLoader"];
    const model_name = node?.input?.required?.["lora_name"]?.[0] || [];
    return model_name as string[];
  }

  /**
   * Retrieves the list of VAE names from the node definitions.
   *
   * @return {Promise<string[]>} A promise that resolves to an array of strings representing the VAE names.
   */
  async getVAEs() {
    const node_config = await this.getNodeDefs();
    // find VAELoader node
    const node = node_config["VAELoader"];
    const model_name = node?.input?.required?.["vae_name"]?.[0] || [];
    return model_name as string[];
  }

  // ----------------- Prompt ++ -----------------

  /**
   * Retrieves the status of a prompt based on the provided prompt ID.
   *
   * @param {string} prompt_id - The ID of the prompt to check status for.
   * @return {Object} Object containing the running, pending, and done status of the prompt.
   */
  async getPromptStatus(prompt_id: string) {
    const { Running, Pending } = await this.getQueue();
    const running = Running.some(
      (task: any) => task?.prompt?.[1] === prompt_id,
    );
    const pending = Pending.some(
      (task: any) => task?.prompt?.[1] === prompt_id,
    );
    const done = !running && !pending;
    return {
      running,
      pending,
      done,
    };
  }

  /**
   * Retrieves the outputs of a prompt with the given ID from the history.
   *
   * @param {string} prompt_id - The ID of the prompt to retrieve the outputs for.
   * @return {Promise<Record<string, any>>} A promise that resolves to the outputs of the prompt.
   * @throws {Error} If the prompt with the given ID is not found in the history or if it failed with a non-"success" status.
   */
  async getPromptOutputs(prompt_id: string) {
    const { History: history } = await this.getHistory();
    const item = history.find((item) => item.prompt[1] === prompt_id);
    if (!item) {
      throw new PromptNotFoundError(prompt_id);
    }

    const status = item.status?.status_str ?? "error";
    if (status === "error") {
      throw new PromptExecutionFailedError(prompt_id, status ?? "error");
    }

    return item.outputs;
  }

  /**
   * Retrieves the result of a prompt with the given ID, resolved using the provided resolver.
   *
   * @param {string} prompt_id - The ID of the prompt to retrieve the result for.
   * @param {WorkflowOutputResolver<T>} resolver - The resolver to use when resolving the prompt result.
   * @return {Promise<WorkflowOutput<T>>} A promise that resolves to the result of the prompt.
   */
  async getPromptResult<T>(
    prompt_id: string,
    resolver: WorkflowOutputResolver<T>,
  ): Promise<WorkflowOutput<T>>;
  async getPromptResult(prompt_id: string): Promise<WorkflowOutput>;
  async getPromptResult(
    prompt_id: string,
    resolver?: any,
  ): Promise<WorkflowOutput> {
    const outputs = await this.getPromptOutputs(prompt_id);
    if (typeof resolver !== "function") {
      resolver = RESOLVERS.image;
    }
    return Object.entries(outputs).reduce(
      (acc, [node_id, output]) =>
        resolver(acc, output, {
          client: this,
          prompt_id,
          node_id,
        }),
      {
        images: [],
        prompt_id,
        data: null,
      } as WorkflowOutput,
    );
  }

  /**
   * Asynchronously waits for the prompt with the provided ID to be done.
   *
   * @param {string} prompt_id - The ID of the prompt to wait for.
   * @param {number} [polling_ms=1000] - The number of milliseconds to wait between checks.
   * @param {number} [timeout_ms=5 * 60 * 1000] - The maximum number of milliseconds to wait. defaults to 5 minutes. must be greater than 1000ms.
   * @return {void}
   */
  async waitForPrompt(
    prompt_id: string,
    polling_ms = 1000,
    timeout_ms = 5 * 60 * 1000,
  ) {
    const start = Date.now();
    let prompt_status = await this.getPromptStatus(prompt_id);
    while (!prompt_status.done) {
      if (timeout_ms >= 1000) {
        if (Date.now() - start > timeout_ms) {
          throw new PromptTimeoutError(prompt_id, timeout_ms);
        }
      }

      await new Promise((resolve) => setTimeout(resolve, polling_ms));
      prompt_status = await this.getPromptStatus(prompt_id);
    }
  }

  /**
   * Asynchronously waits for the prompt with the provided ID to be done,
   * using a WebSocket connection to receive updates.
   *
   * @param {string} prompt_id - The ID of the prompt to wait for.
   * @param {WorkflowOutputResolver<T>} resolver - A function to resolve the output of the prompt.
   * @param {number} [timeout_ms=5 * 60 * 1000] - The maximum number of milliseconds to wait. defaults to 5 minutes. must be greater than 1000ms.
   * @return {Promise<WorkflowOutput<T>>} A promise that resolves with the output of the prompt.
   */
  async waitForPromptWebSocket<T>(
    prompt_id: string,
    resolver: WorkflowOutputResolver<T>,
    timeout_ms = 5 * 60 * 1000,
  ) {
    const output: WorkflowOutput<T> = {
      images: [],
      prompt_id,
      data: null as T,
    };
    return new Promise<WorkflowOutput<T>>((resolve, reject) => {
      const cbs = [] as any[];
      const gc = () => cbs.forEach((cb) => cb());
      cbs.push(
        this.on("image_data", (data) => {
          // FIXME: should hook web-socket resolver ?
          // NOTE: 这里不准备用 resolver 处理了，因为 resolver 的意思是处理那些不常见的特殊的数据结构，但是这里完完全全很明白是图片数据，所以不需要经过 resolver
          output.images.push({
            type: "buff",
            data: data.image,
            mime: data.mime,
          });
        }),
      );
      cbs.push(
        this.on("executed", (data) => {
          const {
            prompt_id: current_prompt_id,
            output: executed_output,
            node: node_id,
          } = data;
          if (current_prompt_id !== prompt_id) {
            return;
          }
          const resolved = resolver(output, executed_output, {
            client: this,
            prompt_id,
            node_id,
          });
          resolve(resolved);
          gc();
        }),
      );
      cbs.push(
        this.on("execution_error", (data) => {
          reject(new WorkflowExecutionError(data, prompt_id));
          gc();
        }),
      );
      const timer = setTimeout(() => {
        reject(new PromptTimeoutError(prompt_id, timeout_ms));
      }, timeout_ms);
      cbs.push(() => clearTimeout(timer));
    });
  }

  /**
   * Asynchronously enqueues a prompt with optional workflow and random seed.
   *
   * @param {Record<string, unknown>} prompt - The prompt to enqueue.
   * @param {Object} [options] - The options for enqueueing the prompt.
   * @param {Record<string, unknown>} [options.workflow] - The workflow for the prompt.
   * @return {Promise<{ prompt_id: string; number: number; node_errors: any; }>} A promise that resolves with the enqueued prompt response.
   * @throws {Error} If there is an error in the response.
   */
  async _enqueue_prompt(
    prompt: Record<string, unknown>,
    options?: {
      workflow?: Record<string, unknown>;
    },
  ) {
    const resp = await this.queuePrompt(0, {
      prompt,
      workflow: options?.workflow,
    });
    if ("error" in resp) throw new PromptEnqueueError(resp.error);
    return resp;
  }

  /**
   * Asynchronously runs a prompt with the provided options.
   *
   * This function does not use WebSocket, but uses polling to get the result
   * So if your workflow contains custom ws events, this function will not be able to get these events
   *
   * @param {Record<string, unknown>} prompt - The prompt to run.
   * @param {Object} options - The options for running the prompt.
   * @param {Record<string, unknown>} options.workflow - The workflow for the prompt, It will be added to the png info of the generated image.
   * @param {number} [options.polling_ms=1000] - The number of milliseconds to polling query prompt result.
   * @param {number} [options.timeout_ms=5 * 60 * 1000] - The number of milliseconds to wait for the prompt result. must be greater than 1000.
   * @return {Promise<WorkflowOutput>} A promise that resolves with the prompt result.
   *
   * @deprecated Use `enqueue_polling` instead
   */
  async runPrompt(
    prompt: Record<string, unknown>,
    options?: {
      workflow?: Record<string, unknown>;
      polling_ms?: number;
      timeout_ms?: number;
    },
  ) {
    const resp = await this._enqueue_prompt(prompt, options);
    const prompt_id = resp.prompt_id;
    await this.waitForPrompt(
      prompt_id,
      options?.polling_ms,
      options?.timeout_ms,
    );
    return await this.getPromptResult(prompt_id, RESOLVERS.image);
  }

  /**
   * Asynchronously enqueues a prompt and waits for the corresponding prompt websocket.
   *
   * This function does not use WebSocket, but uses polling to get the result
   * So if your workflow contains custom ws events, this function will not be able to get these events
   *
   * @param {Record<string, unknown>} prompt - The prompt to enqueue.
   * @param {EnqueueOptions<T>} [options] - The options for enqueueing the prompt.
   * @return {Promise<WorkflowOutput<T>>} A promise that resolves with the prompt result.
   */
  async enqueue_polling<T>(
    prompt: Record<string, unknown>,
    options?: EnqueueOptions<T>,
  ): Promise<WorkflowOutput<T>>;
  async enqueue_polling(
    prompt: Record<string, unknown>,
    options?: EnqueueOptions,
  ): Promise<WorkflowOutput>;
  async enqueue_polling(
    prompt: Record<string, unknown>,
    options?: any,
  ): Promise<WorkflowOutput> {
    if (typeof options?.progress === "function") {
      throw new ClientEnqueueError(
        "progress option is not supported in polling mode",
      );
    }

    const resp = await this._enqueue_prompt(prompt, options);
    const prompt_id = resp.prompt_id;
    await this.waitForPrompt(
      prompt_id,
      options?.polling_ms,
      options?.timeout_ms,
    );
    return await this.getPromptResult(
      prompt_id,
      options?.resolver ?? RESOLVERS.image,
    );
  }

  /**
   * Enqueues a prompt and waits for the corresponding prompt websocket.
   *
   * @param {Record<string, unknown>} prompt - The prompt to enqueue.
   * @param {EnqueueOptions<T>} [options] - The options for enqueueing the prompt.
   * @return {Promise<WorkflowOutput>} A promise that resolves with the prompt result.
   */
  async enqueue<T>(
    prompt: Record<string, unknown>,
    options?: EnqueueOptions<T>,
  ): Promise<WorkflowOutput<T>>;
  async enqueue(
    prompt: Record<string, unknown>,
    options?: EnqueueOptions,
  ): Promise<WorkflowOutput>;
  async enqueue(prompt: Record<string, unknown>, options?: any) {
    const resp = await this._enqueue_prompt(prompt, options);
    const prompt_id = resp.prompt_id;

    const off_progress = this.on_progress(options?.progress, prompt_id);
    try {
      return await this.waitForPromptWebSocket(
        prompt_id,
        options?.resolver ?? RESOLVERS.image,
        options?.timeout_ms,
      );
    } finally {
      off_progress();
    }
  }

  /**
   * Listens for progress updates for a specific task.
   *
   * @param {EnqueueOptions["progress"]} fn - The progress callback function.
   * @param {string} task_id - The ID of the task to listen for progress updates.
   * @return {Function} A function that can be used to remove the progress listener.
   */
  on_progress(fn: EnqueueOptions["progress"], task_id: string) {
    if (!fn) return () => {};
    return this.on("progress", (_data) => {
      const data = {
        // old api response type:
        ...("progress" in _data ? { ...(_data as any).progress } : {}),
        // new api: https://github.com/StableCanvas/comfyui-client/issues/6
        ..._data,
      };
      if (data.prompt_id === task_id) {
        fn(data);
      }
    });
  }
}
