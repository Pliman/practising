function endWith(str, pattern) {
  var strPointer = str.length;
  var pPointer = pattern.length;

  if (strPointer < pPointer) {
    return false;
  }

  while (pPointer > 0) {
    if (pattern[pPointer - 1] !== str[strPointer - 1]) {
      return false;
    }

    pPointer--;
    strPointer--;
  }

  return true;
}

console.log(endWith('isdonf asdipnf ioadsnf iodsn fo', 'iodsn fo'));
console.log(endWith('isdonf asdipnf ioadsnf iodsn fo', 'aodsn fo'));
