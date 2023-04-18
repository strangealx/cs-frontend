import { Structure } from './Structure'
import { SchemaItem, SchemaTypeItem, Structure as StructureInstance } from './types'

describe('Structure', () => {
  const stringLength = 10
  const schema: SchemaItem[] = [
    ['name', SchemaTypeItem.UTF16, stringLength],
    ['lastName', SchemaTypeItem.UTF16, stringLength],
    ['age', SchemaTypeItem.U16],
  ]
  let structure: StructureInstance

  beforeEach(() => {
    structure = Structure(schema)
  })

  test('should return empty data on no set call', () => {
    expect(structure.get('name')).toBe('')
    expect(structure.get('lastName')).toBe('')
    expect(structure.get('age')).toBe(0)
  })

  test('should set data', () => {
    const [name, lastName, age] = ['Jack', 'Black', 50]

    structure.set('name', name)
    structure.set('lastName', lastName)
    structure.set('age', age)

    expect(structure.get('name')).toBe(name)
    expect(structure.get('lastName')).toBe(lastName)
    expect(structure.get('age')).toBe(age)
  })

  test('should set empty data', () => {
    const [name, emptyName] = ['Jack', '']

    structure.set('name', name)
    structure.set('name', emptyName)

    expect(structure.get('name')).toBe(emptyName)
  })

  test('should cut too large data', () => {
    const [name, age] = [new Array(stringLength + 1).fill('a').join(''), 2 ** 32 - 1]
    const [cutName, cutAge] = [new Array(stringLength).fill('a').join(''), 2 ** 16 - 1]

    structure.set('age', age)
    structure.set('name', name)
    expect(structure.get('age')).toBe(cutAge)
    expect(structure.get('name')).toBe(cutName)
  })

  test('should throw on invalid data', () => {
    const name = 1

    expect(() => structure.set('name', name)).toThrowError('Invalid type of data to set as "name"')
  })

  test('should throw on invalid property name', () => {
    const key = 'test'

    expect(() => structure.get(key)).toThrowError('Structure does not include "test"')
  })
})
