var app = angular.module('app', []);

app.controller('AppCtrl', ['$scope', function ($scope) {
	$scope.a = 'a';
}]);

app.filter('aa', [function () {
	return function (data) {
		return !!data;
	}
}]);
