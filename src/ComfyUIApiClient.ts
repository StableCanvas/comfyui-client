import { ComfyUIWsClient } from "./ComfyUIWsClient";
import { ComfyUIClientResponseTypes } from "./response.types";
import { IComfyApiConfig } from "./types";

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

  /**
   * Loads node object definitions for the graph
   * @returns The node definitions
   */
  async getNodeDefs(): Promise<Record<string, unknown>> {
    const resp = await this.fetchApi("/object_info", { cache: "no-store" });
    return await resp.json();
  }

  /**
   *
   * @param {number} queue_index The index at which to queue the prompt, passing -1 will insert the prompt at the front of the queue
   * @param {object} prompt The prompt data to queue
   */
  async queuePrompt(
    queue_index: number,
    { prompt, workflow }: { prompt: any; workflow: any }
  ): Promise<
    | {
        prompt_id: string;
        number: number;
        node_errors: any;
      }
    | {
        error: string;
        node_errors: Record<
          string,
          {
            class_type: string;
            dependent_outputs: string[];
            errors: Array<{
              details: string;
              extra_info: any;
              message: string;
              type: string;
            }>;
          }
        >;
      }
  > {
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
   * Retrieves the result of a prompt based on the provided prompt ID.
   *
   * @param {string} prompt_id - The ID of the prompt to retrieve the result for.
   * @return {Object} An object containing the images associated with the prompt and the prompt ID.
   */
  async getPromptResult(prompt_id: string) {
    const { History: history } = await this.getHistory();
    const item = history.find((item) => item.prompt[1] === prompt_id);
    if (!item) {
      throw new Error(`Prompt [${prompt_id}] not found in history`);
    }

    const status = item.status.status_str;
    if (status !== "success") {
      // TODO throw Error class
      throw item;
    }

    // find image from history
    const images: {
      filename: string;
      subfolder: string;
      type: string;
    }[] = Object.values(item.outputs).flatMap((node_output) => {
      return (node_output as any).images || [];
    });
    const images_url = images.map((image) => {
      const { filename, subfolder, type } = image;
      return `http${this.ssl ? "s" : ""}://${
        this.api_host
      }/view?${new URLSearchParams({
        filename,
        subfolder,
        type,
      }).toString()}`;
    });
    return {
      images: images_url,
      prompt_id,
    };
  }

  /**
   * Asynchronously waits for the prompt with the provided ID to be done.
   *
   * @param {string} prompt_id - The ID of the prompt to wait for.
   * @param {number} [ms=500] - The number of milliseconds to wait between checks.
   * @return {void}
   */
  async waitForPrompt(prompt_id: string, ms = 500) {
    let prompt_status = await this.getPromptStatus(prompt_id);
    while (!prompt_status.done) {
      await new Promise((resolve) => setTimeout(resolve, ms));
      prompt_status = await this.getPromptStatus(prompt_id);
    }
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
   * Asynchronously runs a prompt with the provided options.
   *
   * @param {Record<string, unknown>} prompt - The prompt to run.
   * @param {Object} options - The options for running the prompt.
   * @param {Record<string, unknown>} options.workflow - The workflow for the prompt.
   * @param {boolean} [options.disable_random_seed] - Flag to disable random seed generation.
   * @param {number} [options.wait_ms=500] - The number of milliseconds to wait between checks.
   * @return {Promise<any>} A promise that resolves with the prompt result.
   */
  async runPrompt(
    prompt: Record<string, unknown>,
    options?: {
      workflow?: Record<string, unknown>;
      disable_random_seed?: boolean;
      wait_ms?: number;
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
    const prompt_id = resp.prompt_id;
    await this.waitForPrompt(prompt_id, options?.wait_ms);
    return await this.getPromptResult(prompt_id);
  }
}
