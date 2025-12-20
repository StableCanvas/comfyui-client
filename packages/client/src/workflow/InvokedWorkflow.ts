import { Client } from "../client/Client";
import { WorkflowOutputResolver } from "../client/types";
import type { WorkflowOutput, IWorkflow } from "./types";
import { RESOLVERS } from "../builtins";
import { ComfyUIClientEvents, ComfyUiWsTypes } from "../client/ws.types";
import EventEmitter from "eventemitter3";
import { Disposable } from "../utils/Disposable";
import {
  WorkflowArgumentError,
  WorkflowDoneError,
  WorkflowEnqueuedError,
  WorkflowExecutionError,
  WorkflowInterruptedError,
  WorkflowTaskIdError,
  WorkflowTaskStatusError,
  WorkflowWsError,
} from "./errors";
import { debounce } from "../utils/misc";
import { ConnectError } from "../client/errors";

export class InvokedWorkflow<T = unknown> extends Disposable {
  protected _task_id?: string;

  protected _result: WorkflowOutput<T> = {
    images: [],
    prompt_id: "",
  };

  is_done = false;
  enqueued = false;

  workflow: IWorkflow;
  client: Client;
  resolver: WorkflowOutputResolver<T>;

  /**
   * 因为 comfyui 的 websocket events 顺序混乱，在 execution_success 立马结束也可能导致事件丢失
   *
   * Because the order of comfyui's websocket events is chaotic, the execution_success event may end immediately, causing events to be lost
   */
  delay_done_ms = 500;

  /**
   *  The current task is being executed via WebSocket; this flag is used to determine whether the current `image_data` originates from this task.
   */
  is_current_ws_executing = false;

  constructor(
    readonly options: {
      workflow: IWorkflow;
      client: Client;
      resolver?: WorkflowOutputResolver<T>;
      progress?: (p: ComfyUiWsTypes.Messages.Progress) => void;
      on_error?: (e: Error) => void;
    },
  ) {
    super();
    const { workflow, client, resolver } = options;
    this.workflow = workflow;
    this.client = client;
    this.resolver = resolver || (RESOLVERS.image as any);
  }

  public get is_disposed() {
    return this._disposed;
  }

  public get task_id() {
    return this._task_id;
  }

  protected _enqueue_guard() {
    if (this.enqueued) throw new WorkflowEnqueuedError(this);
    this.enqueued = true;
  }

  protected _task_id_guard() {
    if (!this._task_id) throw new WorkflowTaskIdError(this);
    return this._task_id;
  }

  protected _done_guard() {
    if (this._disposed || this.is_done) throw new WorkflowDoneError(this);
  }

  protected _ws_guard() {
    if (this.client.closed)
      throw new ConnectError(
        "The WebSocket connection has been closed. Please ensure that the client is connected.",
      );
    if (this.client.socket === null) throw new WorkflowWsError(this);
  }

  protected is_owner_event(...args: any[]) {
    const [data] = (args as any[]) || [];
    const { _task_id: task_id } = this;
    if (!task_id) return false;
    if (typeof data !== "object" || data === null) return false;
    if (!("prompt_id" in data) || data.prompt_id !== task_id) return false;
    return true;
  }

  /**
   * Adds an event listener for the specified event type.
   */
  on<T extends EventEmitter.EventNames<ComfyUIClientEvents>>(
    type: T,
    callback: EventEmitter.EventListener<ComfyUIClientEvents, T>,
    options?: any,
  ) {
    this._done_guard();
    const { client } = this;
    const off = client.on(type, (...args) => {
      if (type === "image_data" || type === "b_preview") {
        if (!this.is_current_ws_executing) return;
      } else if (!this.is_owner_event(...args)) return;
      callback(...args);
    });
    this._connect(off);
    return off;
  }

  /**
   * Adds an once event listener for the specified event type.
   */
  once<T extends EventEmitter.EventNames<ComfyUIClientEvents>>(
    type: T,
    callback: EventEmitter.EventListener<ComfyUIClientEvents, T>,
    options?: any,
  ) {
    this._done_guard();
    const { client } = this;
    const off = client.on(type, (...args) => {
      if (type === "image_data" || type === "b_preview") {
        if (!this.is_current_ws_executing) return;
      } else if (!this.is_owner_event(...args)) return;
      callback(...args);
      off();
    });
    this._connect(off);
    return off;
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
    this._task_id = prompt_id;

    this.hook_progress();
    this.hook_image_data();
    this.hook_executing();
  }

  protected async hook_progress() {
    const { progress } = this.options;
    const { _task_id: _task_id } = this;
    if (!progress) return;
    if (typeof progress !== "function") {
      throw new WorkflowArgumentError(
        this,
        "options.progress hook must be a function",
      );
    }
    if (typeof _task_id !== "string") throw new WorkflowTaskIdError(this);
    const off_progress = this.client.on_progress(progress, _task_id);
    this._connect(off_progress);
  }

