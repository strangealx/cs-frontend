import { TParser } from './types'
import { repeat } from './repeat'

export const optional = (parser: TParser): TParser => repeat(parser, { min: 0, max: 1 })
