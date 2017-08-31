function getA () {
  return new Promise(function (resolve, reject) {
    resolve(1,2);
  });
}

getA().then(function (a, b) {
  console.log(a);
  console.log(b);
});
