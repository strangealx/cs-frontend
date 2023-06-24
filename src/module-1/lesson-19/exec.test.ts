import { exec } from './exec'
import { Result } from './Result'

describe('exec', () => {
  test('should handle Result like async/await', () => {
    exec(function* () {
      const res = yield new Result(() => 42).then(() => 42)
      expect(res).toBe(42)

      return res
    })
  })

  test('should handle Result error like async/await', () => {
    exec(function* () {
      try {
        const res = yield new Result(() => {
          throw new Error('test')
        })

        return res
      } catch (err) {
        expect(err).toEqual(new Error('test'))
      }
    })
  })
})
