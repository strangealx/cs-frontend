import { Bit } from '../../../lesson-1/types'
import { SchemaType, ValueType } from '../types'

export const bitsToValue = (value: Bit[], schemaType: SchemaType): ValueType => {
  switch (schemaType) {
    case 'number':
      return parseInt(value.join(''), 2)
    case 'ascii':
      return value.reduce((carry, bit, index) => {
        const bitIndex = index + 1
        const charCode = parseInt(carry.current, 2)

        carry.current += bit
        
        if (index !== 0 && bitIndex % 8 === 0) {
          carry.total += String.fromCharCode(charCode)
          carry.current = ''
        }

        return carry
      }, { current: '', total: '' }).total
    case 'boolean':
      return Boolean(value[0])
    default:
      throw new Error(`Unexpected type: ${schemaType}`)
  }
}
