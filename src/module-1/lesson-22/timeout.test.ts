import { sleep } from './sleep'
import { timeout } from './timeout'

describe('timeout', () => {
  const ms = 1

  test('should throw on timeout exceeded ', async () => {
    const promise = sleep(ms * 10)

    await expect(timeout(promise, ms)).rejects.toThrowError('Timeout exceeded')
  })

  test('should resolve', async () => {
    const promise = sleep(ms).then(() => ms)

    await expect(timeout(promise, ms * 10)).resolves.toBe(ms)
  })
})