import { intoIterableIteratorWithBuffer } from './helpers'
import { iterTools } from '../../common'
import { TParser } from './types'

export const or = (...parsers: TParser[]): TParser =>
  function* (source) {
    let buffer: string[] = []
    let iter: IterableIterator<string> = intoIterableIteratorWithBuffer(source, buffer)

    for (let i = 0; i < parsers.length; i += 1) {
      const parser = parsers[i]
      const isLast = i === parsers.length - 1

      try {
        const found = yield* parser(iter)

        return found
      } catch {
        if (isLast) {
          break
        }

        iter = iterTools.seq(buffer, iter) as IterableIterator<string>
        buffer = []

        continue
      }
    }

    throw new Error('No parser can parse provided input')
  }
