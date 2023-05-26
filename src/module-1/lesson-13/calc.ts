export const calc = (input: string) =>
  input.replace(/([)(+\-0-9][)(0-9+\-\/* ]*([0-9]|[)(])+)/gim, (_, expression: string) => {
    return eval(expression)
  })
