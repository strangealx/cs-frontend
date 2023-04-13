export type ImageSource = string | HTMLCanvasElement | ImageData | Promise<ImageData>

export type SchemaType = 'number' | 'ascii' | 'boolean'
export type SchemaItem = [number, SchemaType]
export type Schema = Array<SchemaItem>
export type ValueType = number | string | boolean
export type ValueList = Array<ValueType>
