function factorialize (n) {
    if (n == 1) {
      return 1;
    } else {
      return n * factorialize(n - 1);
    }
}

console.log(factorialize(3));
console.log(factorialize(5));
console.log(factorialize(6));
