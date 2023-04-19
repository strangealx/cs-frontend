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

    test('should remove value', () => {
      const input = [1, 2, 3, 4]

      input.forEach((value) => list.add(value))
      list.remove()

      expect(list.last?.value).toBe(input.at(-2))
      expect(list.last?.next).toBe(null)
      expect(list.last?.prev?.value).toBe(input.at(-3))
    })

    test('should remove all values', () => {
      const input = [1, 2]

      input.forEach((value) => list.add(value))
      input.forEach(() => list.remove())

      expect(list.first).toBe(null)
      expect(list.last).toBe(null)
    })

    test('should add value in the beginning', () => {
      const input = [3, 2, 1]

      input.forEach((value) => list.addFirst(value))

      expect(list.first?.value).toBe(input.at(-1))
      expect(list.first?.next?.value).toBe(input.at(1))
      expect(list.first?.prev).toBe(null)
    })

    test('should remove value from the beginning', () => {
      const input = [1, 2, 3]

      input.forEach((value) => list.add(value))
      list.removeFirst()

      expect(list.first?.value).toBe(input.at(1))
      expect(list.first?.next?.value).toBe(input.at(2))
    })

    test('should remove multiple values from the beginning', () => {
      const input = [1, 2, 3]

      input.forEach((value) => list.add(value))
      input.forEach(() => list.remove())

      expect(list.first).toBe(null)
      expect(list.last).toBe(null)
    })

    test('should do nothing on remove call on empty list', () => {
      list.remove()

      expect(list.first).toBe(null)
      expect(list.last).toBe(null)
    })

    test('should do nothing on removeFirst call on empty list', () => {
      list.removeFirst()

      expect(list.first).toBe(null)
      expect(list.last).toBe(null)
    })

    test('should correctly remove the only element', () => {
      const input = 1
      list.add(input)
      list.removeFirst()

      expect(list.first).toBe(null)
      expect(list.last).toBe(null)
    })
  })
})
