setInterval(function () {
  console.log(1);
}, 1000);

function doA () {
  return new Promise(function (resolve) {

    setTimeout(function () {
      console.log("doA");
      resolve("done");
    }, 10000);
  });
}

async function exec() {
  var rtn = await doA();
  console.log(rtn);

  setInterval(function () {
    console.log(2);
  }, 1000);
}

var a = exec();
console.log(111111);
console.log(a);
