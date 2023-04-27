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
      const coords = { x: 3, y: 3, z: 10}
      const input = 10

      matrix.set(coords, input)

      expect(matrix.get(coords)).toBe(input)
    })

    test('should throw on out of range coords', () => {
      const coords = { x: 17, y: 3, z: 10}
      const input = 10

      expect(() => matrix.set(coords, input)).toThrowError('Passed coords are out of bounds')
    })

    test('should throw if one of coords is negative', () => {
      const coords = { x: -1, y: 3, z: 10}
      const input = 10

      expect(() => matrix.set(coords, input)).toThrowError('Invalid coords')
    })
  })
})
