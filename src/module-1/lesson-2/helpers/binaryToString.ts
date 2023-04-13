export const binaryToString = (bytes: Uint8Array) =>
  bytes.reduce((str, byte) => str + byte.toString(2).padStart(8, '0'), '')
