import { Queue } from './Queue'
import { ITwoSideQueue } from './types'

export class TwoSideQueue<T> extends Queue<T> implements ITwoSideQueue<T> {
  unshift(value: T) {
    this.list.addFirst(value)
  }

  pop() {
    const output = this.list.last?.value

    if (!output) {
      throw new Error('Queue is empty')
    }

    this.list.remove()

    return output
  }

  shift() {
    const output = this.list.first?.value

    if (!output) {
      throw new Error('Queue is empty')
    }

    this.list.removeFirst()

    return output
  }
}
