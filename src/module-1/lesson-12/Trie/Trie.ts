type TChild = Record<string, number>

type TTrieNode = {
  parent: number | null
  value: string | null
  children: TChild
  go: TChild
  isWord: boolean
  link: number | null
}

export class Trie {
  tree: TTrieNode[]

  constructor() {
    this.tree = [
      {
        parent: null,
        value: null,
        children: {},
        go: {},
        isWord: false,
        link: null,
      },
    ]
  }

  #go(char: string, index = 0) {
    const { tree } = this

    if (!tree[index] || !tree[index].children[char]) {
      return null
    }

    const nextIndex = tree[index].children[char]

    return {
      go: (char: string) => this.#go(char, nextIndex),
      isWord: () => tree[nextIndex].isWord,
    }
  }

  #goLink(index: number, char: string) {
    const { tree } = this
    const root = tree[0]
    const node = tree[index]

    if (!node.go[char]) {
      if (node.children[char]) {
        node.go[char] = node.children[char]
      } else if (node === root) {
        node.go[char] = 0
      } else {
        node.go[char] = this.#goLink(this.#getLink(index), char)
      }
    }

    return node.go[char]
  }

  #getLink(index: number) {
    const { tree } = this
    const root = tree[0]
    const node = tree[index]

    if (!node.link) {
      if (node === root || node.parent === 0) {
        node.link = 0
      } else {
        node.link = this.#goLink(node.parent!, node.value!)
      }
    }

    return node.link
  }

  addWord(word: string) {
    const { tree } = this
    const chars = [...word]
    let nodeIndex = 0

    for (let i = 0; i < chars.length; i += 1) {
      const char = chars[i]
      let nextNodeIndex = tree[nodeIndex].children[char]

      if (nextNodeIndex === undefined) {
        const nextNode = {
          parent: nodeIndex,
          value: char,
          children: {},
          go: {},
          isWord: false,
          link: null,
        }

        nextNodeIndex = tree.push(nextNode) - 1
        tree[nodeIndex].children[char] = nextNodeIndex
      }

      nodeIndex = nextNodeIndex
    }

    tree[nodeIndex].isWord = true
  }

  findWord(word: string) {
    const { tree } = this
    const chars = [...word]
    let nodeIndex = 0

    for (let i = 0; i < chars.length; i += 1) {
      const char = chars[i]
      let nextNodeIndex = tree[nodeIndex].children[char]

      if (nextNodeIndex === undefined) {
        return false
      }

      nodeIndex = nextNodeIndex
    }

    return tree[nodeIndex].isWord
  }

  go(char: string) {
    return this.#go(char, 0)
  }
}
