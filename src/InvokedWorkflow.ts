import { ComfyUIApiClient } from "./ComfyUIApiClient";
import { WorkflowOutputResolver } from "./client.types";
import { isNone } from "./misc";
import type { WorkflowOutput, IWorkflow } from "./types";
import { RESOLVERS } from "./builtins";
import { ComfyUiWsTypes } from "./ws.typs";

class Disposable {
  protected _disposed = false;
  protected _disposed_cbs = [] as any[];
  public dispose() {
    if (this._disposed) {
      return;
    }
    this._disposed = true;

    this._disposed_cbs.forEach((cb) => {
      if (typeof cb === "function") {
        cb();
      }
    });
  }
  public _connect(cb: () => void) {
    if (this._disposed) {
      cb();
      return;
    }
    this._disposed_cbs.push(cb);
  }
}

export class InvokedWorkflow<T = unknown> extends Disposable {
  protected task_id?: string;

  protected _result: WorkflowOutput<T> = {
    images: [],
    prompt_id: "",
  };

  is_done = false;
  enqueued = false;

  workflow: IWorkflow;
  client: ComfyUIApiClient;
  resolver: WorkflowOutputResolver<T>;

  constructor(
    readonly options: {
      workflow: IWorkflow;
      client: ComfyUIApiClient;
      resolver?: WorkflowOutputResolver<T>;
      progress?: (p: ComfyUiWsTypes.Messages.Progress) => void;
    }
  ) {
    super();
    const { workflow, client, resolver } = options;
    this.workflow = workflow;
    this.client = client;
    this.resolver = resolver || (RESOLVERS.image as any);
  }

  protected _enqueue_guard() {
    if (this.enqueued) {
      throw new Error("This workflow is already enqueued");
    }
    this.enqueued = true;
  }

  protected _task_id_guard() {
    if (!this.task_id) {
      throw new Error(
        "This workflow is not enqueued and the execution status cannot be interrupt"
      );
    }
    return this.task_id;
  }

  protected _done_guard() {
    if (this._disposed || this.is_done) {
      throw new Error("This workflow has been disposed");
    }
  }

  /**
   * Initiates the workflow by enqueuing the prompt and setting up the task ID.
   *
   * @return {void}
   */
  public async enqueue() {
    this._enqueue_guard();

    const { client, workflow } = this;
    const { prompt, workflow: wf } = workflow;

    const { prompt_id } = await client._enqueue_prompt(prompt, {
      workflow: wf,
    });
    this.task_id = prompt_id;

    this.hook_progress();
    this.hook_image_data();
  }

  protected async hook_progress() {
    const { progress } = this.options;
    const { task_id: _task_id } = this;
    if (!progress) return;
    if (typeof progress !== "function") {
      throw new Error("progress hook must be a function");
    }
    if (typeof _task_id !== "string") {
      throw new Error("this workflow is not enqueued");
    }
    const off_progress = this.client.on_progress(progress, _task_id);
    this._connect(off_progress);
  }

  protected async hook_image_data() {
    const { client } = this;

    const off_event = client.on("image_data", (data) => {
      if (this.is_done) {
        return;
      }
      this._result.images.push({
        type: "buff",
        data,
      });
    });

    this._connect(off_event);
  }

  protected resolve_to_result(data: ComfyUiWsTypes.Messages.Executed) {
    const { client, resolver } = this;
    const { output, prompt_id, node } = data;

    this._result = resolver(this._result, output, {
      client,
      prompt_id: prompt_id,
      node_id: node,
    });
  }

  /**
   * Retrieves the execution status of the workflow.
   *
   * @return {Promise<status>} A promise that resolves with the execution status of the workflow.
   */
  public async query() {
    const task_id = this._task_id_guard();
    return this.client.getPromptStatus(task_id);
  }

  /**
   * Interrupts the execution of the workflow if it is currently enqueued.
   * Throws an error if the workflow is not enqueued or if the execution status cannot be interrupted.
   *
   * @return {Promise<void>} A promise that resolves when the interrupt is successful or rejects with an error.
   * @throws {Error} If the workflow is not enqueued or if the execution status cannot be interrupted.
   */
  public async interrupt() {
    const id = this._task_id_guard();
    const { pending, running, done } = await this.query();
    if (done) return;
    if (pending) {
      this.client.deleteItem("queue", id);
      return;
    }
    if (running) {
      return this.client.interrupt();
    }
    throw new Error(`wrong task status, id: ${id}`);
  }

  protected async collect_result() {
    const { client, resolver } = this;
    const task_id = this._task_id_guard();
    const result = await client.getPromptResult(
      task_id,
      resolver ?? RESOLVERS.image
    );
    this._result.images = [...this._result.images, ...result.images];
    this._result.data = this._result.data ?? result.data;
    return this._result;
  }

  /**
   * Waits for the workflow to complete and returns the result.
   *
   * *This function does not rely on WebSocket Events, so it will lose events output by WebSocket node
   *
   * @param {Object} options - options for waiting
   * @param {number} [options.polling_ms=1000] - polling interval in milliseconds
   * @return {Promise} promise that resolves with the result of the workflow
   */
  public async wait_polling({ polling_ms }: { polling_ms?: number } = {}) {
    this._done_guard();
    const task_id = this._task_id_guard();

    const { client } = this;
    try {
      await client.waitForPrompt(task_id, polling_ms ?? 1000);
      return await this.collect_result();
    } catch (error) {
      throw error;
    } finally {
      this.is_done = true;
      this.dispose();
    }
  }

  /**
   * Waits for the workflow to complete and returns the result.
   *
   * @return {Promise<WorkflowOutput>} promise that resolves with the result of the workflow
   */
  public async wait() {
    this._done_guard();
    const task_id = this._task_id_guard();

    return new Promise<WorkflowOutput>((resolve, reject) => {
      const done = () => {
        this.is_done = true;
        this.dispose();
      };
      this._connect(
        this.client.on("execution_interrupted", (data) => {
          if (data.prompt_id === task_id) {
            reject(new Error("Execution Interrupted"));
            done();
          }
        })
      );
      this._connect(
        this.client.on("executed", async (data) => {
          if (data.prompt_id !== task_id) {
            return;
          }
          this.resolve_to_result(data);
          const status = await this.query();
          if (!status.done) {
            return;
          }
          try {
            resolve(await this.collect_result());
          } catch (error) {
            reject(error);
          } finally {
            done();
          }
        })
      );
    });
  }
}
