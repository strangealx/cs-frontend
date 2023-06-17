import { random } from './random'

describe('randomInt', () => {
  test('should return random values iterator in a range', () => {
    const range: [number, number] = [0, 100]
    const [min, max] = range
    const randomInt = random(...range)
    const output = [...new Array(10)].map(() => randomInt.next())

    output.forEach(({ value: int }) => {
      expect(int).toBeGreaterThanOrEqual(min)
      expect(int).toBeLessThan(max)
    })
  })
})
