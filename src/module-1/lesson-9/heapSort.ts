type TComparator<T> = (a: T, b: T) => number

const heapify = <T>(list: T[], length: number, index: number, comparator: TComparator<T>) => {
  const left = 2 * index + 1
  const right = 2 * index + 2
  let max = index

  if (left < length && comparator(list[left], list[max]) > 0) {
    max = left
  }

  if (right < length && comparator(list[right], list[max]) > 0) {
    max = right
  }

  if (max !== index) {
    let temp = list[index]

    list[index] = list[max]
    list[max] = temp

    heapify(list, length, max, comparator)
  }
}

const buildHeap = <T>(list: T[], comparator: TComparator<T>) => {
  for (let i = Math.floor((list.length - 1) / 2); i >= 0; i -= 1) {
    heapify(list, list.length, i, comparator)
  }
}

export const sort = <T = number>(list: T[], comparator: TComparator<T>) => {
  buildHeap(list, comparator)

  for (let i = list.length - 1; i >= 0; i -= 1) {
    let temp = list[i]

    list[i] = list[0]
    list[0] = temp

    heapify(list, i, 0, comparator)
  }
}
