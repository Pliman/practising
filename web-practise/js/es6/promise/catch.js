var p1 = new Promise(function (res, rej) {
	rej(1);
});

p1.catch(function (v) {
	console.log(v);
});