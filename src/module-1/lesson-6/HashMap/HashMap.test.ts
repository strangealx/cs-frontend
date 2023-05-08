import { HashMap } from './HashMap'
import { HASH_MAP_EDGE_CAPACITY_RATE } from './consts'
import { Hasher } from './helpers'

describe('HashMap', () => {
  describe('Init', () => {
    test('should create an instance', () => {
      const map = new HashMap(Hasher, 10)
      expect(map).toBeInstanceOf(HashMap)
    })
  })

  describe('Use', () => {
    const defaultKey = 42
    const defaultInput = 10

    let map: HashMap<number>

    beforeEach(() => {
      map = new HashMap(Hasher)
    })

    test('should set/get correct value', () => {
      const key = defaultKey
      const input = defaultInput

      map.set(key, input)

      expect(map.get(key)).toBe(input)
    })

    test('should re-set key', () => {
      const key = defaultKey
      const input = defaultInput
      const nextInput = input + 1

      map.set(key, input)
      expect(map.get(key)).toBe(input)

      map.set(key, nextInput)
      expect(map.get(key)).toBe(nextInput)
    })

    test('should return correct boolen on has() call', () => {
      const key = defaultKey
      const input = defaultInput
      const unexistingKey = key + 1

      map.set(key, input)

      expect(map.has(key)).toBe(true)
      expect(map.has(unexistingKey)).toBe(false)
    })

    test('should delete key from hash map', () => {
      const key = defaultKey
      const input = defaultInput

      map.set(key, input)
      map.delete(key)
      expect(map.has(key)).toBe(false)
      expect(map.get(key)).toBeUndefined()
    })

    test('should return undefined on unexisting key', () => {
      const key = defaultKey

      expect(map.get(key)).toBeUndefined()
    })

    test('should iterate over the hashmap', () => {
      const input = new Array(10).fill(0).map((_, index) => ({ key: index, value: index }))
      let counter = 0
      let check: typeof input = []
  
      input.forEach(({ key, value }) => map.set(key, value))

      for (const [key, value] of map) {
        const found = input.find(({ key: foundKey, value: foundValue }) => key === foundKey && value === foundValue)
        found && check.push(found)
      }

      expect(check.length).toBe(input.length)
    })
  })

  describe('grow', () => {
    const size = 7
    let map: HashMap<number>

    beforeEach(() => {
      map = new HashMap(Hasher, size)
    })

    test('should grow and re-hash the hashmap', () => {
      const edgeCapacity = Math.floor(size * HASH_MAP_EDGE_CAPACITY_RATE)
      const startInput = new Array(edgeCapacity).fill(0).map((_, index) => ({ key: index, value: index }))
      const nextInput = { key: edgeCapacity + 1, value: edgeCapacity + 1 }

      startInput.forEach(({ key, value }) => map.set(key, value))

      expect(map.length).toBe(edgeCapacity)
      expect(map.capacity).toBe(size)
      map.set(nextInput.key, nextInput.value)

      expect(map.capacity).toBe(size * 2)
      ;([...startInput, nextInput]).forEach(({ key, value }) => expect(map.get(key)).toBe(value))
    })
  })
})
