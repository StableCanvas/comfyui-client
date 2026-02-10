/**
 * [0,0,0] => "AAAA="
 * @param arrayBuffer - The ArrayBuffer to convert to base64.
 * @returns The base64 representation of the ArrayBuffer.
 */
export const arrayBufferToBase64 = (arrayBuffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(arrayBuffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return globalThis.btoa(binary);
};
