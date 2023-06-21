import { mapSeq } from './mapSeq'

describe('mapSeq', () => {
  test('should iterate over all iterables and return bunch of tuples', () => {
    const output = [...mapSeq([1, 2, 3], [(el) => el * 2, (el) => el - 1])]

    expect(output).toEqual([1, 3, 5])
  })
})
