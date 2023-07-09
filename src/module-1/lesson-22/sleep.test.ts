import { sleep } from './sleep'

jest.spyOn(global, 'setTimeout')

describe('sleep', () => {
  const ms = 1

  test('should sleep for 200 ms', async () => {
    const fn = jest.fn()

    await sleep(ms).then(fn)

    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), ms)
    expect(fn).toHaveBeenCalledTimes(1)
  })
})