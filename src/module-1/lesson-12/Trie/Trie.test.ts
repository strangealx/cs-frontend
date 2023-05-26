import { Trie } from './Trie'

describe('Trie', () => {
  describe('Use', () => {
    let trie: Trie

    beforeEach(() => {
      trie = new Trie()
    })

    test('should handle trie correctly', () => {
      trie.addWord('мясо')
      trie.addWord('мясорубка')
      trie.addWord('мир')

      expect(trie.go('м')?.go('я')?.go('с')?.go('о')?.isWord()).toBe(true)
      expect(trie.go('м')?.go('и')?.go('р')?.isWord()).toBe(true)
      expect(trie.go('м')?.go('я')?.go('с')?.go('о')?.go('р')?.isWord()).toBe(false)
    })

    test('should return null on non existing char', () => {
      trie.addWord('мясо')

      expect(trie.go('м')?.go('и')).toBe(null)
    })

    test('should find word', () => {
      const words = ['мясо', 'мясорубка', 'мир']

      words.forEach((word) => trie.addWord(word))

      words.forEach((word) => expect(trie.findWord(word)).toBe(true))
    })

    test('should return false on unexisting word', () => {
      const words = ['мясо', 'мясорубка', 'мир']

      words.forEach((word) => trie.addWord(word))

      expect(trie.findWord('мясор')).toBe(false)
      expect(trie.findWord('сосиска')).toBe(false)
      expect(trie.findWord('мясоруб')).toBe(false)
    })
  })
})
