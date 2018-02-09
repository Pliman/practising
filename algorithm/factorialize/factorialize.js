function factorialize (n) {
  var i = 1;
  var rtn = 0;

  while (i <= n) {
    if (i == 1) {
      rtn = 1;
    } else {
      rtn = rtn * i;
    }

    i++;
  }

  console.log(rtn);
}

factorialize(3);
factorialize(5);
factorialize(6);
