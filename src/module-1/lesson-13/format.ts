export const format = (input: string, replacers: Record<string, string | number>) =>
  input.replace(/\${(.*?)}/g, (_, key) => (replacers[key] ? String(replacers[key]) : ''))
