type Primitive = string | number | boolean
type Source = { [key: string]: Source | Primitive } | Array<Source> | Array<Primitive>

export const collapseRecursively = (obj: Source, path: string[] = [], output: Record<string, Primitive> = {}) => {
  if (typeof obj !== 'object') {
    output[path.join('.')] = obj
    return output
  }
  
  Object.keys(obj).forEach((key) => {
    collapseRecursively((obj as Record<string, Source>)[key], [...path, key], output)
  })

  return output
}

export const collapseByStack = (obj: Source) => {
  const output: Record<string, Primitive> = {}
  const stack: Array<[string, Source | Primitive]> = Object.entries(obj)

  while (stack.length) {
    const [key, value] = stack.pop() as [string, Source]

    if (typeof value !== 'object') {
      output[key] = value
      continue
    }

    stack.push(
      // prettier-ignore
      ...(Object.entries(value).map(
        ([nextKey, nextValue]) => [`${key}.${nextKey}`, nextValue]) as Array<[string, Source]>
      ),
    )
  }

  return output
}
