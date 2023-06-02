import { format } from './format'
import { calc } from './calc'

describe('Regular expressions', () => {
  describe('only latin, digits, _ and $', () => {
    let re: RegExp

    beforeEach(() => {
      re = /^[a-z0-9_$]+$/
    })

    test('should return "false" on wrong string', () => expect(re.test('привет')).toBe(false))
    test('should return "true" on correct string', () => expect(re.test('hi0123_$')).toBe(true))
    test('should return "false" on mixed string', () => expect(re.test('hi - привет')).toBe(false))
  })

  describe('only first digigts in a row', () => {
    let re: RegExp

    beforeEach(() => {
      re = /,[0-9,]+;?/
    })

    test('should split correctly', () =>
      expect('762120,0,22;763827,0,50;750842,0,36;749909,0,95;755884,0,41;'.split(re)).toEqual([
        '762120',
        '763827',
        '750842',
        '749909',
        '755884',
        '',
      ]))
  })

  describe('match all & groups', () => {
    let re: RegExp

    beforeEach(() => {
      re = /"([a-z]*)":\s?("?[0-9]"?)/gi
    })

    test('should highlight correct groups', () => {
      expect(JSON.stringify([...'{"a": 1, "b": "2"}'.matchAll(re)])).toBe(
        JSON.stringify([
          ['"a": 1', 'a', '1'],
          ['"b": "2"', 'b', '"2"'],
        ]),
      )
    })
  })

  describe('format', () => {
    test('should replace all placeholders with values', () => {
      const input = 'Hello, ${user}! Your age is ${age}.'
      const replacers = { user: 'Bob', age: 10 }
      const output = 'Hello, Bob! Your age is 10.'

      expect(format(input, replacers)).toBe(output)
    })

    test('should replace all placeholders with values or nothing if there are no such placeholder in replacers', () => {
      const input = 'Hello, ${user}! Your age is ${age}.'
      const replacers = { user: 'Bob' }
      const output = 'Hello, Bob! Your age is .'

      expect(format(input, replacers)).toBe(output)
    })
  })

  describe('calc', () => {
    test('should calculate all expressions', () => {
      const input = `
      Какой-то текст (10 + 15 - 24) ** 2
      Еще какой-то текст 2 * 10
      `
      const output = `
      Какой-то текст 1
      Еще какой-то текст 20
      `

      expect(calc(input)).toBe(output)
    })
  })
})
