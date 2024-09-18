export class Disposable {
  protected _disposed = false;
  protected _disposed_cbs = [] as any[];
  public dispose() {
    if (this._disposed) {
      return;
    }
    this._disposed = true;

    this._disposed_cbs.forEach((cb) => {
      if (typeof cb === "function") {
        cb();
      }
    });
  }
  public _connect(cb: () => void) {
    if (this._disposed) {
      cb();
      return;
    }
    this._disposed_cbs.push(cb);
  }
}
