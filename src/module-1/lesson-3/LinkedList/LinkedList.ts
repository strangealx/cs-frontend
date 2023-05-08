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

    if (this.tail === null) {
      this.head = node
      this.tail = node

      return
    }

    this.tail.next = node
    node.prev = this.tail
    this.tail = node
  }

  remove() {
    if (this.tail === null) {
      return
    }

    if (this.tail === this.head) {
      this.tail = null
      this.head = null
      return
    }

    this.tail = this.tail.prev
    this.tail!.next = null
  }

  addFirst(value: T) {
    const node = new Node<T>(value)

    if (this.head === null) {
      this.head = node
      this.tail = node

      return
    }

    this.head.prev = node
    node.next = this.head
    this.head = node
  }

  removeFirst() {
    if (this.head === null) {
      return
    }

    if (this.tail === this.head) {
      this.tail = null
      this.head = null
      return
    }

    this.head = this.head.next
    this.head!.prev = null
  }

  removeByIndex(index: number) {
    let current = this.head
    let counter = 0 

    if (index === 0) {
      this.removeFirst()
      return
    }

    while (current && counter <= index) {
      if (counter === index) {
        if (current.next === null) {
          this.remove()
          return
        }

        current.prev!.next = current.next
        current.next!.prev = current.prev

        return
      }

      current = current.next
      counter += 1
    }

    throw new Error('Out of bounds of list. Use "remove" method instead')
  }

  addByIndex(index: number, value: T) {
    let current = this.head
    let counter = 0 

    if (index === 0) {
      this.addFirst(value)
      return
    }

    while (current && counter <= index) {
      if (counter === index) {    
        const insert = new Node(value)

        insert.next = current
        insert.prev = current.prev
        current.prev!.next = insert
        current.prev = insert

        return
      }

      current = current.next
      counter += 1
    }

    throw new Error('Out of bounds of list. Use "add" method instead')
  }
}
