'use strict';

var module = angular.module('promise', []);

module.controller('PromiseCtrl', ['$q', function ($q) {
	console.log('start test');

	function asyn () {
		var a = 1;

		var deferred = $q.defer();

		deferred.reject();
		deferred.resolve();

		return deferred.promise;
	}

	asyn();
	asyn().then(function () {
		console.log('done');
	},function () {
		console.log('err');
	});
	console.log('end of test');
}]);