import { tag } from './tag'
import { or } from './or'
import { EParserState, EParserType, TParserResult } from './types'

describe('or', () => {
  test('should return found string', () => {
    const input = 'false'
    const parser = or(tag('true '), tag('false'))(input)
    const {
      value: [parsed, left],
    } = parser.next() as IteratorResult<TParserResult>

    expect(parsed).toEqual({ type: EParserType.TAG, value: 'false' })
    expect([...left].join('')).toEqual('')
  })

  test('should await input if source is shorter then searched or', () => {
    const input = 'fals'
    const parser = or(tag('true '), tag('false'))(input)

    const { value } = parser.next() as IteratorResult<EParserState>

    expect(value).toBe(EParserState.AWAIT_INPUT)

    const {
      value: [parsed, left],
    } = parser.next('e') as IteratorResult<TParserResult>

    expect(parsed).toEqual({ type: EParserType.TAG, value: 'false' })
    expect([...left].join('')).toEqual('')
  })

  test('should throw if no parser is acceptable', () => {
    const input = 'test'
    const parser = or(tag('true '), tag('false'))(input)

    expect(() => parser.next()).toThrowError('No parser can parse provided input')
  })
})
