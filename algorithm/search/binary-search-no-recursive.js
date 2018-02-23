function binarySearch(arr, key) {
  var low = 0,
    high = arr.length - 1,
    mid = Math.floor((low + high) / 2);
  while (low <= high) {
    mid = Math.floor((low + high) / 2);
    if (key == arr[mid]) {
      return mid;
    } else if (key < arr[mid]) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return -1;
}

var arr = [1,2,3,4,5,6,7,8,9,10,13,24,35,46,47,78,123]; // 17个

console.log(binarySearch(arr, 123));
