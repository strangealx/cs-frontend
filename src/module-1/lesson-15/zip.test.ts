import { zip } from './zip'

describe('zip', () => {
  test('should iterate over all iterables and return bunch of tuples', () => {
    const output = [...zip([1, 2], new Set([3, 4]), 'bla')]

    expect(output).toEqual([
      [1, 3, 'b'],
      [2, 4, 'l'],
      [undefined, undefined, 'a'],
    ])
  })
})
