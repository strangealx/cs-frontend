import { Bit } from '../..'
import { numberToBits } from './numberToBits'

export const stringToBits = (str: string): Bit[] =>
  str
    .split('')
    .map((char) => numberToBits(char.charCodeAt(0)))
    .flat()
