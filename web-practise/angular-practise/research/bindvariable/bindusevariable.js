var app = angular.module('app', []);

app.controller('AppCtrl', ['$scope', function ($scope) {
	$scope.aa1 = 'aa1';
	$scope.v = 1;
	$scope.a1 = {value: 'a11'};
}]);