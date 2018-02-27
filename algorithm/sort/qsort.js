function quick_sort(list, start, end) {
  if (start < end) {
    var pivotpos = partition(list, start, end); //找出快排的基数
    quick_sort(list, start, pivotpos - 1); //将左边的快排一次
    quick_sort(list, pivotpos + 1, end); //将右边的快排一次
  }
}

//将一个序列调整成以基数为分割的两个区域，一边全都不小于基数，一边全都不大于基数
function partition(list, start, end) {
  var pivotpos = start;
  var pivot = list[start];
  var tmp;
  for (var i = start + 1; i <= end; i++) {
    if (list[i] < pivot) {
      tmp = list[i];
      pivotpos += 1;
      list[i] = list[pivotpos];
      list[pivotpos] = tmp;
    }
  }

  tmp = list[start];
  list[start] = list[pivotpos];
  list[pivotpos] = tmp;
  return pivotpos;
}


// var list = [8, 2, 4, 65, 2, 4, 7, 1, 9, 0, 2, 34, 12];
var list = [6, 2, 7, 1, 8, 9, 5];
quick_sort(list, 0, list.length)
console.log(list)
