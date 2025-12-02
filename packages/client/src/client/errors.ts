export class ClientError extends Error {
  constructor(message: string) {
    super(message);
  }
}

// 等待 prompt 执行超时
export class PromptTimeoutError extends ClientError {
  constructor(prompt_id: string, timeout_ms: number) {
    super(`Prompt ${prompt_id} timed out after ${timeout_ms} ms`);
  }
}

// enqueue prompt 错误
export class PromptEnqueueError extends ClientError {
  constructor(err_msg: string) {
    super(`Failed to enqueue prompt: ${err_msg}`);
  }
}

// client enqueue 参数错误
export class ClientEnqueueError extends ClientError {
  constructor(err_msg: string) {
    super(`Client enqueue error: ${err_msg}`);
  }
}

// prompt_id 错误，没有找到对应的 prompt 在 history 中
export class PromptNotFoundError extends ClientError {
  constructor(prompt_id: string) {
    super(`Prompt [${prompt_id}] not found in history`);
  }
}

// prompt 执行失败，状态不是 success
export class PromptExecutionFailedError extends ClientError {
  constructor(prompt_id: string, status: string) {
    super(`Prompt ${prompt_id} execution failed with status: ${status}`);
  }
}

// client 请求执行失败
export class ClientRequestError extends ClientError {
  constructor(err_msg: string) {
    super(`Client request error: ${err_msg}`);
  }
}

// client polling timeout
export class PollingTimeoutError extends ClientError {
  constructor(timeout_ms: number) {
    super(`Polling timed out after ${timeout_ms} ms`);
  }
}

// client web socket timeout
export class WebSocketTimeoutError extends ClientError {
  constructor(timeout_ms: number) {
    super(`WebSocket timed out after ${timeout_ms} ms`);
  }
}

// connect 参数错误
export class ConnectError extends ClientError {
  constructor(err_msg: string) {
    super(`Connect error: ${err_msg}`);
  }
}

// 解析 ws 数据错误
export class WebSocketParseError extends ClientError {
  constructor(err_msg: string) {
    super(`WebSocket parse error: ${err_msg}`);
  }
}

// http errors
export class HttpError extends Error {
  status: number;
  json: any;

  constructor(message: string, status: number, json?: any) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.json = json;
  }
}
