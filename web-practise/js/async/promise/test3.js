// promise回调deferred api测试 -- 成功，但是有嵌套
getCity().then(function (city) {
	getProvince(city).then(function (province) {
		getCountry(province).then(function (country) {
			console.log(country);
		});
	});
});

//getCityEnter api.js:26
//getCity Chengdu api.js:30
//getProvinceEnter api.js:38
//getProvince Sichuan api.js:42
//getCountryEnter api.js:50
//getCountry China api.js:54
//China