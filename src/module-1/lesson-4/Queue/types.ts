export interface IQueue<T> {
  head: T | null
  tail: T | null
  push(value: T): void
  pop(): T
}

export interface ITwoSideQueue<T> extends IQueue<T> {
  unshift(value: T): void
  shift(): T
}
