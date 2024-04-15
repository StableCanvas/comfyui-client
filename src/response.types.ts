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
}
