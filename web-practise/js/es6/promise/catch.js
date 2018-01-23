var p1 = new Promise(function (res, rej) {
	// rej(1); --可以
    throw 123; // 也可以
});

p1.catch(function (v) {
	console.log(v);
});
