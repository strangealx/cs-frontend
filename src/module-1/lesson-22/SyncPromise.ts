enum EState {
  PENDING = 'pending',
  FULLFILLED = 'fullfilled',
  REJECTED = 'rejected'
}

interface Thenable extends Object {
  then(resolve: Function, reject: Function): void 
}

const voidFunction = () => undefined

export class SyncPromise<T> {
  protected onFullfilled: Function[] = []
  protected onRejected: Function[] = []

  protected state: EState = EState.PENDING

  protected value: any = null

  static resolve<T>(value: SyncPromise<T> | T) {
    if (value instanceof SyncPromise) {
      return value
    }

    return new SyncPromise<T>((resolve) => {
      resolve(value)
    })
  }

  static reject<T>(value: T) {
    return new SyncPromise<T>((_, reject) => {
      reject?.(value)
    })
  }

  constructor(init: (resolve: Function, reject?: Function) => void) {
    const resolve = (value: T | Thenable) => {
      if (this.value !== null || this.state !== EState.PENDING) {
        return
      }

      this.value = value

      const fullfill = (value: any) => {
        this.value = value
        this.state = EState.FULLFILLED

        this.onFullfilled.forEach((fn) => {
          fn(this.value)
        })
      }

      if (value instanceof Object && typeof value?.then === 'function') {
        value.then(fullfill, reject)

        return
      } else {
        fullfill(value)
      }
    }

    const reject = (err: Error) => {
      if (this.value !== null || this.state !== EState.PENDING) {
        return
      }

      this.value = err
      this.state = EState.REJECTED

      this.onRejected.forEach((fn) => {
        fn(err)
      })
    }

    try {
      init(resolve, reject);
    } catch (error) {
      reject(error as Error)
    }
  }

  then(onFullfilled: Function, onRejected: Function) {
    return new SyncPromise((resolve, reject) => {
      const fullfilled = (value: T) => {
        this.call(onFullfilled || resolve, [value], resolve, reject)
      }

      const rejected = (value: Error) => {
        this.call(onRejected || reject, [value], resolve, reject)
      }

      this.onFullfilled.push(fullfilled)
      this.onRejected.push(rejected)

      if (this.state !== EState.PENDING) {
        this.state === EState.FULLFILLED
          ? fullfilled(this.value)
          : rejected(this.value)
      }
    })
  }

  catch(onRejected: Function) {
    return new SyncPromise((resolve, reject) => {
      const rejected = (value: T) => {
        this.call(onRejected || reject, [value], resolve, reject)
      }

      this.onRejected.push(rejected)

      if (this.state !== EState.PENDING) {
        this.state === EState.FULLFILLED
          ? resolve(this.value)
          : rejected(this.value)
      }
    })
  }

  finally(cb: Function) {
    return new SyncPromise((resolve, reject) => {
      const fullfilled = () => {
        try {
          let res = cb()

          if (typeof res.then === 'function') {
            res = res.then(() => this.value, reject)
          } else {
            res = this.value
          }

          resolve(res)
        } catch (error) {
          reject?.(error as Error)
        }
      }

      const rejected = () => {
        try {
          let res = cb()

          if (typeof res.then === 'function') {
            res = res.then(() => this.value, reject)
            resolve(res)
          } else {
            res = this.value
          }

          reject?.(res)
        } catch (error) {
          reject?.(error as Error)
        }
      }

      this.onFullfilled.push(fullfilled)
      this.onRejected.push(rejected)

      if (this.state !== EState.PENDING) {
        this.state === EState.FULLFILLED
          ? fullfilled()
          : rejected()
      }
    })
  }

  protected call(fn: Function, args: (T | Error)[], onResolved: Function, onRejected?: Function) {
    const resolve = onResolved || voidFunction
    const reject = onRejected || voidFunction

    try {
      const res = fn(...args) as Thenable | any

      if (res instanceof Object && typeof res?.then === 'function') {
        return res.then(resolve, reject)
      } else {
        resolve(res)
      }
    } catch (error) {
      reject(error as Error)
    }
  }
}
