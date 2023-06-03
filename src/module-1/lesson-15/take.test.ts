import { random } from './random'
import { take } from './take'

describe('take', () => {
  test('should limit passed itrable', () => {
    const range: [number, number] = [0, 100]
    const output = [...take(random(...range), 15)]

    expect(output.length).toBe(15)
  })
})
