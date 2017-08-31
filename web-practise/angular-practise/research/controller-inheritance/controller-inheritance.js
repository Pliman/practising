var app = angular.module('app', []);

app.controller('ParentCtrl', function($scope) {
	$scope.do = function () {
		console.log('dd');
	};
});

app.controller('ChildCtrl', function($scope, $controller) {
	var ctrl = $controller('ParentCtrl', {$scope: $scope});
	console.log(ctrl);
	$scope.do();
});