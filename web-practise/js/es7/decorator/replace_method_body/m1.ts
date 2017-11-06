function m(target, key, descriptor) {
    console.log('------mmmmmmmm')
    // descriptor.value = () => {}
}

class P {
  @m
  public foo(){
      console.log('------foo')
  }
}

console.log(1);
var p = new P();
console.log(2);
p.foo();
console.log(3);
