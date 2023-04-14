import { Bit } from '../../../lesson-1/types'

// TODO:
// добавить поддержку отрицательных и дробных чисел

export const numberToBits = (num: number): Bit[] => {
  const output: Bit[] = []
  let number = num

  if (num < 0 || !Number.isInteger(num)) {
    throw new Error('Negative and float numbers are not implemented yet')
  }

  while (number >= 1) {
    output.push(Math.floor(number % 2) as Bit)
    number = number / 2
  }

  return output.reverse()
}
