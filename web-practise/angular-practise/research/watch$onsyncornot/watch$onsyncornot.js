var app = angular.module('app', []);

app.controller('AppCtrl', ['$scope', function ($scope) {
	$scope.a = 'a';

	$scope.changeA = function () {
		$scope.a = '123';
		$scope.$broadcast('aChange', 'xxx');
		console.log('changed');
	};

	$scope.$watch('a', function (v) {
		console.log('$watch');
	});

	$scope.$on('aChange', function (e, v) {
		console.log('$on');
	});
}]);
