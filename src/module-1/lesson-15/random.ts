const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min

export const random = (min: number, max: number): IterableIterator<number> => ({
  [Symbol.iterator]() {
    return this
  },
  next() {
    return {
      value: randomInt(min, max),
      done: false,
    }
  },
})
