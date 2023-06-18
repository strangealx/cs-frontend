import { tag } from './tag'
import { EParserState, EParserType, TParserResult } from './types'

describe('tag', () => {
  test('should return found tag', () => {
    const search = 'function'
    const input = 'function test() {}'
    const parser = tag(search)(input)
    const {
      value: [parsed, left],
    } = parser.next() as IteratorResult<TParserResult>

    expect(parsed).toEqual({ type: EParserType.TAG, value: search })
    expect([...left].join('')).toEqual(input.replace(search, ''))
  })

  test('should await input if source is shorter then searched tag', () => {
    const search = 'foo'
    const input = 'fo'
    const parser = tag(search)(input)
    const { value } = parser.next() as IteratorResult<EParserState>

    expect(value).toBe(EParserState.AWAIT_INPUT)

    const {
      value: [parsed, left],
    } = parser.next('o') as IteratorResult<TParserResult>

    expect(parsed).toEqual({ type: EParserType.TAG, value: search })
    expect([...left].join('')).toEqual('')
  })

  test('should throw on not found tag', () => {
    const search = 'foo'
    const input = 'boo'
    const parser = tag(search)(input)

    expect(() => parser.next()).toThrowError('Source string does not include specified tag')
  })

  test('should throw on invalid input', () => {
    const search = 'foo'
    const input = 'fo'
    const parser = tag(search)(input)

    parser.next()

    expect(() => parser.next()).toThrowError('Invalid input')
  })
})
