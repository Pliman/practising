// run with babel-node
function de(param) {
  return (target, key, descriptor) => {
    if (descriptor && descriptor.value) {
      console.log('-------------------');
      descriptor.value();
    }
  }
}

class A {
  classVar = 'var';

  @de('a')
  static aa() {
    console.log('aaa');
  }

  @de('b')
  async bb() {
    var b = 'bbb';
    await new Promise((resolve, reject) => {
      setTimeout(resolve, 3000);
    });
    console.log(b);
  }
}
