var app = angular.module('app', []);

app.controller('AppCtrl', ['$scope', function ($scope) {
	$scope.aa = function () {
		console.log('changed');
	};

	$scope.aa1 = function () {
		console.log('changed111');
	};
}]);
