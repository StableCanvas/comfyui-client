import { ComfyUIApiClient } from "../ComfyUIApiClient";

export namespace NSPipeline {
  // prettier-ignore
  export const samplers = [
    'euler',            'euler_cfg_pp',
    'euler_ancestral',  'euler_ancestral_cfg_pp',
    'heun',             'heunpp2',
    'dpm_2',            'dpm_2_ancestral',
    'lms',              'dpm_fast',
    'dpm_adaptive',     'dpmpp_2s_ancestral',
    'dpmpp_sde',        'dpmpp_sde_gpu',
    'dpmpp_2m',         'dpmpp_2m_sde',
    'dpmpp_2m_sde_gpu', 'dpmpp_3m_sde',
    'dpmpp_3m_sde_gpu', 'ddpm',
    'lcm',              'ipndm',
    'ipndm_v',          'deis',
    'ddim',             'uni_pc',
    'uni_pc_bh2'
  ] as const;
  export const schedulers = [
    "normal",
    "karras",
    "exponential",
    "sgm_uniform",
    "simple",
    "ddim_uniform",
    "beta",
  ] as const;

  export type PipeContext = {
    seed: number;
    steps: number;
    cfg: number;
    sampler_name: (typeof samplers)[number] | ({} & string);
    scheduler: (typeof schedulers)[number] | ({} & string);
    denoise: number;
    width: number;
    height: number;
    batch_size: number;
    ckpt_name: string;
    positive: string;
    negative: string;

    /**
     * NOTE: dependence custom node: `ETN_LoadImageBase64` and `ETN_LoadMaskBase64`
     */
    input_image: Buffer | null;
    input_mask: Buffer | null;
    grow_mask_by: number;

    client: ComfyUIApiClient | null;
  };
}
