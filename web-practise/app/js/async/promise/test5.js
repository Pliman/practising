// async回调常规api测试 -- 正常，实现了嵌套展开 nice
async.waterfall([
	function (cb) {
		getCityCb('Chengdu', cb); // cb (err, city{, cb});
	},
	getProvinceCb,
	getCountryCb],
	function (err, result) {
		console.log(err);
		console.log(result);
	});

//getCityCbEnter api.js:2
//getCityCb Chengdu api.js:4
//getProvinceCbEnter api.js:10
//getProvinceCb Sichuan api.js:12
//getCountryCbEnter api.js:18
//getCountryCb China api.js:20
//null test4.js:13
//China