
import { Result } from './Result'

describe('Result', () => {
  let successResult: number
  let failResult: Error
  let success: () => typeof successResult
  let fail: () => Error

  beforeEach(() => {
    successResult = 42
    failResult = new Error('error')
    success = jest.fn(() => successResult)
    fail = jest.fn(() => {
      throw failResult
    })
  })

  test('then', () => {
    const res = new Result(success)
    const cb = jest.fn()

    res.then(cb)

    expect(success).toBeCalled()
    expect(cb).toBeCalledWith(successResult)
  })

  test('catch', () => {
    const res = new Result(fail)
    const cbSuccess = jest.fn()
    const cbError = jest.fn()

    res.then(cbSuccess).catch(cbError)

    expect(fail).toBeCalled()
    expect(cbSuccess).not.toHaveBeenCalled()
    expect(cbError).toBeCalledWith(failResult)
  })

  test('then with Result as argument', () => {
    const res = new Result(success)
    const cb = jest.fn()

    res
      .then((r) => new Result(() => Number(r)))
      .then(cb)

    expect(success).toBeCalled()
    expect(cb).toBeCalledWith(successResult)
  })
})
