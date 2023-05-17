import { bisecLeft } from '../../common'

type TRange = [number, number]

const DIGIT_RANGES: Array<TRange> = [
  [0x30, 0x39], // BASIC
  [0x660, 0x669], // ARABIC
  [0x17e0, 0x17e9], // KHMER
  [0x2070, 0x2079], // SUPERSCRIPT
  [0x2080, 0x2089], // SUBSCRIPT
  [0x2160, 0x2183], // ROMAN
  [0xa830, 0xa839], // INDIC
]

const createComparator = (code: number) => ([startCode, endCode]: TRange) => {
  if (code < startCode) {
    return 1
  }

  if (code > endCode) {
    return -1
  }

  return 0
}

export const isDigit = (input: string): boolean => {
  if (!input.length) {
    return false
  }

  const code = input.codePointAt(0)!
  const rangeIndex = bisecLeft<TRange>(DIGIT_RANGES, createComparator(code))
  const [start, end] = DIGIT_RANGES[rangeIndex] || []

  if (!start || !end) {
    return false
  }

  for (const char of input) {
    const currentCode = char.codePointAt(0)

    if (!currentCode || currentCode < start || currentCode > end) {
      return false
    }
  }

  return true
}
