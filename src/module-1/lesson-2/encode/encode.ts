import { BitAccessor } from '../../lesson-1'
import { BITS_PER_BYTE, MAX_BYTE_INDEX } from './consts'
import { valueToBits } from './helpers'
import { Schema, ValueList } from './types'

export const encode = (input: ValueList, schema: Schema) => {
  const totalBits = schema.reduce((carry, [bits]) => carry + bits, 0)
  const totalBytes = Math.ceil(totalBits / BITS_PER_BYTE)
  const view = new Uint8Array(totalBytes)
  const bitAccessor = new BitAccessor(view)
  let bytesCounter = 0
  let bitsCounter = 0

  if (input.length !== schema.length) {
    throw new Error('Invalid schema or input')
  }

  for (let i = 0; i < input.length; i += 1) {
    const [schemaBits, schemaType] = schema[i]
    const value = input[i]
    const bits = valueToBits(value, schemaType)
    const bitsLength = bits.length

    if (bitsLength > schemaBits) {
      throw new Error(`Can't put ${bitsLength} bits into ${schemaBits}-bits schema-cell`)
    }

    for (let k = schemaBits - 1; k >= 0; k -= 1) {
      const bit = bits[bitsLength - 1 - k] || 0
      const bitIndex = MAX_BYTE_INDEX - bitsCounter

      bitsCounter += 1
      bitAccessor.set(bytesCounter, bitIndex, bit)

      if (bitsCounter === BITS_PER_BYTE) {
        bytesCounter += 1
        bitsCounter = 0
      }
    }
  }

  return bitAccessor.bytes.buffer
}
