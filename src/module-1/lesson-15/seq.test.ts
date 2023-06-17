import { seq } from './seq'

describe('seq', () => {
  test('should iterate over all iterables', () => {
    const output = [...seq([1, 2], new Set([3, 4]), 'bla')]

    expect(output).toEqual([1, 2, 3, 4, 'b', 'l', 'a'])
  })
})
