import { take } from './take'
import { EParserType, TParserResult } from './types'

describe('take', () => {
  test('should return found string', () => {
    const search = /\d/
    const input = '1234 foo'
    const takeNumberParser = take(search)(input)
    const takeMaxNumberParser = take(search, { max: 2 })(input)

    const {
      value: [parsed, left],
    } = takeNumberParser.next() as IteratorResult<TParserResult>
    const {
      value: [parsedMax, leftMax],
    } = takeMaxNumberParser.next() as IteratorResult<TParserResult>

    expect(parsed).toEqual({ type: EParserType.TAKE, value: '1234' })
    expect([...left].join('')).toEqual(' foo')
    expect(parsedMax).toEqual({ type: EParserType.TAKE, value: '12' })
    expect([...leftMax].join('')).toEqual('34 foo')
  })

  test('should handle function as pattern', () => {
    const search = (char: string) => /\d/.test(char)
    const input = '1234 foo'
    const parser = take(search, { min: 5 })(input)

    expect(() => parser.next()).toThrowError('Source string does not fit for specified pattern')
  })

  test('should throw on not found pattern', () => {
    const search = /\d/
    const input = '1234 foo'
    const parser = take(search, { min: 5 })(input)

    expect(() => parser.next()).toThrowError('Source string does not fit for specified pattern')
  })
})
