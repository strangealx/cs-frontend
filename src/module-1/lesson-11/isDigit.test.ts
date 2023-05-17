import { isDigit } from './isDigit'

describe('isDigit', () => {
  test('should return true on correctly passed digit', () => {
    expect(isDigit('123')).toBe(true)
    expect(isDigit('Ⅻ')).toBe(true)
  })

  test('should return false on empty string', () => {
    expect(isDigit('')).toBe(false)
  })

  test('should return false on mixed digit', () => {
    expect(isDigit('1Ⅻ')).toBe(false)
  })

  test('should return false on unknown digit symbol', () => {
    expect(isDigit('①')).toBe(false)
  })
})
