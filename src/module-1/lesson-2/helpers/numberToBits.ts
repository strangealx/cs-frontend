import { Bit } from '../..'

// TODO:
// добавить поддержку отрицательных и дробных чисел

export const numberToBits = (num: number): Bit[] => {
  const output: Bit[] = []
  let number = num

  while (number >= 1) {
    output.push(Math.floor(number % 2) as Bit)
    number = number / 2
  }

  return output.reverse()
}
