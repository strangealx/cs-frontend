import { Bit } from './types'

export class BitGetter {
  #bytes: Uint8Array

  constructor(bytes: Uint8Array) {
    if (bytes.length === 0) {
      throw new Error('empty array makes no sense')
    }

    this.#bytes = new Uint8Array(bytes)
  }

  get bytes() {
    return this.#bytes
  }

  protected assert(byteIndex: number, bitIndex: number) {
    const { bytes } = this

    if (byteIndex < 0 || byteIndex >= bytes.length) {
      throw new Error(`array index: "${byteIndex}" is out of range`)
    }

    if (bitIndex < 0 || bitIndex > 7) {
      throw new Error(`bit index: "${bitIndex}" is out of range (0 - 7)`)
    }
  }

  get(byteIndex: number, bitIndex: number): Bit {
    const { bytes } = this

    this.assert(byteIndex, bitIndex)

    return (bytes[byteIndex] & (1 << bitIndex)) === 0 ? 0 : 1
  }
}

export const createBitGetter = (bytes: Uint8Array) => new BitGetter(bytes)
