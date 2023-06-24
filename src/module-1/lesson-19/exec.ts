import { Result } from './Result'

export const exec = <T>(fn: () => Generator<T | Result<T>, T, unknown>): Result<T> => {
  const iter = fn()
  const process = (result?: unknown): Result<T> => {
    const chunk = iter.next(result)

    if (chunk.done) {
      return new Result(() => chunk.value)
    }

    const value = new Result(() => chunk.value)

    return value.then(process).catch((error) => {
      const chunk = iter.throw(error)

      if (chunk.done) {
        return new Result(() => chunk.value)
      }

      return process(chunk.value)
    })
  }

  return process()
}
