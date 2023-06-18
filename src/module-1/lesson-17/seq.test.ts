import { tag } from './tag'
import { take } from './take'
import { seq } from './seq'
import { EParserState, EParserType, TParserResult } from './types'

describe('seq', () => {
  test('should return found string', () => {
    const input = 'function test() {}'
    const parser = seq(tag('function '), take(/[a-z_$]/i, { max: 1 }), take(/\w/, { min: 0 }), tag('()'))(input)
    const {
      value: [parsed, left],
    } = parser.next() as IteratorResult<TParserResult>

    expect(parsed).toEqual({ type: EParserType.SEQ, value: 'function test()' })
    expect([...left].join('')).toEqual(' {}')
  })

  test('should await input if source is shorter then searched seq', () => {
    const input = 'function te'
    const parser = seq(tag('function '), take(/[a-z_$]/i, { max: 1 }), take(/\w/, { min: 0 }), tag('()'))(input)

    const { value } = parser.next() as IteratorResult<EParserState>

    expect(value).toBe(EParserState.AWAIT_INPUT)

    const {
      value: [parsed, left],
    } = parser.next('st()') as IteratorResult<TParserResult>

    expect(parsed).toEqual({ type: EParserType.SEQ, value: 'function test()' })
    expect([...left].join('')).toEqual('')
  })
})
