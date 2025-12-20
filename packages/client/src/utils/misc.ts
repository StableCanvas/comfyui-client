export const uuidv4 = () =>
  "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

export const isNone = (x: any): x is null | undefined =>
  x === null || x === undefined;
export const debounce = <F extends (...args: any[]) => any>(
  fn: F,
  wait_ms: number,
): ((...args: Parameters<F>) => void) => {
  let timeout: any = null;
  return (...args: Parameters<F>): void => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait_ms);
  };
};
