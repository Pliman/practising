var app = angular.module('app', []);

app.controller('MyCtrl', ['$scope', function ($scope) {
	$scope.save = function () {
		console.log('save');
	};

	console.log($scope);
	console.log(11);

	this.ok = function () {
		console.log('OK');
	};
}]);

// 当controller被引用后，又执行了一次
app.directive('alert', [function () {
	return {
		restrict: "A",
		scope: {},
		controller: 'MyCtrl',
		templateUrl: 'alertTemplate.html',
		transclude: true,
		link: function (scope, element, attrs, ctrl) {
			console.log(ctrl);
			console.log(scope);
		}
	}
}]);