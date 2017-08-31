function *gen() {
	var a = yield 1;
	console.log(a + '1111'); // 要等第二个next才执行
	yield a+2;
}

var g = gen();
// g.next(2); -- 这是不对的，因为这是第一个yield，2是赋给上一个yield的返回值
g.next();
console.log(g.next(2).value); // 让yield 1的返回值为2


// -----------------------------


//function *f() {
//	for(var i = 0; true; i++) {
//		var reset = yield i;
//		if(reset) { i = -1; }
//	}
//}
//
//var g = f();
//
//console.log(g.next().value); // { value: 0, done: false }
//console.log(g.next().value); // { value: 1, done: false }
//console.log(g.next(true).value);// { value: 0, done: false }