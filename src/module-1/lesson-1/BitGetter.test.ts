import { BitGetter, createBitGetter } from './BitGetter'

describe('BitGetter', () => {
  describe('Init', () => {
    test('should create an instance', () => {
      const bitGetter = createBitGetter(new Uint8Array([0b1, 0b10]))
      expect(bitGetter).toBeInstanceOf(BitGetter)
    })

    test('should throw on emty array provided', () => {
      expect(() => createBitGetter(new Uint8Array([]))).toThrowError('empty array makes no sense')
    })
  })

  describe('Use', () => {
    let input: Uint8Array
    let bitGetter: BitGetter

    beforeEach(() => {
      input = new Uint8Array([0b1, 0b10])
      bitGetter = createBitGetter(input)
    })

    test('should use a local copy of provided array', () => {
      input[1] = 0b1101
      expect(bitGetter.get(1, 0)).toBe(0)
      expect(bitGetter.get(1, 1)).toBe(1)
    })

    test('should return bit correctly', () => {
      expect(bitGetter.get(0, 0)).toBe(1)
      expect(bitGetter.get(1, 0)).toBe(0)
      expect(bitGetter.get(1, 1)).toBe(1)
    })

    test('should throw on invalid byte index', () => {
      expect(() => bitGetter.get(2, 0)).toThrowError('array index: "2" is out of range')
    })

    test('should throw on invalid bit index', () => {
      expect(() => bitGetter.get(0, -2)).toThrowError('bit index: "-2" is out of range (0 - 7)')
      expect(() => bitGetter.get(0, 8)).toThrowError('bit index: "8" is out of range (0 - 7)')
    })
  })
})
