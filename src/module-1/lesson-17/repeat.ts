import { intoIterableIterator, intoIterableIteratorWithBuffer } from './helpers'
import { EParserType, TParser } from './types'
import { iterTools } from '../../common'

export const repeat = (parser: TParser, options?: { min?: number, max?: number }): TParser => {
  const { min = 1, max = Infinity } = options || {}

  return function* (source) {
    let iter: Iterable<string> = intoIterableIterator(source)
    let count = 0

    while (true) {
      try {
        const result = yield* parser(iter)
        const [output, nextIter] = result

        count += 1
        iter = nextIter

        if (count === max) {
          return result
        }

        // look ahead
        try {
          const buffer: string[] = []
          parser(intoIterableIteratorWithBuffer(iter, buffer)).next()
          iter = iterTools.seq(buffer, iter) as Iterable<string>
        } catch (error) {
          if (count < min) {
            throw error
          }

          return result
        }

        yield output
      } catch (error) {
        if (count >= min) {
          return [{ type: EParserType.REPEAT, value: '' }, iter]
        }

        throw error
      }
    }
  }
}
