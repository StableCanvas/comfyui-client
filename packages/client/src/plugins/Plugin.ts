import { Client } from "../client/Client";

type FnHook<
  N extends keyof Client = keyof Client,
  Fn extends Client[N] = Client[N],
> = Fn extends (...args: any) => any
  ? {
      type: "function";
      name: N;
      fn: (original: Fn, ...args: Parameters<Fn>) => ReturnType<Fn>;
    }
  : never;

type PluginHook<
  N extends keyof Client = keyof Client,
  Fn extends Client[N] = Client[N],
> = FnHook<N, Fn>;

export class Plugin {
  private hooks = [] as PluginHook[];

  public install(instance: Client) {
    for (const hook of this.hooks) {
      const ins = instance as any;
      const original = ins[hook.name].bind(instance);
      ins[hook.name] = (...args: Parameters<typeof original>) => {
        return (hook.fn as any).bind(instance)(original, ...args);
      };
    }
  }

  protected addHook<
    N extends keyof Client = keyof Client,
    Fn extends Client[N] = Client[N],
  >(hook: PluginHook<N, Fn>) {
    this.hooks.push(hook);
  }
}
