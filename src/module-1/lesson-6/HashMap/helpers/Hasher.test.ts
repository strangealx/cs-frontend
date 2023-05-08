import { Hasher } from './Hasher'

describe('Hasher', () => {
  describe('Init', () => {
    test('should create an instance', () => {
      const hasher = new Hasher(10)
      expect(hasher).toBeInstanceOf(Hasher)
    })
  })

  describe('Use', () => {
    const size = 2 ** 32
    let hasher: Hasher

    beforeEach(() => {
      hasher = new Hasher(size)
    })

    test('should return equal result on hashing same number', () => {
      const firstHash = hasher.hash(10)
      const secondHash = hasher.hash(10)

      expect(firstHash).toBe(secondHash)
    })

    test('should return equal result on hashing same string', () => {
      const firstHash = hasher.hash('test')
      const secondHash = hasher.hash('test')

      expect(firstHash).toBe(secondHash)
    })

    test('should return equal result on hashing same object', () => {
      const input = {}

      const firstHash = hasher.hash(input)
      const secondHash = hasher.hash(input)

      expect(firstHash).toBe(secondHash)
    })

    test('should return different result on hashing different deeply equal objects', () => {
      const firstHash = hasher.hash({})
      const secondHash = hasher.hash({})

      expect(firstHash).not.toBe(secondHash)
    })
  })
})
