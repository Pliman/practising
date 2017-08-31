// 将thenable转为nonefulfilled promise，将常量转为fulfilled promise

var p = Promise.resolve({
	then: function (res, rej) {
		res(123);
	}
});

p.then(function (v){
	console.log(v)
});

// 这个是同步的？
var p1 = Promise.resolve('1111');

p1.then(function (v){
	console.log(v)
});