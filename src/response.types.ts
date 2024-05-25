export namespace ComfyUIClientResponseTypes {
  export interface SystemStatsRoot {
    system: System;
    devices: Device[];
  }

  export interface System {
    os: string;
    python_version: string;
    embedded_python: boolean;
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

  export type QueuePrompt =
    | {
        prompt_id: string;
        number: number;
        node_errors: any;
      }
    | {
        error: string;
        node_errors: Record<
          string,
          {
            class_type: string;
            dependent_outputs: string[];
            errors: Array<{
              details: string;
              extra_info: any;
              message: string;
              type: string;
            }>;
          }
        >;
      };
}
