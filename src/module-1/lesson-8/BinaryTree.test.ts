import { BinaryTree } from './BinaryTree'

describe('BinaryTree', () => {
  describe('Use', () => {
    const input = [1, 11, 6, 16, 26, 3, 7, 22]
    let tree: BinaryTree<number>

    beforeEach(() => {
      tree = new BinaryTree(10)
      
      input.forEach((value) => tree.add(value))
    })

    test('should traverse tree in-order', () => {
      const output: number[] = []
      const expected = [1, 3, 6, 7, 10, 11, 16, 22, 26]

      tree.inOrderTraverse((value) => output.push(value))

      expect(output).toEqual(expected)
    })

    test('should traverse tree pre-order', () => {
      const output: number[] = []
      const expected = [10, 1, 6, 3, 7, 11, 16, 26, 22]

      tree.preOrderTraverse((value) => output.push(value))

      expect(output).toEqual(expected)
    })

    test('should traverse tree post-order', () => {
      const output: number[] = []
      const expected = [3, 7, 6 , 1, 22, 26, 16, 11, 10]

      tree.postOrderTraverse((value) => output.push(value))

      expect(output).toEqual(expected)
    })

    test('should traverse tree breadth-first', () => {
      const output: number[] = []
      const expected = [10, 1, 11, 6, 16, 3, 7, 26, 22]

      tree.breadthFirstTraverse((value) => output.push(value))

      expect(output).toEqual(expected)
    })

    test('should throw on trying to add double value', () => {
      expect(() => tree.add(10)).toThrowError('Can\'t handle doubles right now: "10"')
    })

    test('should successfully remove node with one leaf', () => {
      const output: number[] = []
      const expected = [1, 3, 6, 7, 10, 16, 22, 26]

      tree.remove(11)
      tree.inOrderTraverse((value) => output.push(value))

      expect(output).toEqual(expected)
    })

    test('should successfully remove node with two leafs', () => {
      const output: number[] = []
      const expected = [1, 3, 7, 10, 11, 16, 22, 26]

      tree.remove(6)
      tree.inOrderTraverse((value) => output.push(value))

      expect(output).toEqual(expected)
    })

    test('should successfully remove node with no leafs', () => {
      const output: number[] = []
      const expected = [1, 3, 6, 7, 10, 11, 16, 26]

      tree.remove(22)
      tree.inOrderTraverse((value) => output.push(value))

      expect(output).toEqual(expected)
    })

    test('should return min value', () => {
      expect(tree.findMin()?.value).toBe(1)
    })

    test('should not remove anythihg on unexisting value', () => {
      const output: number[] = []
      const expected = [1, 3, 6, 7, 10, 11, 16, 22, 26]

      tree.remove(0)
      tree.inOrderTraverse((value) => output.push(value))

      expect(output).toEqual(expected)
    })
  })
})
