import { valueToBits } from './valueToBits'

describe('valueToBits', () => {
  test('should return binary representation of boolean value', () => {
    const input = true
    const output = valueToBits(input, 'boolean')

    expect(output.join('')).toBe('1')
  })

  test('should throw on unexpected type', () => {
    const input = true

    expect(() => valueToBits(input, 'test' as 'boolean')).toThrowError('Unexpected type: test')
  })
})
