import { iter } from './iter'

describe('iter', () => {
  test('should correctly iterate over surrogate pairs', () => {
    const input = '😀'
    const output =  ['😀']

    expect([...iter(input)]).toEqual(output)
  })

  test('should correctly iterate over surrogate pairs with joiners and modifiers', () => {
    const input = '1😃à🇷🇺👩🏽‍❤️‍💋‍👨'
    const output = ['1', '😃', 'à', '🇷🇺', '👩🏽‍❤️‍💋‍👨']

    expect([...iter(input)]).toEqual(output)
  })
})
