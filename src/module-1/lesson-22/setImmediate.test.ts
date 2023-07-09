import { setImmediate, clearImmediate } from './setImmediate'
import { sleep } from './sleep'

describe('setImmediate', () => {
  test('should call setImmediate callback', async () => {
    const fn = jest.fn(() => null)

    setImmediate(fn)

    expect(fn).toHaveBeenCalledTimes(0)

    await sleep(0)

    expect(fn).toHaveBeenCalledTimes(1)
  })

  test('should clear immediate callback', async () => {
    const fn = jest.fn(() => null)
    const immediateId = setImmediate(fn)

    expect(fn).toHaveBeenCalledTimes(0)

    clearImmediate(immediateId)
    await sleep(0)

    expect(fn).toHaveBeenCalledTimes(0)
  })
})