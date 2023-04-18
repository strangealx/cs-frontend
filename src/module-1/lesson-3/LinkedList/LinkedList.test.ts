import { LinkedList } from './LinkedList'

describe('LinkedList', () => {
  describe('Init', () => {
    test('should create an instance', () => {
      const list = new LinkedList()
      expect(list).toBeInstanceOf(LinkedList)
      expect(list.first).toBe(null)
      expect(list.last).toBe(null)
    })
  })

  describe('Use', () => {
    let list: LinkedList<number>

    beforeEach(() => {
      list = new LinkedList()
    })

    test('should add value', () => {
      const input = 1

      list.add(input)

      expect(list.first?.value).toBe(input)
      expect(list.first).toBe(list.last)
    })

    test('should add multiple values', () => {
      const input = [1, 2, 3, 4]

      input.forEach((value) => list.add(value))

      expect(list.first?.value).toBe(input.at(0))
      expect(list.last?.value).toBe(input.at(-1))
      expect(list.first?.next?.value).toBe(input.at(1))
      expect(list.first?.next?.prev?.value).toBe(input.at(0))
    })
  })
})
