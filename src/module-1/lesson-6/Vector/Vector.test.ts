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

    test('should return correct view', () => {
      vector.push(...input)

      expect(vector.view).toEqual(new Uint8Array([...input]))
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

    test('should shift nothing on empty vector', () => {
      const vector = new Vector(Uint8Array, { capacity: 0 })
      expect(vector.shift()).toBeUndefined()
    })

    test('should pop nothing on empty vector', () => {
      const vector = new Vector(Uint8Array, { capacity: 0 })
      expect(vector.pop()).toBeUndefined()
    })
  })

  describe('Inner', () => {
    let vector: Vector

    beforeEach(() => {
      const capacity = 0
      const ArrayType = Uint8Array

      vector = new Vector(ArrayType, { capacity })
    })

    test('should double capacity', () => {
      const input = [1, 2, 3, 4]
      const result = [1, 2, 4, 4]

      input.forEach((num, i) => {
        vector.push(num)
        expect(vector.capacity).toBe(result[i])
      })
    })

    test('should grow capacity with quarter of its previous value', () => {
      const initialCapacity = 1024
      const nextCapacity = Math.ceil(initialCapacity + initialCapacity / 4)
      const input = new Array(initialCapacity).fill(1)
      
      vector.push(...input)
      expect(vector.capacity).toBe(initialCapacity)

      vector.push(1)
      expect(vector.capacity).toBe(nextCapacity)
    })
  })
})
