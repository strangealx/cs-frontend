import { TCallback, TPromisifiableFunction, promisify } from './promisify'

describe('promisify', () => {
  const successfullFnWithCallback: TPromisifiableFunction<number> = function (result: number, cb: TCallback<number>) {
    queueMicrotask(() => {
      cb(null, result)
    })
  } as TPromisifiableFunction<number>

  const failedFnWithCallback: TPromisifiableFunction<number> = function (result: number, cb: TCallback<number>) {
    queueMicrotask(() => {
      cb(new Error('Boom'), result)
    })
  } as TPromisifiableFunction<number>

  test('should successfully promisify function with callback', async () => {
    const promise = promisify(successfullFnWithCallback)

    await expect(promise(1)).resolves.toBe(1)
  })

  test('should catch if promisified function throws', async () => {
    const promise = promisify(failedFnWithCallback)

    await expect(promise(1)).rejects.toThrowError('Boom')
  })
})