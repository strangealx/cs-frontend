import { filter } from './filter'

describe('filter', () => {
  test('should filter iterable', () => {
    const input = [1, 2, 3, 4, 5, 6, 7]
    const output = [...filter(input, (num) => !(num % 2))]

    expect(output).toEqual([2, 4, 6])
  })
})
