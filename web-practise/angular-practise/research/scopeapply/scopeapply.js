var app = angular.module('app', []);

app.controller('MyCtrl', function ($scope) {
	$scope.change = function () {
		$scope.aa = 'AA';

		window.setTimeout(function () {
			$scope.aa = 'BB';
			console.log($scope.aa);
			$scope.$apply();
		}, 1000);
	};
});
