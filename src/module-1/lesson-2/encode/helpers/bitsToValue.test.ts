import { Bit } from '../../../lesson-1'
import { bitsToValue } from './bitsToValue'

describe('bitsToValue', () => {
  test('should return boolean value of binary representation', () => {
    const input: Bit[] = [1]
    const output = bitsToValue(input, 'boolean')

    expect(output).toBe(true)
  })

  test('should throw on unexpected type', () => {
    const input: Bit[] = [1]

    expect(() => bitsToValue(input, 'test' as 'boolean')).toThrowError('Unexpected type: test')
  })
})
