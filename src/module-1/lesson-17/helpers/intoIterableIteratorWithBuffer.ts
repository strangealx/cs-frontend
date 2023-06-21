export const intoIterableIteratorWithBuffer = <T>(iterable: Iterable<T>, buffer: T[]): IterableIterator<T> => {
  const iter = iterable[Symbol.iterator]()

  return {
    [Symbol.iterator]() {
      return this
    },
    next() {
      const { done, value } = iter.next()

      if (!done) {
        buffer.push(value)
      }

      return { done, value }
    },
  }
}
