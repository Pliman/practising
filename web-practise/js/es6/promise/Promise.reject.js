// Promise.reject不接受thenable?

var p = Promise.reject({
	then: function (res, rej) {
		rej(123);
	}
});

p.catch(function (v){
	console.log(v)
});

// 这个是同步的？
var p1 = Promise.reject('1111');

p1.catch(function (v){
	console.log(v)
});