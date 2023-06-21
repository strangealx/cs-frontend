import { intoIterableIterator } from './helpers'
import { EParserType, TParser } from './types'

export const seq = (...parsers: TParser[]): TParser =>
  function* (source) {
    let iter: Iterable<string> = intoIterableIterator(source)
    let value = ''

    for (const parser of parsers) {
      const [{ value: chunk }, nextIter] = yield* parser(iter)

      iter = nextIter
      value += chunk
    }

    return [{ type: EParserType.SEQ, value }, iter]
  }
