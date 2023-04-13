import { encode } from './encode'
import { binaryToString } from './helpers'
import { Schema, ValueList } from './types'

describe('encode', () => {
  test('should return correctly encoded value', () => {
    const schema: Schema = [
      [3, 'number'],
      [3, 'number'],
      [3, 'number'],
    ]
    const input: ValueList = [1, 2, 3]
    const output = new Uint8Array(encode(input, schema))

    expect(binaryToString(output)).toEqual('0010100110000000')
  })
})
