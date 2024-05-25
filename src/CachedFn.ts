export type CachedFnOptions = { expire_time?: number; enabled?: boolean };

export class CachedFn {
  static _defaultExpire: number = 60 * 1000;
  protected _cached = new Map<string, { result: any; expire: number }>();

  protected expire_time_ms: number;
  protected enabled: boolean;

  constructor(options?: CachedFnOptions) {
    this.expire_time_ms = options?.expire_time ?? CachedFn._defaultExpire;
    this.enabled = options?.enabled ?? true;
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
      const cacheKey = `${key}-${argsHash}`;
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
