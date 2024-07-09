import { ComfyUIApiClient } from "./ComfyUIApiClient";

type FnHook<
  N extends keyof ComfyUIApiClient = keyof ComfyUIApiClient,
  Fn extends ComfyUIApiClient[N] = ComfyUIApiClient[N],
> = Fn extends (...args: any) => any
  ? {
      type: "function";
      name: N;
      fn: (original: Fn, ...args: Parameters<Fn>) => ReturnType<Fn>;
    }
  : never;

type PluginHook<
  N extends keyof ComfyUIApiClient = keyof ComfyUIApiClient,
  Fn extends ComfyUIApiClient[N] = ComfyUIApiClient[N],
> = FnHook<N, Fn>;

export class ClientPlugin {
  private hooks = [] as PluginHook[];

  public install(instance: ComfyUIApiClient) {
    for (const hook of this.hooks) {
      const ins = instance as any;
      const original = ins[hook.name].bind(instance);
      ins[hook.name] = (...args: Parameters<typeof original>) => {
        return (hook.fn as any).bind(instance)(original, ...args);
      };
    }
  }

  protected addHook<
    N extends keyof ComfyUIApiClient = keyof ComfyUIApiClient,
    Fn extends ComfyUIApiClient[N] = ComfyUIApiClient[N],
  >(hook: PluginHook<N, Fn>) {
    this.hooks.push(hook);
  }
}
