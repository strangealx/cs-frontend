import { TypedArray } from '../../../common'
import { DOUBLER, MAX_DOUBLING_INDEX, QUARTER } from './constants'
import { Options } from './types'

export class Vector {
  #ArrayType: TypedArray
  #buffer: InstanceType<TypedArray>
  #size: number
  #capacity: number

  constructor(ArrayType: TypedArray, options: Options) {
    const { capacity } = options
    this.#ArrayType = ArrayType
    this.#buffer = new ArrayType(capacity)
    this.#size = 0
    this.#capacity = capacity
  }

  get length() {
    return this.#size
  }

  get capacity() {
    return this.#capacity
  }

  get view() {
    return this.#buffer.subarray(0, this.#size)
  }

  #grow(shouldBeAdded: number) {
    const { length, capacity } = this
    const nextLength = length + shouldBeAdded
    let nextCapacity = capacity || nextLength
    let nextBuffer: InstanceType<TypedArray>

    while (nextLength > nextCapacity) {
      // prettier-ignore
      nextCapacity = nextCapacity < MAX_DOUBLING_INDEX
        ? nextCapacity * DOUBLER
        : Math.ceil(nextCapacity + nextCapacity * QUARTER)
    }

    if (nextCapacity !== capacity) {
      nextBuffer = new this.#ArrayType(nextCapacity)

      for (let i = 0; i < length; i += 1) {
        nextBuffer[i] = this.#buffer[i]
      }

      this.#buffer = nextBuffer
      this.#capacity = nextCapacity
    }
  }

  push(...values: number[]) {
    const { length } = this
    const { length: add } = values

    this.#grow(add)

    for (let i = 0; i < add; i += 1) {
      this.#buffer[length + i] = values[i]
    }

    this.#size += add
    return this.#size
  }

  unshift(...values: number[]) {
    const { length } = this
    const { length: add } = values
    const nextLength = length + add

    this.#grow(add)

    for (let i = nextLength - 1; i >= add; i -= 1) {
      this.#buffer[i] = this.#buffer[i - add]
    }

    for (let i = 0; i < add; i += 1) {
      this.#buffer[i] = values[i]
    }

    this.#size += add

    return this.#size
  }

  pop() {
    const { length } = this
    const index = length - 1
    const output = this.#buffer[index]

    this.#buffer[index] = 0
    this.#size -= 1

    return output
  }

  shift() {
    const { length } = this
    const output = this.#buffer.at(0)

    for (let i = 1; i < length; i += 1) {
      this.#buffer[i - 1] = this.#buffer[i]
    }

    this.#buffer[length - 1] = 0
    this.#size -= 1

    return output
  }
}
