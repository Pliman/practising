function quick(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  var left = [];
  var right = [];
  var base = arr[0];
  for (var i = 1; i < arr.length; i++) {
    // 判决条件
    if (arr[i] > base) {
      right.push(arr[i]);
    } else {
      left.push(arr[i])
    }
  }
  return quick(left).concat(base, quick(right));
}

console.log(quick([6, 2, 7, 1, 8, 9, 5, 3, 4]));
