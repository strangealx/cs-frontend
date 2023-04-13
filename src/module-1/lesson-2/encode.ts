import { Bit, BitAccessor } from '..'
import { numberToBits, stringToBits } from './helpers'
import { Schema, ValueList } from './types'

const BITS_PER_BYTE = 8
const MAX_BYTE_INDEX = BITS_PER_BYTE - 1

export const encode = (values: ValueList, schema: Schema): ArrayBuffer => {
  const totalBits = schema.reduce((carry, [bits]) => carry + bits, 0)
  const totalBytes = Math.ceil(totalBits / BITS_PER_BYTE)
  const view = new Uint8Array(totalBytes)
  const bitAccessor = new BitAccessor(view)
  let bytesCounter = 0
  let bitsCounter = 0

  for (let i = 0; i < values.length; i += 1) {
    const [schemaBits, schemaType] = schema[i]
    const value = values[i]
    let bits: Bit[]

    switch (schemaType) {
      case 'number':
        bits = numberToBits(value as number)
        break
      case 'ascii':
        bits = stringToBits(value as string)
        break
      case 'boolean':
        bits = [Number(value) as Bit]
      default:
        throw new Error(`Unexpected type: ${schemaType}`)
    }

    if (bits.length > schemaBits) {
      throw new Error(`Can't put ${bits.length} bits into ${schemaBits}-bits cell`)
    }

    for (let k = schemaBits - 1; k >= 0; k -= 1) {
      const bit = bits[bits.length - 1 - k] || 0
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
