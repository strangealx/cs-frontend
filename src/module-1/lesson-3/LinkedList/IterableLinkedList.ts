import { LinkedList } from './LinkedList'

export class IterableLinkedList<T> extends LinkedList<T> implements Iterable<[T, number]> {
  *[Symbol.iterator](): Iterator<[T, number]> {
    let current = this.head
    let index = 0

    while (current) {
      yield [current.value, index]
      current = current.next
      index += 1
    }
  }
}
