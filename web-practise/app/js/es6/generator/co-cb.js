function co(generator) {
	return function(fn) {
		var gen = generator();
		function next(err, result) {
			if(err){
				return fn(err);
			}
			var step = gen.next(result);
			if (!step.done) {
				step.value(next); // step.value = function (cb) {} next as cb
			} else {
				fn(null, step.value);
			}
		}
		next();
	}
}

//var co = require('./co');
// wrap the function to thunk
function readFile(filename) {
	return function(callback) {
		require('fs').readFile(filename, 'utf8', callback);
	};
}

co(function * () {
	var file1 = yield readFile('./a.txt');
	var file2 = yield readFile('./b.txt');

	console.log(file1);
	console.log(file2);
	return 'done';
})(function(err, result) {
	console.log('finalCb: ' + result)
});
