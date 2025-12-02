import { ComfyUiWsTypes } from "../client/ws.types";
import { InvokedWorkflow } from "./InvokedWorkflow";
import { IWorkflow } from "./types";
import { Workflow } from "./Workflow";

export class WorkflowError extends Error {
  constructor(
    message: string,
    readonly task_id: string,
    readonly workflow?: IWorkflow,
    readonly invoked?: InvokedWorkflow,
  ) {
    super(message);
  }
}

export class WorkflowExecutionError extends WorkflowError {
  constructor(
    readonly payload: ComfyUiWsTypes.Messages.ExecutionError,
    task_id: string,
    workflow?: IWorkflow,
    invoked?: InvokedWorkflow<any>,
  ) {
    const { exception_message, exception_type } = payload;
    super(
      `Execution error: ${exception_message} (${exception_type})`,
      task_id,
      workflow,
      invoked,
    );
  }
}

export class ClientConnectionError extends Error {
  constructor(type: string, message: string) {
    super(`Client connection error (${type}): ${message}`);
  }
}

// --- guard errors ---
export class WorkflowGuardError extends Error {
  readonly workflow: IWorkflow;

  constructor(
    message: string,
    readonly invoked: InvokedWorkflow<any>,
  ) {
    super(message);
    this.workflow = invoked.workflow;
  }
}

// "This workflow is already enqueued"
export class WorkflowEnqueuedError extends WorkflowGuardError {
  constructor(invoked: InvokedWorkflow<any>) {
    super("This workflow is already enqueued", invoked);
  }
}

// 工作流没有被 enqueued，或者执行状态还未更新，缺少 task_id
export class WorkflowTaskIdError extends WorkflowGuardError {
  constructor(invoked: InvokedWorkflow<any>) {
    super(
      "This workflow is not enqueued and the execution status cannot be interrupted",
      invoked,
    );
  }
}

// 工作流已经 disposed 或者已经 结束
export class WorkflowDoneError extends WorkflowGuardError {
  constructor(invoked: InvokedWorkflow<any>) {
    const { is_done, is_disposed } = invoked;
    const message = is_done
      ? "This workflow has already finished"
      : "This workflow has been disposed";
    super(message, invoked);
  }
}

// ws 没有连接
export class WorkflowWsError extends WorkflowGuardError {
  constructor(invoked: InvokedWorkflow<any>) {
    super("WebSocket is not connected", invoked);
  }
}

// 无法获取 任务状态
export class WorkflowTaskStatusError extends WorkflowGuardError {
  constructor(invoked: InvokedWorkflow<any>) {
    const { task_id } = invoked;
    super(
      task_id
        ? `Cannot get task status for task ${task_id}`
        : "Cannot get task status",
      invoked,
    );
  }
}

// 执行被 interrupted
export class WorkflowInterruptedError extends WorkflowGuardError {
  constructor(invoked: InvokedWorkflow<any>) {
    super("Execution has been interrupted", invoked);
  }
}

// 参数错误
export class WorkflowArgumentError extends WorkflowGuardError {
  constructor(invoked: InvokedWorkflow<any>, message: string) {
    super(message, invoked);
  }
}
