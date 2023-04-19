export interface INode<T> {
  value: T
  next: INode<T> | null
  prev: INode<T> | null
}

export interface ILinkedList<T> {
  first: INode<T> | null
  last: INode<T> | null

  add(value: T): void
  addFirst(value: T): void
  remove(): void
  removeFirst(): void
}
