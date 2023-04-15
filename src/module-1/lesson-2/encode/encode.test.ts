import { BITS_PER_BYTE } from './consts'
import { encode } from './encode'
import { Schema, ValueList } from './types'

const binaryToString = (bytes: Uint8Array, length: number = bytes.length * BITS_PER_BYTE) =>
  bytes.reduce((str, byte) => str + byte.toString(2).padStart(BITS_PER_BYTE, '0'), '').substring(0, length)

describe('encode', () => {
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

  test('should return correctly encoded value', () => {
    const input: ValueList = [1, 2, 'ab', false, true]
    const output = new Uint8Array(encode(input, schema))

    expect(binaryToString(output, schemaBitsSum)).toBe('001010011000010110001001')
    expect(output.byteLength).toBe(Math.ceil(schemaBitsSum / BITS_PER_BYTE))
  })

  test('should encode string when bits count greater then symbols count', () => {
    const input: ValueList = [1, 2, 'a', false, true]
    schema = [
      [3, 'number'],
      [3, 'number'],
      [13, 'ascii'],
      [1, 'boolean'],
      [1, 'boolean'],
    ]
    const output = new Uint8Array(encode(input, schema))

    expect(binaryToString(output)).toBe('001010000000110000101000')
  })

  test('should throw on value that takes more bits then allowed by schema', () => {
    const input: ValueList = [1, 2, 'abc', false, true]

    expect(() => encode(input, schema)).toThrowError('Can\'t put 24 bits into 16-bits schema-cell')
  })

  test('should throw on invalid schema', () => {
    const input: ValueList = [1, 2, 'abc', true]

    expect(() => encode(input, schema)).toThrowError('Schema and input don\'t match each other')
  })
})
