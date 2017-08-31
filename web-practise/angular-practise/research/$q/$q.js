'use strict';

var module = angular.module('promise', []);

module.controller('PromiseCtrl', ['$q', function ($q) {
	console.log('start test');

	function asyn () {
		var a = 1;

		var deferred = $q.defer();

		deferred.resolve({
			then: function () {
				console.log('done');
			}
		});

		return deferred.promise;
	}

	asyn();
	//asyn().then(function () {
	//	console.log('done');
	//});
	console.log('end of test');
}]);