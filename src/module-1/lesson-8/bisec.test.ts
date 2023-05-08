import { bisecLeft, bisecRight } from './bisec'

describe('bisecLeft', () => {
  test('should return correct index of an element', () => {
    const search = 7
    const input = [1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 8, 9]
    
    expect(bisecLeft(input, (el) => el - search)).toBe(6)
  })

  test('should return 0 if all elements are equal end equals search', () => {
    const search = 7
    const input = new Array(10).fill(search)
    
    expect(bisecLeft(input, (el) => el - search)).toBe(0)
  })

  test('should return last index if only the last element matches', () => {
    const search = 7
    const input = new Array(10).fill(0)

    input.push(search)

    expect(bisecLeft(input, (el) => el - search)).toBe(input.length - 1)
  })

  test('should return -1 for no match', () => {
    const search = 7
    const input = new Array(10).fill(0)

    expect(bisecLeft(input, (el) => el - search)).toBe(-1)
  })
})

describe('bisecRight', () => {
  test('should return correct index of an element', () => {
    const search = 7
    const input = [1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 8, 9]
    
    expect(bisecRight(input, (el) => el - search)).toBe(9)
  })

  test('should return 0 if all elements are equal end equals search', () => {
    const search = 7
    const input = new Array(10).fill(search)
    
    expect(bisecRight(input, (el) => el - search)).toBe(input.length - 1)
  })

  test('should return last index if only the last element matches', () => {
    const search = 7
    const input = new Array(10).fill(0)

    input.push(search)

    expect(bisecRight(input, (el) => el - search)).toBe(input.length - 1)
  })

  test('should return -1 for no match', () => {
    const search = 7
    const input = new Array(10).fill(0)

    expect(bisecRight(input, (el) => el - search)).toBe(-1)
  })
})