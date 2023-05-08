import { IBinaryTreeNode } from './types'

class BinaryTreeNode<T> implements IBinaryTreeNode<T> {
  value: T
  parent: IBinaryTreeNode<T> | null
  left: IBinaryTreeNode<T> | null
  right: IBinaryTreeNode<T> | null

  constructor(value: T, { parent = null, left = null, right = null }: Partial<Omit<IBinaryTreeNode<T>, 'value'>> = {}) {
    this.value = value
    this.parent = parent
    this.left = left
    this.right = right
  }
}

export class BinaryTree<T> {
  #root: IBinaryTreeNode<T>

  constructor(value: T) {
    this.#root = new BinaryTreeNode(value)
  }

  #add(node: IBinaryTreeNode<T>, addedNode: IBinaryTreeNode<T>) {
    const key = addedNode.value < node.value ? 'left' : 'right'

    if (node[key] === null) {
      addedNode.parent = node
      node[key] = addedNode
    } else {
      this.#add(node[key]!, addedNode)
    }
  }

  add(value: T) {
    if (this.find(value) !== null) {
      throw new Error(`Can't handle doubles right now: "${value}"`)
    }

    const node = new BinaryTreeNode(value)

    this.#add(this.#root, node)
  }

  inOrderTraverse(cb: (value: T) => T, node: IBinaryTreeNode<T> | null = this.#root) {
    if (node !== null) {
      this.inOrderTraverse(cb, node.left)
      cb(node.value)
      this.inOrderTraverse(cb, node.right)
    }
  }

  preOrderTraverse(cb: (value: T) => T, node: IBinaryTreeNode<T> | null = this.#root) {
    if (node !== null) {
      cb(node.value)
      this.preOrderTraverse(cb, node.left)
      this.preOrderTraverse(cb, node.right)
    }
  }

  postOrderTraverse(cb: (value: T) => T, node: IBinaryTreeNode<T> | null = this.#root) {
    if (node !== null) {
      this.postOrderTraverse(cb, node.left)
      this.postOrderTraverse(cb, node.right)
      cb(node.value)
    }
  }

  breadthFirstTraverse(cb: (value: T) => T, node: IBinaryTreeNode<T> = this.#root) {
    const queue = [node]

    while (queue.length) {
      const { value, left, right } = queue.shift()!

      cb(value)

      if (left !== null) {
        queue.push(left)
      }

      if (right !== null) {
        queue.push(right)
      }
    }
  }

  find(value: T, node: IBinaryTreeNode<T> | null = this.#root): IBinaryTreeNode<T> | null {
    if (node === null) {
      return null
    }

    if (value > node.value) {
      return this.find(value, node.right)
    }

    if (value < node.value) {
      return this.find(value, node.left)
    }

    return node
  }

  findMin(node: IBinaryTreeNode<T> = this.#root): IBinaryTreeNode<T> {
    if (node.left === null) {
      return node
    }

    return this.findMin(node.left)
  }

  remove(value: T, node: IBinaryTreeNode<T> | null = this.#root) {
    const found = this.find(value, node)

    if (found === null) {
      return
    }

    if (found.left && found.right) {
      const replacer = this.findMin(found.right)
      const nextValue = replacer.value

      found.value = nextValue
      this.remove(nextValue, found.right)

      return
    } else {
      const replacer = found.left || found.right

      if (found.parent?.left === found) {
        found.parent.left = replacer
      } else {
        found.parent!.right = replacer
      }
    }
  }
}
