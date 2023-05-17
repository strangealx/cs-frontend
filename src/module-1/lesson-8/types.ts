export interface IBinaryTreeNode<T> {
  value: T
  parent: IBinaryTreeNode<T> | null
  left: IBinaryTreeNode<T> | null
  right: IBinaryTreeNode<T> | null
}
