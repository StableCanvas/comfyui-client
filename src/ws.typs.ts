export namespace ComfyUiWsTypes {
  export namespace Messages {
    export interface Executed {
      node: string;
      display_node: string;
      output: Record<string, any>;
      prompt_id: string;
    }
    export interface ExecutionInterrupted {
      prompt_id: string;
      node_id: string;
      node_type: string;
      executed: string[];
    }
    export interface Executing {
      node: string;
      prompt_id: string;
    }
    export interface Progress {
      value: number;
      max: number;
      prompt_id: string;
      last_prompt_id: string;
      node: string;
    }
    export interface Status {
      status: {
        exec_info: {
          queue_remaining: number;
        };
      };
    }
  }
}
