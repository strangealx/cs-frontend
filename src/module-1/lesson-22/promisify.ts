type Append<I, T extends unknown[]> = [...T, I]

export type TCallback<T> = (error: Error | null, result: T) => void
export type TPromisifiableFunction<T> = (...args: Append<TCallback<T>, T[]>) => void

export const promisify = <T extends unknown>(fn: TPromisifiableFunction<T>) => (
  function (this: unknown, ...args: T[]) {
    return new Promise((resolve, reject) => {
      fn.apply(this, [...args, (error, result) => {
        if (error !== null) {
          reject(error)

          return
        }

        resolve(result)
      }])
    })
  }
)