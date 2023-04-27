import { HashMap } from './HashMap'

describe('HashMap', () => {
  describe('Init', () => {
    test('should create an instance', () => {
      const map = new HashMap(10)
      expect(map).toBeInstanceOf(HashMap)
    })
  })

  describe('Use', () => {
    const size = 2
    let map: HashMap

    beforeEach(() => {
      map = new HashMap(size)
    })

    test('should set/get correct value', () => {
      const key = 42
      const input = 10

      map.set(key, input)

      expect(map.get(key)).toBe(input)
    })

    test('should return coorect boolen on has() call', () => {
      const key = 42
      const input = 10
      const unexistingKey = key + 1

      map.set(key, input)

      expect(map.has(key)).toBe(true)
      expect(map.has(unexistingKey)).toBe(false)
    })

    test('should throw if one of coords is negative', () => {
      const key = 42
      const input = 10

      map.set(key, input)
      map.delete(key)
      expect(map.has(key)).toBe(false)
    })

    test('should throw on out of bounds set call', () => {
      const inputs = [{ key: 42, value: 10 }, { key: 43, value: 10 }]

      inputs.forEach(({ key, value }) => {
        map.set(key, value)
      })

      expect(() => map.set('test')).toThrowError('Hash map is full, no keys could be added')
    })

    // TODO
    test('should resolve equal hashes', () => {
      expect('todo').toBe('todo')
    })
  })
})
