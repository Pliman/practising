var a = new String('xletian');
var b = {};
console.log(a instanceof Object);//true

b = a;
console.log(a);//[String: 'xletian']
console.log(b);//[String: 'xletian']

console.log(typeof a); //object
console.log(a.constructor === String); //true
