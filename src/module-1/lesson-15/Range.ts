type TRangeItem = number | string
type TRange = [number, number] | [string, string]

export class Range implements Iterable<TRangeItem> {
  #range
  #modifier: -1 | 1

  constructor(...range: TRange) {
    const [start, end] = range
    const isReversed = start > end

    this.#range = [start, end]
    this.#modifier = isReversed ? -1 : 1
  }

  [Symbol.iterator]() {
    const [start, end] = this.#range
    const isString = typeof start === 'string'
    const startSymbol: number = isString ? start.codePointAt(0)! : start
    const endSymbol: number = isString ? (end as string).codePointAt(0)! : (end as number)
    const modifier = this.#modifier
    const diff = (endSymbol - startSymbol) * modifier
    let counter = 0

    return {
      [Symbol.iterator]() {
        return this
      },
      next() {
        const current = startSymbol + counter * modifier

        if (counter > diff) {
          return { done: true, value: undefined } as { done: true; value: undefined }
        }

        const outputValue: TRangeItem = isString ? String.fromCodePoint(current) : current
        counter += 1

        return { done: false, value: outputValue }
      },
    }
  }

  reverse() {
    return new Range(...(this.#range.reverse() as TRange))
  }
}
