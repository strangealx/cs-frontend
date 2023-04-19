import { LinkedList } from '../../lesson-3'
import { ILinkedList } from '../../lesson-3/LinkedList/types'
import { IQueue } from './types'

export class Queue<T> implements IQueue<T> {
  protected list: ILinkedList<T>

  constructor() {
    this.list = new LinkedList()
  }

  get head() {
    return this.list.first?.value || null
  }

  get tail() {
    return this.list.last?.value || null
  }

  push(value: T) {
    this.list.add(value)
  }

  pop() {
    const output = this.list.first?.value

    if (!output) {
      throw new Error('Queue is empty')
    }

    this.list.removeFirst()

    return output
  }
}
