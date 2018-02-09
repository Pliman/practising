var arr = [1,2,3,4,5,6,7,8,9,10,13,24,35,46,47,78,123];

function binarySearch (arr, target) {
  var indexes = arr.length - 1;

  if (indexes === 0) {
    return target === arr[0] ? arr[0] : -1;
  }

  var point = Math.floor(indexes / 2);

  if (target > arr[point]) {
    return point + 1 + binarySearch(arr.slice(point + 1));
  } else if (target < arr[point]) {
    return binarySearch(arr.slice(0, point - 1));
  } else {
    return point;
  }

  return "shouldn't reach here";
}

console.log(binarySearch(arr, 46));
