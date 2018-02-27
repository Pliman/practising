class TreeNode1 {
  val: number
  left: TreeNode1
  right: TreeNode1

  constructor(v) {
    this.val = v
  }
}

//深度优先搜索
//利用栈，现将右子树压栈再将左子树压栈
function depthFirstSearch(root: TreeNode1) {
  let nodeStack: TreeNode1[] = []
  nodeStack.push(root);
  while (nodeStack.length > 0) {
    let node = nodeStack[nodeStack.length - 1]
    console.log(node.val)
    nodeStack.pop();
    if (node.right) {
      nodeStack.push(node.right);
    }
    if (node.left) {
      nodeStack.push(node.left);
    }
  }
}

//广度优先搜索
function breadthFirstSearch(root: TreeNode1) {
  let nodeQueue: TreeNode1[] = []
  nodeQueue.push(root);
  while (nodeQueue.length > 0) {
    let node = nodeQueue[0]
    console.log(node.val)
    nodeQueue.shift();
    if (node.left) {
      nodeQueue.push(node.left);
    }
    if (node.right) {
      nodeQueue.push(node.right);
    }
  }
}


//该函数用于建立二叉树
function constructTree1(A: number[], l: number, r: number): TreeNode1 {
  if (l > r) return null
  let mid: number = Math.floor((l + r) / 2)
  let root: TreeNode1 = new TreeNode1(A[mid])

  root.left = constructTree1(A, l, mid - 1)
  root.right = constructTree1(A, mid + 1, r)

  return root
}

let A: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let n: number = A.length
let root: TreeNode1 = constructTree1(A, 0, n - 1)
// console.log(root)
breadthFirstSearch(root)
