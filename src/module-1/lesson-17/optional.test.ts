import { tag } from './tag'
import { take } from './take'
import { seq } from './seq'
import { repeat } from './repeat'
import { optional } from './optional'
import { EParserType, TParserResult } from './types'

describe('optional', () => {
  test('should return found string', () => {
    const input = '100,200,300a'
    const parser = repeat(seq(take(/\d/, { max: 3 }), optional(tag(','))), { min: 1 })(input)

    expect(parser.next().value).toEqual({ type: EParserType.SEQ, value: '100,' })
    expect(parser.next().value).toEqual({ type: EParserType.SEQ, value: '200,' })
    expect(parser.next().value).toEqual({ type: EParserType.SEQ, value: '300' })
  })
})
