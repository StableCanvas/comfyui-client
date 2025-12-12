export namespace ComfyUiWsTypes {
  export namespace Messages {
    export interface Executed {
      node: string;
      display_node: string;
      output: Record<string, any>;
      prompt_id: string;
      timestamp: number;
    }
    export interface ExecutionInterrupted {
      prompt_id: string;
      node_id: string;
      node_type: string;
      executed: string[];
    }
    export interface Executing {
      node: string;
      display_node: string;
      prompt_id: string;
      timestamp: number;
    }
    export interface Progress {
      value: number;
      max: number;
      prompt_id: string;
      node: string;
    }
    export interface ProgressState {
      prompt_id: string;
      nodes: Record<
        string,
        {
          value: number;
          max: number;
          state: string;
          node_id: string;
          display_node_id: string;
          parent_node_id: string | null;
          real_node_id: string;
        }
      >;
    }
    export interface Status {
      status: {
        exec_info: {
          queue_remaining: number;
        };
      };
    }
    export interface ExecutionStart {
      prompt_id: string;
      timestamp: number;
    }
    export interface ExecutionError {
      prompt_id: string;
      node_id: string;
      node_type: string;
      executed: string[];
      exception_message: string;
      exception_type: string;
      traceback: string;
      current_inputs: any;
      current_outputs: any[];
    }
    export interface ExecutionCached {
      nodes: string[];
      prompt_id: string;
      timestamp: number;
    }
    export interface ExecutionSuccess {
      prompt_id: string;
      timestamp: number;
    }
  }
  export namespace BinaryMessages {
    export interface ProgressText {
      nodeId: string;
      text: string;
    }
    export interface BinaryPreviewWithMetadata {
      blob: Blob;
      nodeId: string;
      displayNodeId: string;
      parentNodeId: string;
      realNodeId: string;
      promptId: string;
    }
  }
}

export type ComfyUIClientEvents = {
  status: [ComfyUiWsTypes.Messages.Status["status"] | null];
  progress: [ComfyUiWsTypes.Messages.Progress];
  progress_state: [ComfyUiWsTypes.Messages.ProgressState];

  executing: [ComfyUiWsTypes.Messages.Executing];
  executed: [ComfyUiWsTypes.Messages.Executed];
  execution_interrupted: [ComfyUiWsTypes.Messages.ExecutionInterrupted];
  execution_start: [ComfyUiWsTypes.Messages.ExecutionStart];
  execution_error: [ComfyUiWsTypes.Messages.ExecutionError];
  execution_cached: [ComfyUiWsTypes.Messages.ExecutionCached];
  execution_success: [ComfyUiWsTypes.Messages.ExecutionSuccess];

  // WS events (Events sent by the client itself)
  connected: [];
  reconnected: [];
  reconnecting: [];

  /**
   * binary image preview
   *
   * from binary data sent by the server
   */
  b_preview: [Blob];
  b_preview_with_metadata: [
    ComfyUiWsTypes.BinaryMessages.BinaryPreviewWithMetadata,
  ];

  /**
   * progress text
   *
   * from binary data sent by the server
   */
  progress_text: [ComfyUiWsTypes.BinaryMessages.ProgressText];

  /**
   * load image data from websocket
   */
  image_data: [
    {
      image: ArrayBuffer;
      mime: string;
    },
  ];

  /**
   * get all messages
   */
  message: [MessageEvent<any>];

  /**
   * close client
   */
  close: [];

  // network connection errors
  connection_error: [{ type: string; message: string }];

  /**
   * unhandled event message
   */
  unhandled: [{ type: string; data: any }];
};
