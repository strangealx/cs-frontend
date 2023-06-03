export const enumerate = <T>(iter: Iterable<T>): IterableIterator<[number, T]> => {
  const innerIter = iter[Symbol.iterator]()
  let count = 0

  return {
    [Symbol.iterator]() {
      return this
    },
    next() {
      const { done, value } = innerIter.next()

      return {
        done,
        value: value === undefined ? value : [count++, value],
      }
    },
  }
}
