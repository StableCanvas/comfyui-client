import { Client } from "../client/Client";

export namespace NSPipeline {
  export const samplers = [
    "euler",
    "euler_cfg_pp",
    "euler_ancestral",
    "euler_ancestral_cfg_pp",
    "heun",
    "heunpp2",
    "exp_heun_2_x0",
    "exp_heun_2_x0_sde",
    "dpm_2",
    "dpm_2_ancestral",
    "lms",
    "dpm_fast",
    "dpm_adaptive",
    "dpmpp_2s_ancestral",
    "dpmpp_2s_ancestral_cfg_pp",
    "dpmpp_sde",
    "dpmpp_sde_gpu",
    "dpmpp_2m",
    "dpmpp_2m_cfg_pp",
    "dpmpp_2m_sde",
    "dpmpp_2m_sde_gpu",
    "dpmpp_2m_sde_heun",
    "dpmpp_2m_sde_heun_gpu",
    "dpmpp_3m_sde",
    "dpmpp_3m_sde_gpu",
    "ddpm",
    "lcm",
    "ipndm",
    "ipndm_v",
    "deis",
    "res_multistep",
    "res_multistep_cfg_pp",
    "res_multistep_ancestral",
    "res_multistep_ancestral_cfg_pp",
    "gradient_estimation",
    "gradient_estimation_cfg_pp",
    "er_sde",
    "seeds_2",
    "seeds_3",
    "sa_solver",
    "sa_solver_pece",
    "ddim",
    "uni_pc",
    "uni_pc_bh2",
  ] as const;
  export const schedulers = [
    "simple",
    "sgm_uniform",
    "karras",
    "exponential",
    "ddim_uniform",
    "beta",
    "normal",
    "linear_quadratic",
    "kl_optimal",
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

    client: Client | null;
  };
}
