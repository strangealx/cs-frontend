import { LinkedList } from './LinkedList'
import { IterableLinkedList } from './IterableLinkedList'
import { ILinkedList } from './types'

describe('LinkedList', () => {
  describe('Init', () => {
    test('should create an instance', () => {
      const list = new IterableLinkedList()
      expect(list).toBeInstanceOf(LinkedList)
      expect(list).toBeInstanceOf(IterableLinkedList)
      expect(list.first).toBe(null)
      expect(list.last).toBe(null)
    })
  })

  describe('Use', () => {
    let list: IterableLinkedList<number>

    beforeEach(() => {
      list = new IterableLinkedList()
    })

    test('should iterate over all values', () => {
      const input = [1, 2, 3, 4]
      let counter = 0

      input.forEach((value) => list.add(value))

      expect(list[Symbol.iterator]).toEqual(expect.any(Function))

      for (const [value, index] of list) {
        expect(value).toEqual(input[counter])
        expect(index).toEqual(counter)

        counter += 1
      }
    })
  })
})
