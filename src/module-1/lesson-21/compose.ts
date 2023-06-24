export const compose = function (...fns: Function[]) {
  return function (this: unknown, ...args: unknown[]) {
    const [result] = fns.reduceRight(function (this: unknown, carry, fn) {
      return [fn.apply(this, carry)]
    }, args)

    return result
  }
}
