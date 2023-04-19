import { Queue } from './Queue'
import { TwoSideQueue } from './TwoSideQueue'

describe('Queue', () => {
  describe('Init', () => {
    test('should create an instance', () => {
      const queue = new TwoSideQueue()
      expect(queue).toBeInstanceOf(TwoSideQueue)
      expect(queue).toBeInstanceOf(Queue)
      expect(queue.head).toBe(null)
      expect(queue.tail).toBe(null)
    })
  })

  describe('Use', () => {
    let queue: TwoSideQueue<number>

    beforeEach(() => {
      queue = new TwoSideQueue()
    })

    test('should push, pop, shift, unshift values', () => {
      const input = [10, 11, 12]

      queue.push(input[0])
      queue.unshift(input[1])
      queue.push(input[2])

      expect(queue.pop()).toBe(input.at(-1))
      expect(queue.shift()).toBe(input.at(1))
      expect(queue.pop()).toBe(input.at(0))
      expect(() => queue.pop()).toThrowError('Queue is empty')
    })

    test('should throw on tying to shift on empty queue', () => {
      expect(() => queue.shift()).toThrowError('Queue is empty')
    })
  })
})
