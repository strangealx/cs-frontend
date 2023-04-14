import { BitGetter } from '../../lesson-1'
import { BITS_PER_BYTE, MAX_BYTE_INDEX } from './consts'
import { bitsToValue } from './helpers'
import { Schema, ValueList } from './types'

export const decode = (input: ArrayBuffer, schema: Schema) => {
  const view = new Uint8Array(input)
  const bitGetter = new BitGetter(view)
  const output: ValueList = []
  let bytesCounter = 0
  let bitsCounter = 0

  for (let i = 0; i < schema.length; i += 1) {
    const [schemaBits, schemaType] = schema[i]
    const value = new Array(schemaBits)

    for (let k = 0; k < schemaBits; k += 1) {
      const bitIndex = MAX_BYTE_INDEX - bitsCounter

      value[k] = bitGetter.get(bytesCounter, bitIndex)
      bitsCounter += 1

      if (bitsCounter === BITS_PER_BYTE) {
        bytesCounter += 1
        bitsCounter = 0
      }
    }

    output.push(bitsToValue(value, schemaType))
  }

  return output
}
