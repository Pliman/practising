class Node {
  constructor (val) {
    this.value = val
  }
}

function createNode(arr, index) {
  let node = new Node(arr[index])

  index++
  if (arr[index]) {
    node.left = createNode(arr, index)
  }

  index++
  if (arr[index]) {
    node.right = createNode(arr, index)
  }

  return node
}

let arr = [6, 2, 7, 1, 8, 9, 5, 3, 4];
let root = createNode(arr, 0)
console.log(root)
debugger
