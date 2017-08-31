function getCityCb(cityId, cb) {
	console.warn('getCityCbEnter');
	setTimeout(function () {
		console.log('getCityCb Chengdu');
		cb && cb(null, 'Chengdu');
	}, 2000);
}

function getProvinceCb(city, cb) {
	console.warn('getProvinceCbEnter');
	setTimeout(function () {
		console.log('getProvinceCb Sichuan');
		cb && cb(null, 'Sichuan');
	}, 1500);
}

function getCountryCb(province, cb) {
	console.warn('getCountryCbEnter');
	setTimeout(function () {
		console.log('getCountryCb China');
		cb && cb(null, 'China');
	}, 1000);
}

function getCity(cityId) {
	console.warn('getCityEnter');
	var deffered = Q.defer();

	setTimeout(function () {
		console.log('getCity Chengdu');
		deffered.resolve("Chengdu");
	}, 2000);

	return deffered.promise;
}

function getProvince(city) {
	console.warn('getProvinceEnter');
	var deffered = Q.defer();

	setTimeout(function () {
		console.log('getProvince Sichuan');
		deffered.resolve("Sichuan");
	}, 1500);

	return deffered.promise;
}

function getCountry(province) {
	console.warn('getCountryEnter');
	var deffered = Q.defer();

	setTimeout(function () {
		console.log('getCountry China');
		deffered.resolve("China");
	}, 1000);

	return deffered.promise;
}
