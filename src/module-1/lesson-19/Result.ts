import { EResultState } from './types'

export class Result<T> {
  #state!: EResultState
  #data!: T | null
  #error: unknown

  constructor(fn: () => T | Result<T>) {
    try {
      const result = fn()

      if (result instanceof Result) {
        result
          .then(this.#handleOk.bind(this))
          .catch(this.#handleError.bind(this))

        return
      }

      this.#handleOk(result)
    } catch (error) {
      this.#handleError(error)
    }
  }

  #handleOk(result: T | null) {
    this.#data = result
    this.#state = EResultState.Ok
  }

  #handleError(error: unknown) {
    this.#error = error
      this.#state = EResultState.Error
  }

  then<R>(cb: (data: T | null) => R | Result<R>): Result<R> | this {
    if (this.#state === EResultState.Ok) {
      return new Result<R>(() => cb(this.#data))
    }

    return this
  }

  catch<R>(cb: (err: unknown) => R | Result<R>): Result<R> | this {
    if (this.#state === EResultState.Error) {
      return new Result<R>(() => cb(this.#error))
    }

    return this
  }
}