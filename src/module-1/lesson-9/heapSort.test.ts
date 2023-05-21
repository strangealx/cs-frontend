import { sort } from './heapSort'

describe('sort', () => {
  test('should sort correctly', () => {
    const comparator = (a: number, b: number) => a - b
    const input = [10, 6, 3, 3, 1, 5, -2]
    const output = [...input].sort(comparator)

    sort(input, comparator)

    expect(input).toEqual(output)
  })
})
