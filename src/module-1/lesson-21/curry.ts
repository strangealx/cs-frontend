const placeholder = Symbol('placeholder')

type TCurry = {
  (fn: Function): Function
  _?: symbol
}

const curry: TCurry = function (fn) {
  const totalArgs = fn.length

  function curried(this: unknown, ...args: (unknown | symbol)[]) {
    const placeholders = args.reduce<number>((carry, arg) => carry + (arg === curry._ ? 1 : 0), 0)

    if (args.length >= totalArgs && placeholders === 0) {
      return fn.apply(this, args)
    }

    return function (this: unknown, ...nextArgs: unknown[]) {
      let index = 0
      const replacements = args.map((arg) => (arg === placeholder && index < nextArgs.length ? nextArgs[index++] : arg))

      return curried.apply(this, replacements.concat(nextArgs.slice(index)))
    }
  }

  Object.defineProperty(curried, 'length', { value: totalArgs })

  return curried
}

Object.defineProperty(curry, '_', { value: placeholder })

export { curry }
