import { compose } from './compose'

describe('compose', () => {
  test('should compose successfully', () => {
    const f = compose(
      (a: number) => a ** 2,
      (a: number) => a * 10,
      (a: number) => Math.sqrt(a),
    )

    expect(f(16)).toBe(1600)
  })
})
