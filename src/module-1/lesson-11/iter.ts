const HIGH_SURROGATE_PAIR_RANGE = [0xD800, 0xDBFF]
const DIACRITICAL_MARK_RANGE = [0x0300, 0x036F]

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

      const code = chars[current].charCodeAt(0)
      const followedByCode = chars[current + 1]?.charCodeAt(0)
      const isSurrogate = code >= HIGH_SURROGATE_PAIR_RANGE[0] && code <= HIGH_SURROGATE_PAIR_RANGE[1]
      const isDiacriticalMark = followedByCode >= DIACRITICAL_MARK_RANGE[0] && followedByCode <= DIACRITICAL_MARK_RANGE[1]

      if (isDiacriticalMark) {
        const result = [chars[current], chars[current + 1]]
        current += 2

        return {
          value: result.join(''),
          done: false,
        }
      }

      if (isSurrogate) {
        const result = [chars[current], chars[current + 1]]
        let next = current + 2
        let follower = chars[next]?.charCodeAt(0)

        while (follower === 0xFE0F || follower === 0x200D) {
          result.push(chars[next + 1], chars[next + 2])
          
          next += 3
          follower = chars[next]?.charCodeAt(0)
        }

        current = next

        return {
          value: result.join(''),
          done: false,
        }
      }

      const char = chars[current]

      current += 1

      return {
        value: char,
        done: false,
      }
      
    }
    
  }
}