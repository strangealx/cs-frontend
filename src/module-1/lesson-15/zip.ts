export const zip = (...iters: Iterable<unknown>[]): IterableIterator<unknown> => {
  const iterators = iters.map((iter) => iter[Symbol.iterator]())

  return {
    [Symbol.iterator]() {
      return this
    },
    next() {
      const check: boolean[] = []
      const output = iterators.map((iter) => {
        const { done, value } = iter.next()

        if (done) {
          check.push(done)
        }

        return value
      })

      return { done: check.length === iterators.length, value: output }
    },
  }
}
