import { isValid } from './isValid'

describe('isValid', () => {
  test('should validate brackets correctly', () => {
    expect(isValid('(hello{world} and [me])')).toBe(true)
    expect(isValid('(hello{world)} and [me]')).toBe(false)
    expect(isValid('(hello{world} and [me]')).toBe(false)
    expect(isValid(')')).toBe(false)
    expect(isValid('')).toBe(true)
  })
})
