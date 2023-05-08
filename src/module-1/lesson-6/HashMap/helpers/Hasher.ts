import { TKey, IHasher } from '../types'
import { getRandomInt } from './getRandomInt'

const hashCode = Symbol()

export class Hasher implements IHasher {
  #size: number

  constructor(size: number) {
    this.#size = size
  }

  #stringToHash(key: string) {
    const hash = key.split('').reduce((carry, char) => {
      carry = ((carry << 5) - carry) + char.charCodeAt(0)
      return carry & carry
    }, 0);

    return this.#numberToHash(hash)
  }

  #numberToHash(key: number) {
    return key % this.#size
  }

  #objectToHash(key: object & { [hashCode]?: number }): number {
    if (key[hashCode] === undefined) {
      Object.defineProperty(key, hashCode, {
        enumerable: false,
        configurable: false,
        writable: false,
        value: getRandomInt(0, Number.MAX_SAFE_INTEGER)
      })
    }
  
    return this.#numberToHash(key[hashCode]!)
  }

  hash(key: TKey) {
    switch (typeof key) {
      case 'number':
        return this.#numberToHash(key)
      case 'string':
        return this.#stringToHash(key)
      case 'object':
        return this.#objectToHash(key)
    }
  }
}