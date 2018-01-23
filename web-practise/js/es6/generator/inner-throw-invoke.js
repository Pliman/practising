function aa () {
    throw 'unexpected exception'
}

function *gen() {
	try {
		var a = yield aa();
		console.log(a)
	} catch (e) {
		console.log('捕获了: ' + e);
	}
}

var g = gen();
g.next();
