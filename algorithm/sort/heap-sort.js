let array = [24,1,6,45,23,11,2,34,8,54,14];

let nodeHeapSort = (i, arrayLength) => {
  //对节点i进行小顶堆排序
  let leftChild = i * 2 + 1;
  let rightChild = i * 2 + 2;
  let change;
  if (leftChild < arrayLength && array[leftChild] < array[i]) {
    change = array[leftChild];
    array[leftChild] = array[i];
    array[i] = change;
  }
  if (rightChild < arrayLength && array[rightChild] < array[i]) {
    change = array[rightChild];
    array[rightChild] = array[i];
    array[i] = change;
  }
}

let HeapSort = (length) => {
  //对所有的非叶子节点进行排序
  for (let i = length; i >= 0; i--) {
    nodeHeapSort(i, length * 2 + 1);
  }
}

//提取元素
for (let j = array.length; j > 0; j--) {
  HeapSort(Math.floor((j - 1) / 2));
  let change = array[0];
  array[0] = array[j - 1];
  array[j - 1] = change;
}

console.log([...array]);
