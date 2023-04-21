import { collapseByStack, collapseRecursively } from './collapse'

describe('collpase', () => {
  describe('collapseRecursively', () => {
    test('should collpase object correctly', () => {
      const input = {
        a: {
          b: [1, 2],
          '': { c: 2 },
        },
      }

      expect(collapseRecursively(input)).toEqual({ 'a.b.0': 1, 'a.b.1': 2, 'a..c': 2 })
    })

    test('should collpase empty object/array', () => {
      expect(collapseRecursively({})).toEqual({})
      expect(collapseRecursively([])).toEqual({})
    })
  })

  describe('collapseByStack', () => {
    test('should collpase object correctly', () => {
      const input = {
        a: {
          b: [1, 2],
          '': { c: 2 },
        },
      }

      expect(collapseByStack(input)).toEqual({ 'a.b.0': 1, 'a.b.1': 2, 'a..c': 2 })
    })

    test('should collpase empty object/array', () => {
      expect(collapseByStack({})).toEqual({})
      expect(collapseByStack([])).toEqual({})
    })
  })
})
