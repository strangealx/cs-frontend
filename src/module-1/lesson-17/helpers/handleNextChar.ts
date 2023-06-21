import { intoIterableIterator } from '.'
import { EParserState } from '../types'

export function* handleNextChar(
  iter: IterableIterator<string>,
): Generator<EParserState, [string, IterableIterator<string>]> {
  let { done, value: char } = iter.next()

  if (done) {
    const next = yield EParserState.AWAIT_INPUT

    if (typeof next !== 'string') {
      throw new Error('Invalid input')
    }

    iter = intoIterableIterator(next)

    const chunk = iter.next()

    done = chunk.done
    char = chunk.value
  }

  return [char, iter]
}
