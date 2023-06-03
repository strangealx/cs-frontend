import { Range } from './Range'

describe('Range', () => {
  let startNumber: number
  let endNumber: number
  let startSymbol: string
  let endSymbol: string
  let inputNumbers: number[]
  let inputSymbols: string[]

  beforeEach(() => {
    startNumber = 0
    endNumber = 5
    startSymbol = 'a'
    endSymbol = 'd'
    inputNumbers = [0, 1, 2, 3, 4, 5]
    inputSymbols = ['a', 'b', 'c', 'd']
  })

  test('should iterate over range', () => {
    const numberRange = new Range(startNumber, endNumber)
    const symbolRange = new Range(startSymbol, endSymbol)

    expect([...numberRange]).toEqual(inputNumbers)
    expect([...symbolRange]).toEqual(inputSymbols)
  })

  test('should iterate over reversed range', () => {
    const numberRange = new Range(startNumber, endNumber)
    const symbolRange = new Range(startSymbol, endSymbol)

    expect([...numberRange.reverse()]).toEqual(inputNumbers.reverse())
    expect([...symbolRange.reverse()]).toEqual(inputSymbols.reverse())
  })

  test('should return iterable iterator', () => {
    const iter = new Range(startNumber, endNumber)[Symbol.iterator]()
    const nextIter = iter[Symbol.iterator]()

    expect(iter).toBe(nextIter)
  })
})
