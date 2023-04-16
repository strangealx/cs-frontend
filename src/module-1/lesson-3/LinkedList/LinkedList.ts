import { ILinkedList, INode } from './types'

class Node<T> implements INode<T> {
  public next: INode<T> | null = null
  public prev: INode<T> | null = null

  constructor(public value: T) {}
}

export class LinkedList<T> implements ILinkedList<T> {
  protected head: INode<T> | null = null
  protected tail: INode<T> | null = null

  get first() {
    return this.head
  }

  get last() {
    return this.tail
  }

  add(value: T) {
    const node = new Node<T>(value)

    if (this.head === null) {
      this.head = node
      this.tail = node

      return
    }

    if (this.tail !== null) {
      this.tail.next = node
      node.prev = this.tail
    }

    this.tail = node
  }
}
