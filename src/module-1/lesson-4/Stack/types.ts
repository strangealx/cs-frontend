export interface IStack {
  head: number | null
  push(value: number): void
  pop(): number
}
