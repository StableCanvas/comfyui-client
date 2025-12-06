export namespace ComfyUIClientResponseTypes {
  export interface SystemStatsRoot {
    system: System;
    devices: Device[];
  }

  export interface System {
    os: string;
    python_version: string;
    embedded_python: boolean;
    comfyui_version: string;
    pytorch_version: string;
    required_frontend_version?: string;
    argv: string[];
    ram_total: number;
    ram_free: number;
    // Cloud-specific fields
    cloud_version?: string;
    comfyui_frontend_version?: string;
    workflow_templates_version?: string;
  }

  export interface Device {
    name: string;
    type: string;
    index: number;
    vram_total: number;
    vram_free: number;
    torch_vram_total: number;
    torch_vram_free: number;
  }

  interface NodeConfig {
    input: NodeInputs;
    output: Array<string[] | string>;
    output_is_list: boolean[];
    output_name: string[];
    name: string;
    display_name: string;
    description: string;
    category: string;
    output_node: boolean;
  }
  type NodeInputs = {
    required?: Record<string, NodeSlot>;
    optional?: Record<string, NodeSlot>;
    hidden?: Record<string, NodeSlot>;
  };

  type NodeSlot = [string, NodeOptions] | [string];

  type NodeOptions = Record<string, any>;

  export interface ObjectInfo {
    [k: string]: NodeConfig;
  }

  export type ApiError = {
    type: string;
    message: string;
    details: string;
    extra_info?: {
      input_name?: string;
    };
  };

  export type NodeError = {
    errors: ApiError[];
    class_type: string;
    dependent_outputs: any[];
  };

  export type QueuePromptSuccess = {
    prompt_id: string;
    exec_info?: {
      queue_remaining?: number;
    };
  };
  export type QueuePromptError = {
    error: string | NodeError;
    node_errors: Record<string, NodeError>;
  };

  export type QueuePrompt = QueuePromptSuccess | QueuePromptError;
}
