import { enumerate } from './enumerate'

describe('enumerate', () => {
  test('should enumerate iterable', () => {
    const input = [1, 2, 3]
    const output = [...enumerate(input)]

    expect(output).toEqual([
      [0, 1],
      [1, 2],
      [2, 3],
    ])
  })
})
