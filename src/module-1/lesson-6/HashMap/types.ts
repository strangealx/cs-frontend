export type TKey = number | string | object 

export interface IHasher {
  hash: (key: TKey) => number
}

export interface IHasherClass {
  new(size: number): IHasher
}
