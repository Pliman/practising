function *gen() {
	try {
		yield 1;
	} catch (e) {
		console.log('捕获了: ' + e);
	}
}

var g = gen();
g.next();
g.throw('aa');

// ------------------------

//var g = function* () {
//	while (true) {
//		try {
//			yield;
//		} catch (e) {
//			if (e != 'a') throw e;
//			console.log('内部捕获', e);
//		}
//	}
//};
//
//var i = g();
//i.next();
//
//try {
//	i.throw('a');
//	i.throw('b');
//} catch (e) {
//	console.log('外部捕获', e);
//}