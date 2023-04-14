import { numberToBits } from './numberToBits'

describe('numberToBits', () => {
  test('should return binary representation of non-negative integer', () => {
    const input = 3
    const output = numberToBits(input)

    expect(output.join('')).toBe('11')
  })

  test('should throw on negative integer', () => {
    const input = -1

    expect(() => numberToBits(input)).toThrowError('Negative and float numbers are not implemented yet')
  })
})
