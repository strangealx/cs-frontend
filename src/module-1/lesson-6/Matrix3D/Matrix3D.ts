import { Coords } from './types'

export class Matrix3D<T> {
  #matrix: T[]
  #size: Coords

  constructor(size: Coords) {
    const { x, y, z } = size

    this.#size = size
    this.#matrix = new Array(x * y * z)
  }

  #transformCoordsToIndex({ x, y, z }: Coords) {
    const { x: xSize, y: ySize } = this.#size

    return x + xSize * y + xSize * ySize * z
  }

  #assertCoords({ x, y, z }: Coords) {
    const { x: xSize, y: ySize, z: zSize } = this.#size
  
    if (x >= xSize || y >= ySize || z >= zSize) {
      throw new Error('Passed coords are out of bounds')
    }

    if (x < 0 || y < 0 || z < 0) {
      throw new Error('Invalid coords')
    }
  }

  set(coords: Coords, value: T) {
    this.#assertCoords(coords)

    const index = this.#transformCoordsToIndex(coords)

    this.#matrix[index] = value
  }

  get(coords: Coords) {
    this.#assertCoords(coords)

    const index = this.#transformCoordsToIndex(coords)

    return this.#matrix[index]
  }
}
