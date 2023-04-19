import { Stack } from './Stack'

describe('Stack', () => {
  describe('Init', () => {
    test('should create an instance', () => {
      const queue = new Stack(Int8Array, 10)
      expect(queue).toBeInstanceOf(Stack)
      expect(queue.head).toBe(null)
    })
  })

  describe('Use', () => {
    let stack: Stack

    beforeEach(() => {
      stack = new Stack(Uint32Array, 3)
    })

    test('should push and pop value', () => {
      const input = [10, 11, 12]

      input.forEach((value) => stack.push(value))

      expect(stack.head).toBe(input.at(-1))
      expect(stack.pop()).toBe(input.at(-1))
      expect(stack.head).toBe(input.at(-2))
      expect(stack.pop()).toBe(input.at(-2))
      expect(stack.pop()).toBe(input.at(-3))
    })

    test('should throw on trying to pop on empty stack', () => {
      const input = 1

      stack.push(input)

      expect(stack.pop()).toBe(input)
      expect(() => stack.pop()).toThrowError('Stack is empty')
    })

    test('should throw on trying to push on full stack', () => {
      const input = [10, 11, 12]

      input.forEach((value) => stack.push(value))

      expect(() => stack.push(input[0])).toThrowError('Stack is full')
    })
  })
})
