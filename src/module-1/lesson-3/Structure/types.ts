export enum SchemaTypeItem {
  U16 = 'u16',
  UTF16 = 'utf16',
}
export type SchemaU16Item = [string, SchemaTypeItem.U16]
export type SchemaUtf16Item = [string, SchemaTypeItem.UTF16, number]
export type SchemaItem = SchemaU16Item | SchemaUtf16Item

export type Structure = {
  set: (name: string, value: unknown) => void
  get: (name: string) => unknown
}

export type StructureFactory = (schema: Array<SchemaItem>) => Structure

export type TypeMap = Record<SchemaTypeItem, { bytes: number }>
export type Value = {
  type: SchemaTypeItem
  offset: number
  length: number
  bytes: number
}
export type ByteMap = Record<string, Value>
