type TSetImmediateId = number

let id: TSetImmediateId = 1
const callbackList = new Map<TSetImmediateId, VoidFunction>()

export const setImmediate = (cb: VoidFunction): TSetImmediateId => {
  const currentId = id++

  callbackList.set(currentId, cb)

  queueMicrotask(() => {
    const cb = callbackList.get(currentId)

    if (cb && typeof cb === 'function') {
      cb()
      callbackList.delete(currentId)
    }
  })

  return currentId
}

export const clearImmediate = (id: TSetImmediateId) => {
  callbackList.delete(id)
}