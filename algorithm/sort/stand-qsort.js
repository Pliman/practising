function quick_sort2(arr) {
  var _arr = arr.slice();//复制一份，以免影响之前的arr
  return quick_sort(_arr, 0, _arr.length - 1);//进行排序
}

function quick_sort(arr, i, j) {
  if ((j - i) < 1) {//如果数组长度小于1，不用排序
    return arr;
  }

  var left = i;
  var right = j;
  var base = left;
  var center = arr[left];

  while (left < right) {
    //从右向左扫描是否存在比基数小的数字
    while (left < right && arr[right] >= center) {
      right--;
    }
    if (left < right) {
      //将小于基数的数字放置到左侧
      arr[left] = arr[right];
      left++;
    }
    //从左向右扫描是否存在比基数大的数字
    while (left < right && arr[left] < center) {
      left++;
    }
    if (left < right) {
      //将大于基数的数字放置到右侧
      arr[right] = arr[left];
      right--;
    }
  }
  //更新基数
  base = left; //base = right; 一样
  arr[base] = center;
  quick_sort(arr, i, base - 1);//递归对左侧进行排序
  quick_sort(arr, (base + 1), j);//递归对右侧进行排序
  return arr;
}

let list = [6, 2, 7, 1, 8, 9, 5, 3, 4];
quick_sort(list, 0, list.length - 1)
console.log(list)
