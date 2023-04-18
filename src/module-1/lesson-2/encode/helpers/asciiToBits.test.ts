import { BITS_PER_BYTE } from '../consts'
import { asciiToBits } from './asciiToBits'

describe('asciiToBits', () => {
  test('should return binary representation of ascii string filled with 1 exta zero per byte', () => {
    const input = 'test'
    const output = asciiToBits(input)

    expect(output.length).toBe(input.length * BITS_PER_BYTE)
    expect(output.join('')).toBe('01110100011001010111001101110100')
  })

  test('should return binary representation of ascii string without zero fill', () => {
    const input = 'µ'
    const output = asciiToBits(input)

    expect(output.length).toBe(input.length * BITS_PER_BYTE)
    expect(output.join('')).toBe('10110101')
  })
})
