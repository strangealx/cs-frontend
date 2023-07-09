export const allLimit = (iterable: Iterable<Function>, limit: number) => new Promise((resolve, reject) => {
  const promises = [...iterable]
  const iter = promises.entries()
  const result: any[] = new Array(promises.length)
  let pending = promises.length

  const next = () => {
    if (pending === 0) {
      resolve(result)
    }

    const {done, value} = iter.next()

    if (done) {
      return
    }

    const [i, fn] = value
  
    try {
      result[i] = fn()
      pending -= 1
    } catch (err) {
      reject(err)
      return
    }
  
    next()
  }

  for (let i = 0; i < limit; i += 1) {
    next()
  }
})
