export const uuidv4 = () =>
  "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

export const isNone = (x: any): x is null | undefined =>
  x === null || x === undefined;

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
