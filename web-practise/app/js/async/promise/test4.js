// promise回调deferred api测试 -- 成功，实现了链式书写 nice 但是api定义麻烦了点
getCity()
	.then(function (city) {
		return getProvince(city);
	}).then(function (province) {
		return getCountry(province);
	}).then(function (country) {
		console.log(country);
	}).then(function () {
		console.log('return aa');
		return "aa";
	}).then(function (name) {
		console.log("name = " + name);
	});

//getCityEnter api.js:26
//getCity Chengdu api.js:30
//getProvinceEnter api.js:38
//getProvince Sichuan api.js:42
//getCountryEnter api.js:50
//getCountry China api.js:54
//China