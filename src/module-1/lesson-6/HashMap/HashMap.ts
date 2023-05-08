import { IterableLinkedList } from '../../../common'
import { HASH_MAP_EDGE_CAPACITY_RATE } from './consts'
import { IHasher, IHasherClass, TKey } from './types'

export class HashMap<T> {
  #HasherClass: IHasherClass
  #hasher: IHasher
  #capacity: number
  #length: number
  #buffer: IterableLinkedList<[TKey, T]>[]

  constructor(Hasher: IHasherClass, size: number = 31) {
    this.#capacity = size
    this.#length = 0
    this.#buffer = new Array(this.#capacity)
    this.#HasherClass = Hasher
    this.#hasher = new this.#HasherClass(this.#capacity)
  }

  get capacity() {
    return this.#capacity
  }

  get length() {
    return this.#length
  }

  #grow() {
    const saved = this.#buffer

    this.#capacity *= 2
    this.#buffer = new Array(this.#capacity)
    this.#hasher = new this.#HasherClass(this.#capacity)

    for (let i = 0; i < saved.length; i += 1) {
      const list = saved[i]

      if (list) {
        for (const [[key, value]] of list) {
          this.set(key, value)
        }
      }
    }

    return this.#buffer
  }

  set(key: TKey, value: T) {
    const edge = Math.floor(this.#capacity * HASH_MAP_EDGE_CAPACITY_RATE)

    if (this.#length >= edge) {
      this.#grow()
    }

    const hash = this.#hasher.hash(key)
    let list = this.#buffer[hash]

    if (!list) {
      this.#buffer[hash] = new IterableLinkedList<[TKey, T]>()
      list = this.#buffer[hash]
    }

    for (const [record] of list) {
      const [listKey] = record

      if (listKey === key) {
        record[1] = value
        return
      }
    }

    list.add([key, value])
    this.#length += 1
  }

  get(key: TKey) {
    const hash = this.#hasher.hash(key)
    const list = this.#buffer[hash]

    if (list instanceof IterableLinkedList) {
      for (const [[listKey, value]] of list) {
        if (listKey === key) {
          return value
        }
      }
    }

    return undefined
  }

  has(key: TKey) {
    const hash = this.#hasher.hash(key)
    const list = this.#buffer[hash]

    if (list instanceof IterableLinkedList) {
      for (const [[listKey]] of list) {
        if (listKey === key) {
          return true
        }
      }
    }

    return false
  }

  delete(key: TKey) {
    const hash = this.#hasher.hash(key)
    const list = this.#buffer[hash]

    if (list instanceof IterableLinkedList) {
      for (const [[listKey], index] of list) {
        if (listKey === key) {
          list.removeByIndex(index)
          return
        }
      }
    }
  }

  *[Symbol.iterator]() {
    for (let i = 0; i < this.#buffer.length; i += 1) {
      if (this.#buffer[i]) {
        for (const [value] of this.#buffer[i]) {
          yield value
        }
      }
    }
  }
}
