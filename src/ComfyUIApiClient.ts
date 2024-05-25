import { ComfyUIWsClient } from "./ComfyUIWsClient";
import { isNone } from "./misc";
import { ComfyUIClientResponseTypes } from "./response.types";
import { IComfyApiConfig, WorkflowOutput } from "./types";

/**
 * The ComfyUIApiClient class provides a high-level interface for interacting with the ComfyUI API.
 *
 * @extends ComfyUIWsClient
 *
 * @example
 * ```typescript
 * const client = new ComfyUIApiClient({
 *  api_host: "YOUR_API_HOST",
 *  clientId: "YOUR_CLIENT_ID",
 * });
 *
 * const extensions = await client.getEmbeddings();
 * console.log(extensions);
 * ```
 */
export class ComfyUIApiClient extends ComfyUIWsClient {
  constructor(config: IComfyApiConfig) {
    super(config);
  }

  /**
   * Gets a list of extension urls
   * @returns An array of script urls to import
   */
  async getExtensions(): Promise<string[]> {
    const resp = await this.fetchApi("/extensions", { cache: "no-store" });
    return await resp.json();
  }

  /**
   * Gets a list of embedding names
   * @returns An array of script urls to import
   */
  async getEmbeddings(): Promise<string[]> {
    const resp = await this.fetchApi("/embeddings", { cache: "no-store" });
    return await resp.json();
  }

  // just cache 30s
  private _node_defs_cache: ComfyUIClientResponseTypes.ObjectInfo | null = null;
  /**
   * Loads node object definitions for the graph
   * @returns {Promise<ComfyUIClientResponseTypes.ObjectInfo>} The object info for the graph
   */
  async getNodeDefs(): Promise<ComfyUIClientResponseTypes.ObjectInfo> {
    if (this._node_defs_cache) {
      return this._node_defs_cache;
    }

    const resp = await this.fetchApi("/object_info", { cache: "no-store" });
    const node_defs = await resp.json();

    this._node_defs_cache = node_defs;
    setTimeout(() => {
      this._node_defs_cache = null;
    }, 30000);
    return node_defs;
  }

