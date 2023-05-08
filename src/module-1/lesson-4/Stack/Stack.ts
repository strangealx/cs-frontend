import { TypedArray } from '../../../common'
import { IStack } from './types'

export class Stack implements IStack {
  protected stack: InstanceType<TypedArray>
  protected size: number = 0

  constructor(StackType: TypedArray, length: number) {
    this.stack = new StackType(length)
  }

  get head() {
    const { size, stack } = this

    if (size === 0) {
      return null
    }

    return stack[size - 1]
  }

  push(value: number) {
    const { size, stack } = this

    if (size === stack.length) {
      throw new Error('Stack is full')
    }

    stack[size] = value
    this.size += 1
  }

  pop() {
    const { size, stack } = this

    if (size === 0) {
      throw new Error('Stack is empty')
    }

    const output = stack[size - 1]

    stack[size - 1] = 0
    this.size -= 1

    return output
  }
}
