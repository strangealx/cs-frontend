import { TYPE_MAP } from './consts'
import { ByteMap, SchemaTypeItem, StructureFactory } from './types'

const assertType = (name: string, fitType: boolean) => {
  if (!fitType) {
    throw new Error(`Invalid type of data to set as "${name}"`)
  }
}

const assertName = (name: string, isInStructure: boolean) => {
  if (!isInStructure) {
    throw new Error(`Structure does not include "${name}"`)
  }
}

export const Structure: StructureFactory = (schema) => {
  const { byteMap, totalBytes } = schema.reduce<{ byteMap: ByteMap; totalBytes: number }>(
    (carry, [key, type, maxChars]) => {
      const { byteMap, totalBytes } = carry
      const { bytes } = TYPE_MAP[type]
      const length = maxChars || 1
      const currentBytes = bytes * length

      byteMap[key] = {
        type,
        length,
        bytes: currentBytes,
        offset: totalBytes,
      }

      return {
        byteMap,
        totalBytes: totalBytes + currentBytes,
      }
    },
    { byteMap: {}, totalBytes: 0 },
  )
  const buffer = new ArrayBuffer(totalBytes)
  const view = new DataView(buffer)

  return {
    get: (name) => {
      assertName(name, !!byteMap[name])

      const { type, offset, bytes, length } = byteMap[name]
      const bytesCount = bytes / length

      switch (type) {
        case SchemaTypeItem.U16:
          return view.getUint16(offset)
        case SchemaTypeItem.UTF16:
          return [...new Array(length)].reduce((carry, _, index) => {
            const code = view.getUint16(offset + index * bytesCount)
            return carry + (code ? String.fromCharCode(code) : '')
          }, '')
      }
    },
    set: (name, value) => {
      assertName(name, !!byteMap[name])

      const { type, offset, bytes, length } = byteMap[name]
      const bytesCount = bytes / length

      switch (type) {
        case SchemaTypeItem.U16:
          assertType(name, Number.isInteger(value) && Number(value) >= 0)
          view.setUint16(offset, Number(value))
          break
        case SchemaTypeItem.UTF16:
          assertType(name, typeof value === 'string')
          ;[...new Array(length)].forEach((_, index) => {
            const char = String(value)[index]
            view.setUint16(offset + index * bytesCount, char ? char.charCodeAt(0) : 0)
          })
          break
      }
    },
  }
}
