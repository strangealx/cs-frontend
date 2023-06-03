export const take = <T>(iter: Iterable<T>, limit: number): IterableIterator<T> => {
  const innerIter = iter[Symbol.iterator]()
  let count = 0

  return {
    [Symbol.iterator]() {
      return this
    },
    next() {
      if (count >= limit) {
        return { value: undefined, done: true }
      }

      count += 1

      return innerIter.next()
    },
  }
}
