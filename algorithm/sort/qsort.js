function quick_sort(list, start, end) {
  if (start < end) {
    var pivotpos = partition(list, start, end); //排序并找出下一次快排的基数 - 其实是找第一个pos的索引，以便将数组拆分为索引前数组和索引后数组
    quick_sort(list, start, pivotpos - 1); //将左边的快排一次
    quick_sort(list, pivotpos + 1, end); //将右边的快排一次
  }
}

//将一个序列调整成以基数为分割的两个区域，一边全都不小于基数，一边全都不大于基数
function partition(list, start, end) {
  var pivotpos = start;
  var pivot = list[start];
  var tmp;
  // 如果list[i]小，将pos(表示发现大于等于pivot的数，被交换到后面的个数)增加1，当小于的都被交换到前面去了，当前的pos就是pivot应该在的index
  for (var i = start + 1; i <= end; i++) {
    if (list[i] < pivot) {
      tmp = list[i];
      pivotpos += 1;
      list[i] = list[pivotpos];
      list[pivotpos] = tmp;
    }
  }

  // 将pivot放在该放的index，通过和最后一个已知小于数交换
  tmp = list[start];
  list[start] = list[pivotpos];
  list[pivotpos] = tmp;
  return pivotpos;
}


// var list = [8, 2, 4, 65, 2, 4, 7, 1, 9, 0, 2, 34, 12];
var list = [6, 2, 7, 1, 8, 9, 5, 3, 4];
quick_sort(list, 0, list.length - 1)
console.log(list)
