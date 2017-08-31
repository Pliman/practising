// node

var p1 = new Promise(function(resolve, reject){
	setTimeout(function () {
		console.log('resolve p1');
		resolve('p1');
	});
});

var p2 = new Promise(function(resolve, reject){
	// ...
	console.log('resolve p2');
	resolve(p1);
});

p2.then(function (a) {
	console.log(a);
	console.log('done!');
});