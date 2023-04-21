const BRACKETS_MAP: Record<string, string> = { '(': ')', '[': ']', '{': '}' }
const FLIPPED_BRACKETS_MAP = Object.fromEntries(Object.entries(BRACKETS_MAP).map(([key, value]) => [value, key]))

export const isValid = (input: string) => {
  const stack = []
  const { length } = input

  for (let i = 0; i < length; i += 1) {
    const char = input[i]
    const bracket = BRACKETS_MAP[char]
    const backBracket = FLIPPED_BRACKETS_MAP[char]

    if (bracket) {
      stack.push(bracket)
      continue
    }

    if (backBracket && char !== stack.pop()) {
      return false
    }
  }

  return !stack.length
}