  protected async hook_executing() {
    const { client } = this;
    const task_id = this._task_id_guard();
    this._connect(
      client.on("executing", (data) => {
        this.is_current_ws_executing = data?.prompt_id === task_id;
      }),
    );
  }

  protected async hook_image_data() {
    const { client } = this;
    this._connect(
      client.on("image_data", (data) => {
        if (this.is_current_ws_executing === false) return;

        this._result.images.push({
          type: "buff",
          data: data.image,
          mime: data.mime,
        });
      }),
    );
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
      return this.client.interrupt(id);
    }
    throw new WorkflowTaskStatusError(this);
  }

  protected async collect_result() {
    const { client, resolver } = this;
    const task_id = this._task_id_guard();
    const result = await client.getPromptResult(
      task_id,
      resolver ?? RESOLVERS.image,
    );
    this._result.images = [...this._result.images, ...result.images];
    this._result.data = this._result.data ?? result.data;
    return this._result;
  }

  protected when_interrupted(
    cb: (data: ComfyUiWsTypes.Messages.ExecutionInterrupted) => any,
  ) {
    const task_id = this._task_id_guard();
    this._connect(
      this.client.on("execution_interrupted", (data) => {
        if (data.prompt_id === task_id) {
          cb(data);
        }
      }),
    );
  }

  protected when_execution_error(
    cb: (data: ComfyUiWsTypes.Messages.ExecutionError) => any,
  ) {
    const task_id = this._task_id_guard();
    this._connect(
      this.client.on("execution_error", (data) => {
        if (data.prompt_id === task_id) {
          cb(data);
        }
      }),
    );
  }

  /**
   * Listen for the start event of the workflow.
   * @param {Function} cb - The callback function that will be called when the workflow starts.
   * @return {Function} A function that can be used to remove the listener.
   */
  public on_start(cb: () => void) {
    const task_id = this._task_id_guard();
    return this._connect(
      this.client.on("execution_start", (data) => {
        if (data.prompt_id === task_id) cb();
      }),
    );
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
    return new Promise<WorkflowOutput>(async (resolve, reject) => {
      const done = () => {
        this.is_done = true;
        this.dispose();
      };

      // NOTE: 这里监听如果 client 没有开启 ws 是拿不到的，但是其实可以 client 开启 ws 同时这里仍然使用 polling 来同步状态，所以，这里也监听这个状态
      this.when_interrupted((data) => {
        reject(new WorkflowInterruptedError(this));
        done();
      });
      this.when_execution_error((data) => {
        reject(new WorkflowExecutionError(data, task_id, this.workflow, this));
        done();
      });

      try {
        await client.waitForPrompt(task_id, polling_ms ?? 1000);
        const result = await this.collect_result();
        resolve(result);
      } catch (error) {
        reject(error);
      } finally {
        done();
      }
    }).catch((err) => {
      this.options.on_error?.(err);
      return Promise.reject(err);
    });
  }

  /**
   * Waits for the workflow to complete and returns the result.
   *
   * @return {Promise<WorkflowOutput>} promise that resolves with the result of the workflow
   */
  public async wait() {
    this._done_guard();
    this._ws_guard();

    const task_id = this._task_id_guard();

    return new Promise<WorkflowOutput>((resolve, reject) => {
      const done = () => {
        this.is_done = true;
        this.dispose();
      };
      const maybe_done = debounce(async () => {
        // NOTE: Because we are performing a delayed query for "done," it's possible that multiple checks will be initiated. Therefore, we need to determine here whether it has already been done. #23
        if (this.is_done) return;
        try {
          const status = await this.query();
          if (!status.done) {
            return;
          }
          resolve(this._result);
          done();
        } catch (error) {
          reject(error);
          done();
        }
      }, this.delay_done_ms);
      this.when_interrupted((data) => {
        reject(new WorkflowInterruptedError(this));
        done();
      });
      this.when_execution_error((data) => {
        reject(new WorkflowExecutionError(data, task_id, this.workflow, this));
        done();
      });
      // NOTE: The implication here is that if something else triggers the `dispose` method, then this should also guarantee that the promise is resolved.
      this._connect(maybe_done);
      this._connect(
        this.client.on("executed", async (data) => {
          if (data.prompt_id !== task_id) return;
          this.resolve_to_result(data);
          maybe_done();
        }),
      );
      this._connect(
        this.client.on("execution_success", async (data) => {
          if (data.prompt_id !== task_id) return;
          maybe_done();
        }),
      );
    }).catch((err) => {
      this.options.on_error?.(err);
      return Promise.reject(err);
    });
  }
}
