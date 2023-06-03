export const seq = (...iters: Iterable<unknown>[]): IterableIterator<unknown> => {
  let count = 0
  let iter = iters[count][Symbol.iterator]()


  return {
    [Symbol.iterator]() {
      return this
    },
    next() {
      let next = iter.next()
  
      if (next.done && count < iters.length - 1) {
        count += 1
        iter = iters[count][Symbol.iterator]()

        return iter.next()
      }

      return next
    },
  }
}
