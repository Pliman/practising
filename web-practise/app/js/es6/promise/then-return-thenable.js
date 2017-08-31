var p1 = new Promise(function (res, rej) {
	res('1');
});

p1.then(function (val) {
	return {
		then: function (resolvePromise, rejectPromise) {
			console.log(resolvePromise);
			console.log(rejectPromise);
			resolvePromise(1);
		}
	}
}).then(function (a) {
	console.log(a);
});

// resolvePromise其实就是resolve rejectPromise=reject
var p2 = new Promise(function (res, rej) {
	res('1');
});

p2.then(function (val) {
	return new Promise(function (res, rej) {
		res('3');
	});
}).then(function (b) {
	console.log(b);
});