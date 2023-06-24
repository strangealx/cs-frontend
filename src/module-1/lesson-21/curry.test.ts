import { curry } from './curry'

describe('curry', () => {
  let sum: Function
  let diff: Function

  beforeEach(() => {
    sum = (a: number, b: number, c: number) => a + b + c
    diff = (a: number, b: number) => a - b
  })

  test('should curry simple function', () => {
    const curriedSum = curry(sum)
    const curriedDiff = curry(diff)

    expect(curriedSum(1)(2)(3)).toBe(6)
    expect(curriedDiff(3)(1)).toBe(2)
  })

  test('should curry function using placeholders', () => {
    const curriedSum = curry(sum)
    const curriedDiff = curry(diff)

    expect(curriedSum(1)(curry._, 3)(2)).toBe(6)
    expect(curriedDiff(curry._, 10)(15)).toBe(5)
  })
})
