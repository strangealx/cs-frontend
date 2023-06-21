import { EParserType, TParser } from './types'
import { intoIterableIterator, handleNextChar } from './helpers'

export const tag = (input: string): TParser =>
  function* (source) {
    let iter = intoIterableIterator(source)

    for (const search of input) {
      const [char, nextIter] = yield* handleNextChar(iter)
      iter = nextIter


      if (search !== char) {
        throw new Error(`Source string does not include specified tag: "${input}", but "${char}"`)
      }
    }

    return [{ type: EParserType.TAG, value: input }, iter]
  }