  /**
   * Clears the node object definitions cache
   */
  clearNodeDefsCache() {
    this._node_defs_cache = null;
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
    { prompt, workflow }: { prompt: any; workflow: any }
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
  async getItems(type: "history"): ReturnType<ComfyUIApiClient["getHistory"]>;
  async getItems(type: "queue"): ReturnType<ComfyUIApiClient["getQueue"]>;
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
    Running: Array<Record<string, unknown>>;
    Pending: Array<Record<string, unknown>>;
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
    History: Array<{
      // [index, prompt_id, prompt, payload, outputs_node]
      prompt: [number, string, any, any, any];
      outputs: Record<string, unknown>;
      status: {
        status_str: string;
        completed: boolean;
        messages: any[];
      };
    }>;
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
  private async postItem(type: string, body: any) {
    try {
      await this.fetchApi("/" + type, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      });
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Deletes an item from the specified list
   * @param {string} type The type of item to delete, queue or history
   * @param {number} id The id of the item to delete
   */
  async deleteItem(type: string, id: number) {
    await this.postItem(type, { delete: [id] });
  }

  /**
   * Clears the specified list
   * @param {string} type The type of list to clear, queue or history
   */
  async clearItems(type: string) {
    await this.postItem(type, { clear: true });
  }

  /**
   * Interrupts the execution of the running prompt
   */
  async interrupt() {
    await this.postItem("interrupt", null);
  }

  /**
   * Free up memory by unloading models and freeing memory
   */
  async free(params?: { unload_models?: boolean; free_memory?: boolean }) {
    await this.postItem("free", params);
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
    options?: RequestInit & { stringify?: boolean; throwOnError?: boolean }
  ): Promise<void> {
    const resp = await this.fetchApi(`/userdata/${encodeURIComponent(file)}`, {
      method: "POST",
      body: options?.stringify ? JSON.stringify(data) : data,
      ...options,
    });
    if (resp.status !== 200) {
      const error = await resp.text();
      throw new Error(
        `Error storing user data file '${file}': ${resp.status} ${error}`
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
    const sampler_name = node?.input?.required?.["sampler_name"].flat() || [];
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
    const scheduler_name = node?.input?.required?.["scheduler"].flat() || [];
    return scheduler_name as string[];
  }

  /**
   * Retrieves the list of model names from the node definitions.
   *
   * @return {Promise<string[]>} A promise that resolves to an array of strings representing the model names.
   */
  async getModels() {
    const node_config = await this.getNodeDefs();
    // find CheckpointLoaderSimple node
    const node = node_config["CheckpointLoaderSimple"];
    const model_name = node?.input?.required?.["ckpt_name"].flat() || [];
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
      (task: any) => task?.prompt?.[1] === prompt_id
    );
    const pending = Pending.some(
      (task: any) => task?.prompt?.[1] === prompt_id
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
   * @return {Promise<any>} A promise that resolves to the outputs of the prompt.
   * @throws {Error} If the prompt with the given ID is not found in the history or if it failed with a non-"success" status.
   */
  async getPromptOutputs(prompt_id: string) {
    const { History: history } = await this.getHistory();
    const item = history.find((item) => item.prompt[1] === prompt_id);
    if (!item) {
      throw new Error(`Prompt [${prompt_id}] not found in history`);
    }

    const status = item.status.status_str;
    if (status !== "success") {
      throw new Error(`Prompt [${prompt_id}] failed with status: ${status}`);
    }

    return item.outputs;
  }

  /**
   * Retrieves the result of a prompt based on the provided prompt ID.
   *
   * @param {string} prompt_id - The ID of the prompt to retrieve the result for.
   * @return {WorkflowOutput} An object containing the images associated with the prompt and the prompt ID.
   */
  async getPromptImageResult(prompt_id: string) {
    const outputs = await this.getPromptOutputs(prompt_id);

    // find image from history
    const images: {
      filename?: string;
      subfolder?: string;
      type: string;
    }[] = Object.values(outputs).flatMap((node_output) => {
      return (node_output as any).images || [];
    });
    const images_url = images
      .map((image) => {
        const { filename, subfolder, type } = image;
        if (isNone(filename) || isNone(subfolder) || type !== "output") {
          return null;
        }
        return this.viewURL(filename, subfolder, type);
      })
      .filter(Boolean) as string[];
    return {
      images: images_url.map((data) => ({ type: "url", data })),
      prompt_id,
    };
  }

  /**
   * Asynchronously waits for the prompt with the provided ID to be done.
   *
   * @param {string} prompt_id - The ID of the prompt to wait for.
   * @param {number} [polling_ms=1000] - The number of milliseconds to wait between checks.
   * @return {void}
   */
  async waitForPrompt(prompt_id: string, polling_ms = 1000) {
    let prompt_status = await this.getPromptStatus(prompt_id);
    while (!prompt_status.done) {
      await new Promise((resolve) => setTimeout(resolve, polling_ms));
      prompt_status = await this.getPromptStatus(prompt_id);
    }
  }

  /**
   * Asynchronously waits for the prompt with the provided ID to be done using WebSocket.
   *
   * @param {string} prompt_id - The ID of the prompt to wait for.
   * @return {Promise<WorkflowOutput>} A promise that resolves to a WorkflowOutput object containing the images and prompt_id.
   */
  async waitForPromptWebSocket(prompt_id: string) {
    const output: WorkflowOutput = {
      images: [],
      prompt_id,
    };
    return new Promise<WorkflowOutput>((resolve, reject) => {
      let done = false;
      const offEvent2 = this.on("image_data", (data) => {
        output.images.push({ type: "buff", data });
      });
      const offEvent = this.on("executed", (data) => {
        const { prompt_id: current_prompt_id, output: executed_output } = data;
        if (current_prompt_id !== prompt_id) {
          return;
        }
        done = true;
        const { images = [] } = executed_output || {};

        // collect url images
        for (const image of images) {
          const { filename, subfolder, type } = image || {};
          if (isNone(filename) || isNone(subfolder) || type !== "output") {
            continue;
          }
          output.images.push({
            type: "url",
            data: this.viewURL(filename, subfolder, type),
          });
        }

        resolve(output);
        offEvent();
        offEvent2();
      });
    });
  }

  /**
   * Randomizes the seed value of nodes with class type "KSampler" in the prompt.
   *
   * @param {Record<string, unknown>} prompt - The prompt object to randomize.
   * @return {void}
   */
  randomizePrompt(prompt: Record<string, unknown>) {
    for (const node of Object.values(prompt) as any[]) {
      if (node.class_type === "KSampler") {
        // python random seed is 32 bit
        node.inputs.seed = Math.floor(Math.random() * (2 ** 32 - 1));
      }
    }
  }

  /**
   * Asynchronously enqueues a prompt with optional workflow and random seed.
   *
   * @param {Record<string, unknown>} prompt - The prompt to enqueue.
   * @param {Object} [options] - The options for enqueueing the prompt.
   * @param {Record<string, unknown>} [options.workflow] - The workflow for the prompt.
   * @param {boolean} [options.disable_random_seed=false] - Whether to disable random seed.
   * @return {Promise<{ prompt_id: string; number: number; node_errors: any; }>} A promise that resolves with the enqueued prompt response.
   * @throws {Error} If there is an error in the response.
   */
  async _enqueue_prompt(
    prompt: Record<string, unknown>,
    options?: {
      workflow?: Record<string, unknown>;
      disable_random_seed?: boolean;
    }
  ) {
    if (!options?.disable_random_seed) {
      this.randomizePrompt(prompt);
    }
    const resp = await this.queuePrompt(0, {
      prompt,
      workflow: options?.workflow,
    });
    if ("error" in resp) {
      // TODO new Error class
      throw new Error(resp.error);
    }
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
   * @param {boolean} [options.disable_random_seed] - Flag to disable random seed generation.
   * @param {number} [options.polling_ms=1000] - The number of milliseconds to polling query prompt result.
   * @return {Promise<WorkflowOutput>} A promise that resolves with the prompt result.
   *
   * @deprecated Use `enqueue_polling` instead
   */
  async runPrompt(
    prompt: Record<string, unknown>,
    options?: {
      workflow?: Record<string, unknown>;
      disable_random_seed?: boolean;
      polling_ms?: number;
    }
  ) {
    const resp = await this._enqueue_prompt(prompt, options);
    const prompt_id = resp.prompt_id;
    await this.waitForPrompt(prompt_id, options?.polling_ms);
    return await this.getPromptImageResult(prompt_id);
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
   * @param {boolean} [options.disable_random_seed] - Flag to disable random seed generation.
   * @param {number} [options.polling_ms=1000] - The number of milliseconds to polling query prompt result.
   * @return {Promise<WorkflowOutput>} A promise that resolves with the prompt result.
   */
  async enqueue_polling(
    prompt: Record<string, unknown>,
    options?: {
      workflow?: Record<string, unknown>;
      disable_random_seed?: boolean;
      polling_ms?: number;
    }
  ) {
    const resp = await this._enqueue_prompt(prompt, options);
    const prompt_id = resp.prompt_id;
    await this.waitForPrompt(prompt_id, options?.polling_ms);
    return await this.getPromptImageResult(prompt_id);
  }

  /**
   * Enqueues a prompt and waits for the corresponding prompt websocket.
   *
   * @param {Record<string, unknown>} prompt - The prompt to enqueue.
   * @param {{ workflow?: Record<string, unknown>; disable_random_seed?: boolean; }} [options] - The options for enqueueing the prompt.
   * @param {Record<string, unknown>} [options.workflow] - This data for PNG info.
   * @param {boolean} [options.disable_random_seed] - Whether to disable random seed.
   * @return {Promise<WorkflowOutput>} A promise that resolves with the prompt result.
   */
  async enqueue(
    prompt: Record<string, unknown>,
    options?: {
      /**
       * this data for PNG info
       */
      workflow?: Record<string, unknown>;
      disable_random_seed?: boolean;
    }
  ) {
    const resp = await this._enqueue_prompt(prompt, options);
    const prompt_id = resp.prompt_id;
    return await this.waitForPromptWebSocket(prompt_id);
  }
}
