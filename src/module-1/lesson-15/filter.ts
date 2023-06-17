export const filter = <T>(iter: Iterable<T>, func: (item: T) => boolean): IterableIterator<T> => {
  const innerIter = iter[Symbol.iterator]()

  return {
    [Symbol.iterator]() {
      return this
    },
    next() {
      let next = innerIter.next()

      while (!next.done && !func(next.value)) {
        next = innerIter.next()
      }

      return next
    },
  }
}
