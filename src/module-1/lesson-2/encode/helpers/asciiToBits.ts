import { Bit } from '../../../lesson-1/types'
import { BITS_PER_BYTE } from '../consts'
import { numberToBits } from './numberToBits'

export const asciiToBits = (str: string): Bit[] =>
  str
    .split('')
    .map((char) => {
      const bits = numberToBits(char.charCodeAt(0))

      // prettier-ignore
      return bits.length < BITS_PER_BYTE
        ? [...new Array(BITS_PER_BYTE - bits.length).fill(0), ...bits]
        : bits
    })
    .flat()
