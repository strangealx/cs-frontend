import { LinkedList } from './LinkedList'

export class IterableLinkedList<T> extends LinkedList<T> implements Iterable<T> {
  *[Symbol.iterator](): Iterator<T> {
    let current = this.head
  
    while (current) {
      yield current.value
      current = current.next
    }
  }
}