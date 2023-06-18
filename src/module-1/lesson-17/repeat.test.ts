import { tag } from './tag'
import { take } from './take'
import { seq } from './seq'
import { repeat } from './repeat'
import { EParserState, EParserType, TParser, TParserResult } from './types'

describe('repeat', () => {
  test('should return found string', () => {
    const input = '100,200,300,'
    const parser = repeat(seq(take(/\d/), tag(',')), { min: 1 })(input)

    expect(parser.next().value).toEqual({ type: EParserType.SEQ, value: '100,' })
    expect(parser.next().value).toEqual({ type: EParserType.SEQ, value: '200,' })
    expect(parser.next().value).toEqual({ type: EParserType.SEQ, value: '300,' })
  })

  test('should return found string', () => {
    const input = '100,200,300,'
    const parser = repeat(seq(take(/\d/), tag(',')), { max: 1 })(input)

    expect((parser.next().value as TParserResult)[0]).toEqual({ type: EParserType.SEQ, value: '100,' })
  })

  test('should look ahead and return if next part is not acceptable', () => {
    const input = '100,test'
    const parser = repeat(seq(take(/\d/), tag(',')), { min: 1 })(input)

    expect((parser.next().value as TParserResult)[0]).toEqual({ type: EParserType.SEQ, value: '100,' })
  })

  test('should throw if look ahead part is not acceptable and min repeats are not reached', () => {
    const input = '100,test'
    const parser = repeat(seq(take(/\d/), tag(',')), { min: 2 })(input)

    expect(() => parser.next()).toThrow()
  })

  test('should use default options if none provided', () => {
    const input = '100,test'
    const parser = repeat(seq(take(/\d/), tag(',')))(input)

    expect((parser.next().value as TParserResult)[0]).toEqual({ type: EParserType.SEQ, value: '100,' })
  })

  test('should handle min: 0 successfully', () => {
    const input = 'test'
    const parser = repeat(seq(take(/\d/), tag(',')), { min: 0 })(input)

    expect((parser.next().value as TParserResult)[0]).toEqual({ type: EParserType.REPEAT, value: '' })
  })

  test('should await input if source is shorter then searched repeat', () => {
    const input = '100'
    const parser = repeat(seq(take(/\d/), tag(',')))(input)

    const { value } = parser.next() as IteratorResult<EParserState>

    expect(value).toBe(EParserState.AWAIT_INPUT)

    const { value: parsed } = parser.next(',') as IteratorResult<TParserResult>

    expect(parsed).toEqual({ type: EParserType.SEQ, value: '100,' })
  })

  test('should await input if source could be parsed more', () => {
    const input = '100,1'
    const parser = repeat(seq(take(/\d/), tag(',')))(input)

    expect(parser.next().value).toEqual({ type: EParserType.SEQ, value: '100,' })

    const { value } = parser.next() as IteratorResult<EParserState>

    expect(value).toBe(EParserState.AWAIT_INPUT)

    const { value: parsed } = parser.next(',') as IteratorResult<TParserResult>

    expect(parsed).toEqual({ type: EParserType.SEQ, value: '1,' })
  })
})
