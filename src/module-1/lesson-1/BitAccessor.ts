import { Bit } from './types'
import { BitGetter } from './BitGetter'

export class BitAccessor extends BitGetter {
  set(byteIndex: number, bitIndex: number, bit: Bit) {
    const { bytes } = this
    const byte = bytes[byteIndex]

    this.assert(byteIndex, bitIndex)

    // prettier-ignore
    bytes[byteIndex] = bit === 1
      ? byte | (1 << bitIndex)
      : byte & ~(1 << bitIndex)
  }
}

export const createBitAccessor = (bytes: Uint8Array) => new BitAccessor(bytes)
