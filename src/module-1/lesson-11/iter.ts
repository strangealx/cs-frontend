import { TRange } from './types'

const HIGH_SURROGATE_PAIR_RANGE: TRange = [0xd800, 0xdbff]
const LOW_SURROGATE_PAIR_RANGE: TRange = [0xdc00, 0xdfff]
const DIACRITICAL_MARK_RANGE: TRange = [0x0300, 0x036f]
const REGIONAL_SYMBOL_RANGE: TRange = [0xdde6, 0xddff]
const SKIN_TONE_MODIFIER_RANGE: TRange = [0xdffb, 0xdfff]

const inBetween = (num: number, [start, end]: TRange) => num >= start && num <= end

export const iter = (input: string): IterableIterator<string> => {
  const chars = input.split('')
  let current = 0

  return {
    [Symbol.iterator]() {
      return this
    },
    next() {
      if (current >= chars.length) {
        return { done: true, value: undefined }
      }

      let next = current + 1
      const code = chars[current].charCodeAt(0)
      const followedByCode = chars[next]?.charCodeAt(0)
      const possibleRegionalEnding = chars[next + 2]?.charCodeAt(0)
      const isSurrogate =
        inBetween(code, HIGH_SURROGATE_PAIR_RANGE) && inBetween(followedByCode, LOW_SURROGATE_PAIR_RANGE)
      const isDiacriticalMark = inBetween(followedByCode, DIACRITICAL_MARK_RANGE)
      const isRegionalPair = isSurrogate && inBetween(followedByCode, REGIONAL_SYMBOL_RANGE) && inBetween(possibleRegionalEnding, REGIONAL_SYMBOL_RANGE)
      const result = [chars[current]]

      if (isDiacriticalMark) {
        result.push(chars[next])
        next += 1
      }

      if (isRegionalPair) {
        result.push(...chars.slice(next, next + 3))
        next += 3
      }

      if (isSurrogate && !isRegionalPair) {
        result.push(chars[next])
        next += 1

        let followerCode = chars[next]?.charCodeAt(0)
        let possibleSkinModifier = chars[next + 1]?.charCodeAt(0)
        let isSkinModifier = inBetween(possibleSkinModifier, SKIN_TONE_MODIFIER_RANGE)

        while (
          followerCode === 0xfe0f ||
          followerCode === 0x200d ||
          isSkinModifier
        ) {
          if (isSkinModifier) {
            result.push(chars[next], chars[next + 1])
            next += 2
          } else {
            result.push(chars[next], chars[next + 1], chars[next + 2])
            next += 3
          }
          
          followerCode = chars[next]?.charCodeAt(0)
          possibleSkinModifier = chars[next + 1]?.charCodeAt(0)
          isSkinModifier = inBetween(possibleSkinModifier, SKIN_TONE_MODIFIER_RANGE)
        }
      }

      current = next

      return {
        value: result.join(''),
        done: false,
      }
    },
  }
}
