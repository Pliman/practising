var app = angular.module('app', []);

app.controller('MyCtrl', function ($scope) {
	console.log($scope);
	$scope.users = [
		{
			name: 'a',
			age: 12
		},
		{
			name: 'b',
			age: 11
		}
	];
});

app.directive('aa', function () {
	return {
		link: function (scope, element, attrs) {
			console.log(scope);
			console.log(scope.user);
		}
	}
});
