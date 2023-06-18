import { EParserType, TParser } from './types'
import { intoIterableIterator, handleNextChar } from './helpers'
import { iterTools } from '../../common'

export const take = (
  pattern: RegExp | ((char: string) => boolean),
  options?: { min?: number; max?: number },
): TParser => {
  const { min = 1, max = Infinity } = options || {}

  return function* (source) {
    let iter = intoIterableIterator(source)
    let count = 0
    let value = ''

    while (true) {
      if (count === max) {
        return [{ type: EParserType.TAKE, value }, iter]
      }

      const [char, nextIter] = yield* handleNextChar(iter)
      iter = nextIter

      if ((pattern instanceof RegExp && !pattern.test(char)) || (typeof pattern === 'function' && !pattern(char))) {
        if (count >= min) {
          return [{ type: EParserType.TAKE, value }, iterTools.seq(char, iter) as IterableIterator<string>]
        }

        throw new Error(`Source string does not fit for specified pattern: ${pattern.toString()}`)
      }

      value += char
      count += 1
    }
  }
}
