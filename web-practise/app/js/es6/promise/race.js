var p1 = new Promise(function (res, rej) {
	res(1);
});

var p2 = new Promise(function (res, rej) {
	res(2);
});

var p3 = Promise.race([p1, p2]);

p3.then(function (v) {
	console.log(v);
});