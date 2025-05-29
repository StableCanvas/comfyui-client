import { Client } from "../client/Client";
import { WorkflowOutputResolver } from "../client/types";
import type { WorkflowOutput, IWorkflow } from "./types";
import { RESOLVERS } from "../builtins";
import { ComfyUIClientEvents, ComfyUiWsTypes } from "../client/ws.types";
import EventEmitter from "eventemitter3";
import { Disposable } from "../utils/Disposable";

export class InvokedWorkflow<T = unknown> extends Disposable {
  protected task_id?: string;

  protected _result: WorkflowOutput<T> = {
    images: [],
    prompt_id: "",
  };

  is_done = false;
  enqueued = false;

  workflow: IWorkflow;
  client: Client;
  resolver: WorkflowOutputResolver<T>;

  constructor(
    readonly options: {
      workflow: IWorkflow;
      client: Client;
      resolver?: WorkflowOutputResolver<T>;
      progress?: (p: ComfyUiWsTypes.Messages.Progress) => void;
    },
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
        "This workflow is not enqueued and the execution status cannot be interrupt",
      );
    }
    return this.task_id;
  }

  protected _done_guard() {
    if (this._disposed || this.is_done) {
      throw new Error("This workflow has been disposed");
    }
  }

  protected _ws_guard() {
    if (this.client.socket === null) {
      throw new Error("WebSocket is not connected");
    }
  }

  protected is_owner_event(...args: any[]) {
    const [data] = (args as any[]) || [];
    const { task_id } = this;
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
      if (!this.is_owner_event(...args)) return;
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
      if (!this.is_owner_event(...args)) return;
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
      // NOTE: Actually, it is impossible to determine whether it is the image of the current workflow, so the internal value is_done is used to determine, because comfyui is non-concurrent by default
      // TODO: Use message judgment, that is, use the last `executed` message to determine which workflow result it is
      if (this.is_done) {
        return;
      }
      this._result.images.push({
        type: "buff",
        data: data.image,
        mime: data.mime,
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
      this.when_interrupted((data) => {
        reject(new Error("Execution Interrupted"));
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
      const maybe_done = async () => {
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
      };
      this.when_interrupted((data) => {
        reject(new Error("Execution Interrupted"));
        done();
      });
      // NOTE: 这里的意思是，如果其他地方导致 dispose ，那么也应该调用这个保证 promise resolve
      this._connect(maybe_done);
      this._connect(
        this.client.on("executed", async (data) => {
          if (data.prompt_id !== task_id) {
            return;
          }
          this.resolve_to_result(data);
          maybe_done();
        }),
      );
      this._connect(
        this.client.on("execution_success", async (data) => {
          if (data.prompt_id !== task_id) {
            return;
          }
          maybe_done();
        }),
      );
    });
  }
}
