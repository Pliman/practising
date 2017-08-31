var app = angular.module('app', []);

app.controller('MyCtrl', function ($scope) {
	$scope.hellos = '1111';
});

app.directive('aa', function () {
	return {
		template: '<div bb></div>',
//		transclude: true,
		link: function (scope) {
			console.log(scope);
		}
	}
});
