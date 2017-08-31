// 使用deffered调用cb  -- 失败 无法控制顺序
var deffered = Q.defer();
deffered.promise
	.then(getCityCb)
	.then(getProvinceCb())
	.then(getCountryCb());

deffered.resolve();

//getProvinceCbEnter api.js:10
//getCountryCbEnter api.js:18
//getCityCbEnter api.js:2
//getCountryCb China api.js:20
//getProvinceCb Sichuan api.js:12
//getCityCb Chengdu