var arr = [1,2,3,4,5,6,7,8,9,10,13,24,35,46,47,78,123]; // 17个

function binarySearch (arr, target) {
  var indexes = arr.length - 1;

  if (indexes === 0) {
    return target === arr[0] ? 0 : -1;
  }

  var point = Math.floor(indexes / 2);

  if (target > arr[point]) {
    return point + 1 + binarySearch(arr.slice(point + 1), target);
  } else if (target < arr[point]) {
    return binarySearch(arr.slice(0, point), target);
  } else {
    return point;
  }

  return "shouldn't reach here";
}

console.log(binarySearch(arr, 123));
