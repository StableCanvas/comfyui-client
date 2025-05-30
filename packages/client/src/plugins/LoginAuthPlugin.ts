import { Plugin } from "./Plugin";

/**
 * Provide api-auth support for this https://github.com/liusida/ComfyUI-Login/tree/main extension
 */
export class LoginAuthPlugin extends Plugin {
  constructor(
    readonly options: {
      token: string;
    },
  ) {
    super();

    this.addHook({
      type: "function",
      name: "apiURL",
      fn: (original, ...args) => {
        const url = original(...args);
        const urlObj = new URL(url);
        urlObj.searchParams.set("token", this.options.token);
        return urlObj.toString();
      },
    });

    this.addHook({
      type: "function",
      name: "wsURL",
      fn: (original, ...args) => {
        const url = original(...args);
        const urlObj = new URL(url);
        urlObj.searchParams.set("token", this.options.token);
        return urlObj.toString();
      },
    });
  }
}
