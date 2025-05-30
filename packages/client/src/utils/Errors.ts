export namespace Errors {
  export class HttpError extends Error {
    status: number;
    json: any;

    constructor(message: string, status: number, json?: any) {
      super(message);
      this.name = "HttpError";
      this.status = status;
      this.json = json;
    }
  }
}
