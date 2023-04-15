import { asciiToBits } from './asciiToBits'
import { numberToBits } from './numberToBits'
import { Bit } from '../../../lesson-1/types'
import { SchemaType, ValueType } from '../types'

export const valueToBits = (value: ValueType, schemaType: SchemaType): Bit[] => {
  switch (schemaType) {
    case 'number':
      return numberToBits(Number(value))
    case 'ascii':
      return asciiToBits(String(value))
    case 'boolean':
      return [!!value ? 1 : 0]
    default:
      throw new Error(`Unexpected type: ${schemaType}`)
  }
}
