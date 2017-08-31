var app = angular.module('app', []);

app.controller('MyCtrl', function ($scope) {
	$scope.hellos = '1111';
});

app.directive('aa', function () {
	return {
		template: '<div bb></div>',
		link: function (scope) {
			console.log(scope);
		}
	}
});

app.directive('bb', function () {
	return {
		link: function (scope) {
			console.log(scope);
		}
	}
});