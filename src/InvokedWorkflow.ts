import { ComfyUIApiClient } from "./ComfyUIApiClient";
import { isNone } from "./misc";
import type { WorkflowOutput, IWorkflow } from "./types";

export class InvokedWorkflow {
  protected _task_id?: Promise<string>;
  protected _enqueue_req?: ReturnType<ComfyUIApiClient["_enqueue_prompt"]>;

  protected _result: WorkflowOutput = {
    images: [],
    prompt_id: "",
  };

  executed = false;

  constructor(public workflow: IWorkflow, public client: ComfyUIApiClient) {}

  public enqueue() {
    const { prompt, workflow: wf } = this.workflow;
    this._enqueue_req = this.client._enqueue_prompt(prompt, { workflow: wf });
    this._task_id = this._enqueue_req.then((data) => data.prompt_id);

    this._enqueue_req.then((data) => {
      this._result.prompt_id = data.prompt_id;
    });
  }

  protected load_result_data(data: any) {
    const { output: executed_output } = data;
    const { images = [] } = executed_output || {};

    // collect url images
    for (const image of images) {
      const { filename, subfolder, type } = image || {};
      if (isNone(filename) || isNone(subfolder) || type !== "output") {
        continue;
      }
      this._result.images.push({
        type: "url",
        data: this.client.viewURL(filename, subfolder, type),
      });
    }
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
          this.load_result_data(data);
          this.executed = true;
          resolve(this._result);
          done();
        }),
      ]);
    });
  }
}
