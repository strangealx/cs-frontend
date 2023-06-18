export const mapSeq = <T>(iter: Iterable<T>, funcs: Iterable<(el: T) => T>): IterableIterator<T> => {
  const innerIter = iter[Symbol.iterator]()

  return {
    [Symbol.iterator]() {
      return this
    },
    next() {
      const next = innerIter.next()
      let output = next.value

      if (next.done) {
        return next
      }

      for (const f of funcs) {
        output = f(output)
      }

      return { done: false, value: output }
    },
  }
}
