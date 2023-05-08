import { Matrix3D } from './Matrix3D'

describe('Matrix3D', () => {
  describe('Init', () => {
    test('should create an instance', () => {
      const matrix = new Matrix3D({ x: 0, z: 0, y: 0 })
      expect(matrix).toBeInstanceOf(Matrix3D)
    })
  })

  describe('Use', () => {
    const size = { x: 10, y: 5, z: 12 }
    let matrix: Matrix3D<number>

    beforeEach(() => {
      matrix = new Matrix3D(size)
    })

    test('should set/get correct value', () => {
      const coords = { x: 3, y: 3, z: 10 }
      const input = 10

      matrix.set(coords, input)

      expect(matrix.get(coords)).toBe(input)
    })

    test('should throw on out of range coords', () => {
      const coords = { x: 17, y: 3, z: 10 }
      const input = 10

      expect(() => matrix.set(coords, input)).toThrowError('Passed coords are out of bounds')
    })

    test('should throw if one of coords is negative', () => {
      const coords = { x: -1, y: 3, z: 10 }
      const input = 10

      expect(() => matrix.set(coords, input)).toThrowError('Invalid coords')
    })

    test('should return correct matrix view', () => {
      const size = { x: 2, y: 2, z: 2 }
      const matrix = new Matrix3D(size)

      matrix.set({ x: 0, y: 0, z: 0 }, 1)
      matrix.set({ x: 1, y: 0, z: 0 }, 2)
      matrix.set({ x: 0, y: 1, z: 0 }, 3)
      matrix.set({ x: 1, y: 1, z: 0 }, 4)

      matrix.set({ x: 0, y: 0, z: 1 }, 5)
      matrix.set({ x: 1, y: 0, z: 1 }, 6)
      matrix.set({ x: 0, y: 1, z: 1 }, 7)
      matrix.set({ x: 1, y: 1, z: 1 }, 8)

      expect(matrix.view).toEqual(new Array(size.x * size.y * size.z).fill(0).map((_, index) => index + 1))
    })
  })
})
