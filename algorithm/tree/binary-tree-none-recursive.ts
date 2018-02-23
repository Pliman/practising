class TreeNode {
  val: number
  left: TreeNode
  right: TreeNode

  constructor (v) {
    this.val = v
  }
}

function prevOrder(root: TreeNode){
  let curr: TreeNode
  let s : TreeNode[] = []
  curr = root

  while(curr || s.length != 0){ //前面有路或者还有退路
    //往左走到头
    while(curr){
      console.log(curr.val)
      s.push(curr)
      curr = curr.left
    }

    //前面没路了，退回来并试着往右
    if(s.length != 0){
      curr = s[s.length - 1]
      s.pop()
      curr = curr.right
    }
  }
}

/*
 *   这个程序改编自多叉树的后序遍历方法。
 */
function postOrder(root: TreeNode){
  let curr: TreeNode
  let s : TreeNode[] = []

  let lastPopedNode: TreeNode = null
  s.push(root)

  while(s.length != 0){
    curr = s[s.length - 1]
    // console.log(curr)

    let lastChild: TreeNode = null
    if(curr.left) lastChild = curr.left
    if(curr.right) lastChild = curr.right

    if(lastChild && lastPopedNode != lastChild){
      if(curr.right) s.push(curr.right)
      if(curr.left) s.push(curr.left)
    }else{
      console.log(curr.val)
      s.pop()
      lastPopedNode = curr
    }
  }
}

//该函数用于建立二叉树
function constructTree(A: number[], l: number , r: number): TreeNode{
  if(l>r) return null
  let mid: number = Math.floor((l+r)/2)
  let root: TreeNode = new TreeNode(A[mid])

  root.left  = constructTree(A, l, mid-1)
  root.right = constructTree(A, mid+1, r)

  return root
}

function main(){
  let A: number[] = [1,2,3,4,5,6,7,8,9]
  let n: number = A.length
  let root: TreeNode = constructTree(A, 0, n-1)
  // console.log(root)
  prevOrder(root)
  // postOrder(root)
  return 0
}

main()
