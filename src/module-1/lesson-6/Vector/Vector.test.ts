import { Vector } from './Vector'

describe('Vector', () => {
  describe('Init', () => {
    test('should create an instance', () => {
      const vector = new Vector(Uint8Array, { capacity: 100 })
      expect(vector).toBeInstanceOf(Vector)
      expect(vector.length).toBe(0)
    })
  })

  describe('Use', () => {
    let input: number[]
    let vector: Vector

    beforeEach(() => {
      const capacity = 100
      const ArrayType = Uint8Array

      input = [100, 20, 10]
      vector = new Vector(ArrayType, { capacity })
    })

    test('should push values', () => {
      const [first, ...rest] = input

      expect(vector.push(first)).toBe(1)
      expect(vector.push(...rest)).toBe(3)
    })

    test('should pop value', () => {
      vector.push(...input)

      expect(vector.pop()).toBe(input.at(-1))
    })

    test('should shift value', () => {
      vector.push(...input)

      expect(vector.shift()).toBe(input.at(0))
    })

    test('should unshift value', () => {
      vector.push(...input)

      expect(vector.unshift(30)).toBe(4)
      expect(vector.length).toBe(4)
    })
  })
})
