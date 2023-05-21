import { iter } from './iter'

describe('iter', () => {
  test('should correctly handle surrogate pairs', () => {
    const input = '😀'
    const output = ['😀']

    expect([...iter(input)]).toEqual(output)
  })

  test('should correctly handle regional surrogate pairs', () => {
    const input = '🇷🇺'
    const output = ['🇷🇺']

    expect([...iter(input)]).toEqual(output)
  })

  test('should correctly handle diacritical symbols', () => {
    const input = 'à'
    const output = ['à']

    expect([...iter(input)]).toEqual(output)
  })

  test('should correctly handle mixed string', () => {
    const input = '1😃à🇷🇺🇷👩🏽‍❤️‍💋‍👨🇷1'
    const output = ['1', '😃', 'à', '🇷🇺', '🇷', '👩🏽‍❤️‍💋‍👨', '🇷', '1']

    expect([...iter(input)]).toEqual(output)
  })
})
