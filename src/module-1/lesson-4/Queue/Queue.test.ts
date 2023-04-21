import { Queue } from './Queue'

describe('Queue', () => {
  describe('Init', () => {
    test('should create an instance', () => {
      const queue = new Queue()
      expect(queue).toBeInstanceOf(Queue)
      expect(queue.head).toBe(null)
      expect(queue.tail).toBe(null)
    })
  })

  describe('Use', () => {
    let queue: Queue<number>

    beforeEach(() => {
      queue = new Queue()
    })

    test('should push and pop value', () => {
      const input = [10, 11, 12]

      input.forEach((value) => queue.push(value))

      expect(queue.head).toBe(input.at(0))
      expect(queue.pop()).toBe(input.at(0))
      expect(queue.head).toBe(input.at(1))
      expect(queue.pop()).toBe(input.at(1))
      expect(queue.pop()).toBe(input.at(2))
    })

    test('should throw on tying to pop on empty queue', () => {
      const input = [1]

      input.forEach((value) => queue.push(value))

      expect(queue.pop()).toBe(input.at(0))
      expect(() => queue.pop()).toThrowError('Queue is empty')
    })
  })
})
