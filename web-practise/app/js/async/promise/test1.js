//常规回调api测试 -- 成功，但是有嵌套
getCityCb('Chengdu', function (err, city) {
	getProvinceCb(city, function (err, province) {
		getCountryCb(province, function (err, country) {
			console.log(country);
		});
	});
});

//getCityCbEnter api.js:2
//getCityCb Chengdu api.js:4
//getProvinceCbEnter api.js:10
//getProvinceCb Sichuan api.js:12
//getCountryCbEnter api.js:18
//getCountryCb China api.js:20
//China