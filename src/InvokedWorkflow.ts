import { ComfyUIApiClient } from "./ComfyUIApiClient";
import { WorkflowOutputResolver } from "./client.types";
import { isNone } from "./misc";
import type { WorkflowOutput, IWorkflow } from "./types";
import { RESOLVERS } from "./builtins";
import { ComfyUiWsTypes } from "./ws.typs";

export class InvokedWorkflow<T = unknown> {
  protected _task_id?: Promise<string>;
  protected _enqueue_req?: ReturnType<ComfyUIApiClient["_enqueue_prompt"]>;

  protected _result: WorkflowOutput<T> = {
    images: [],
    prompt_id: "",
  };

  executed = false;

  workflow: IWorkflow;
  client: ComfyUIApiClient;
  resolver: WorkflowOutputResolver<T>;

  constructor(
    readonly options: {
      workflow: IWorkflow;
      client: ComfyUIApiClient;
      resolver?: WorkflowOutputResolver<T>;
    }
  ) {
    const { workflow, client, resolver } = options;
    this.workflow = workflow;
    this.client = client;
    this.resolver = resolver || (RESOLVERS.image as any);
  }

  public enqueue() {
    const { client, workflow } = this;
    const { prompt, workflow: wf } = workflow;

    this._enqueue_req = client._enqueue_prompt(prompt, { workflow: wf });
    this._task_id = this._enqueue_req.then((data) => data.prompt_id);

    this._enqueue_req.then((data) => {
      this._result.prompt_id = data.prompt_id;
    });
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

  public async query() {
    if (!this._task_id) {
      throw new Error(
        "This workflow is not enqueued and the execution status cannot be queried"
      );
    }
    return this.client.getPromptStatus(await this._task_id);
  }

  public async interrupt() {
    if (!this._task_id) {
      throw new Error(
        "This workflow is not enqueued and the execution status cannot be interrupt"
      );
    }
    const id = await this._task_id;
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

  public async wait() {
    if (!this._task_id) {
      throw new Error(
        "This workflow is not enqueued and the execution status cannot be wait"
      );
    }
    const task_id = await this._task_id;
    return new Promise<WorkflowOutput>((resolve, reject) => {
      const zone = (fn: (done: () => void) => Function[]) => {
        let offs: Function[] = [];
        offs = fn(() => offs.forEach((cb) => cb()));
      };
      zone((done) => [
        this.client.on("execution_interrupted", (data) => {
          if (data.prompt_id === task_id) {
            reject(new Error("Execution Interrupted"));
            done();
          }
        }),
        this.client.on("image_data", (data) => {
          if (this.executed) {
            return;
          }
          this._result.images.push({
            type: "buff",
            data,
          });
        }),
        this.client.on("executed", (data) => {
          if (data.prompt_id !== task_id) {
            return;
          }
          this.resolve_to_result(data);
          this.executed = true;
          resolve(this._result);
          done();
        }),
      ]);
    });
  }
}
