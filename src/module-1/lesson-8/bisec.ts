
type TCounter = { start: number, end: number }
type TComparator<T> = (value: T) => number 
type TUpdateCounter = (result: number, curentIndex: number, counter: TCounter) => TCounter
type TBisecWidthDirection = <T>(list: T[], comparator: TComparator<T>) => number
type TBisec = <T>(list: T[], comparator: TComparator<T>, updateCounter: TUpdateCounter) => number

const bisec: TBisec = (list, comparator, updateCounter) => {
  let counter = {
    start: 0,
    end: list.length
  }
  let output = -1

  while (counter.start < counter.end) {
    const { start, end } = counter
    const mid = Math.floor((start + end) / 2)
    const result = comparator(list[mid])

    output = result === 0 ? mid : output
    counter = updateCounter(result, mid, counter)
  }

  return output
}

export const bisecLeft: TBisecWidthDirection = (list, comparator) => bisec(list, comparator, (result, index, counter) => {
  if (result >= 0) {
    return { ...counter, end: index }
  } else {
    return { ...counter, start: index + 1 }
  }
})


export const bisecRight:TBisecWidthDirection = (list, comparator) => bisec(list, comparator, (result, index, counter) => {
  if (result > 0) {
    return { ...counter, end: index }
  } else {
    return { ...counter, start: index + 1 }
  }
})
