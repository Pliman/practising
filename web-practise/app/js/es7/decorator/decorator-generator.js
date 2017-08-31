// 需要使用babel-node执行

function de(a, b) {
  return (target, key, descriptor) => {
    // console.log(a);
    // console.log(b);
    // console.log(target);
    // console.log(key);
    // console.log(descriptor);
    if (descriptor && descriptor.value) {
      console.log('-------------------');
      descriptor.value().next();
    }
  }
}

@de('c', 'd')
class A {
  @de('1', '2')
  static * he111() {
    var a = 'a';
    console.log(a);
  }
}
