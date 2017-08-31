// api - 业务
function getFoo () {
	return new Promise(function (resolve, reject){
		setTimeout(function () {
      resolve('foo');
    }, 1000);
	});
}

// api 调用 - 业务 - 主体
var g = function* () {
	try {
		var foo = yield getFoo();
		console.log(foo);
	} catch (e) {
		console.log(e);
	}
};

// 调用执行 -- 公共组件
function run (generator) {
	var it = generator();

	function go(result) {
		if (result.done) return result.value;

		return result.value.then(function (value) {
			return go(it.next(value));
		}, function (error) {
			return go(it.throw(value));
		});
	}

	go(it.next());
}

run(g);
