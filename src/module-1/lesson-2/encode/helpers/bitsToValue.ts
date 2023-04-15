import { Bit } from '../../../lesson-1/types'
import { BITS_PER_BYTE } from '../consts'
import { SchemaType, ValueType } from '../types'

export const bitsToValue = (value: Bit[], schemaType: SchemaType): ValueType => {
  switch (schemaType) {
    case 'number':
      return parseInt(value.join(''), 2)
    case 'ascii':
      return value.reduceRight(
        (carry, bit, index) => {
          const iterationIndex = value.length - (index + 1)
          const bitIndex = iterationIndex + 1
          const charCode = parseInt(carry.current, 2)

          carry.current = bit + carry.current

          if (iterationIndex !== 0 && bitIndex % BITS_PER_BYTE === 0) {
            carry.total = String.fromCharCode(charCode) + carry.total
            carry.current = ''
          }

          return carry
        },
        { current: '', total: '' },
      ).total
    case 'boolean':
      return Boolean(value[0])
    default:
      throw new Error(`Unexpected type: ${schemaType}`)
  }
}
