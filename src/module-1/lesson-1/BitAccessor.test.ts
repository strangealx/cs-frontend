import { BitAccessor, createBitAccessor } from './BitAccessor'
import { BitGetter } from './BitGetter'

describe('BitAccessor', () => {
  describe('Init', () => {
    test('should create an instance', () => {
      const bitAccessor = createBitAccessor(new Uint8Array([0b1, 0b10]))
      expect(bitAccessor).toBeInstanceOf(BitGetter)
      expect(bitAccessor).toBeInstanceOf(BitAccessor)
    })
  })

  describe('Use', () => {
    let input: Uint8Array
    let bitAccessor: BitAccessor

    beforeEach(() => {
      input = new Uint8Array([0b1, 0b10])
      bitAccessor = createBitAccessor(input)
    })

    test('should set bit value', () => {
      bitAccessor.set(0, 1, 1)
      bitAccessor.set(1, 1, 0)

      expect(bitAccessor.get(0, 1)).toBe(1)
      expect(bitAccessor.get(1, 1)).toBe(0)
    })
  })
})
