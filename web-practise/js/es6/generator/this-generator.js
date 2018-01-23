function* F() {
    this.a = 1;
    yield this.b = 2;
    yield this.c = 3;
}
var obj = {};
// var f = F.call(obj);
//
// f.next();  // Object {value: 2, done: false}
// f.next();  // Object {value: 3, done: false}
// f.next();  // Object {value: undefined, done: true}
//
// console.log(obj.a) // 1
// console.log(obj.b) // 2
// console.log(obj.c) // 3

var f = F.apply(obj); // 同理

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

console.log(obj.a) // 1
console.log(obj.b) // 2
console.log(obj.c) // 3
