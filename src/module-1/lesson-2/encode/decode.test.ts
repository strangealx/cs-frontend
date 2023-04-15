import { encode } from './encode'
import { decode } from './decode'
import { Schema, ValueList } from './types'

describe('decode', () => {
  let schema: Schema
  let schemaBitsSum: number

  beforeEach(() => {
    schema = [
      [3, 'number'],
      [3, 'number'],
      [16, 'ascii'],
      [1, 'boolean'],
      [1, 'boolean'],
    ]
    schemaBitsSum = schema.reduce((carry, [bits]) => carry + bits, 0)
  })

  test('should return correctly decoded value', () => {
    const input: ValueList = [1, 2, 'ab', false, true]
    const encoded = encode(input, schema)

    const decoded = decode(encoded, schema)
    expect(decoded).toEqual(input)
  })

  test('should decode string correctly when bits count greater then symbols count', () => {
    const input: ValueList = [1, 2, 'a', false, true]
    schema = [
      [3, 'number'],
      [3, 'number'],
      [13, 'ascii'],
      [1, 'boolean'],
      [1, 'boolean'],
    ]
    const output = decode(encode(input, schema), schema)

    expect(output).toEqual(input)
  })
})
