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

    test('should push and pop value', () => {
      const input = [10, 11, 12]

      input.forEach((value) => queue.push(value))

      console.log(dequeue.pop());   // 12
      console.log(dequeue.shift()); // 11
      console.log(dequeue.pop());   // 10
      console.log(dequeue.pop());   // Exception

      expect(queue.pop()).toBe(input.at(-1))
      expect(queue.shift()).toBe(input.at(0))
      expect(queue.pop()).toBe(input.at(1))
      expect(() => queue.pop()).toThrowError('Queue is empty')
    })
  })
})
