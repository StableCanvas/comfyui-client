export type CachedFnOptions = {
  expire_time?: number;
  enabled?: boolean;
};

class GlobalCacheHub {
  static KEY = "__COMFY_UI_CLIENT_CACHE__";
  protected _cached: Map<string, { result: any; expire: number }>;

  constructor() {
    this._cached = (globalThis as any)[GlobalCacheHub.KEY] || new Map();
    (globalThis as any)[GlobalCacheHub.KEY] = this._cached;
  }

  clear() {
    this._cached.clear();
  }

  get(key: string) {
    return this._cached.get(key);
  }

  set(key: string, value: { result: any; expire: number }) {
    this._cached.set(key, value);
  }
}

export class CachedFn {
  static _defaultExpire: number = 60 * 1000;

  protected expire_time_ms: number;
  protected enabled: boolean;

  protected _cached = new GlobalCacheHub();

  protected cache_ns: string = "";

  constructor(ns: string, options?: CachedFnOptions) {
    this.expire_time_ms = options?.expire_time ?? CachedFn._defaultExpire;
    this.enabled = options?.enabled ?? true;
    this.cache_ns = ns;
  }

  public reset() {
    this._cached.clear();
  }

  private _hashArgs(args: any[]): string {
    try {
      return JSON.stringify(args);
    } catch (error) {
      return args.toString();
    }
  }

  public warp<ARGS extends any[], RET>(
    key: string,
    fn: (...args: ARGS) => RET
  ): (...args: ARGS) => RET {
    if (!this.enabled) {
      return fn;
    }
    return (...args: ARGS) => {
      const now = Date.now();
      const argsHash = this._hashArgs(args);
      const cacheKey = `${this.cache_ns}:${key}:${argsHash}`;
      const hit_cached = this._cached.get(cacheKey);

      if (hit_cached && hit_cached.expire > now) {
        return hit_cached.result;
      }

      const result = fn(...args);
      this._cached.set(cacheKey, { result, expire: now + this.expire_time_ms });
      return result;
    };
  }
}
