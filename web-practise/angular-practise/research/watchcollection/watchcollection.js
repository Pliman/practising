var app = angular.module('app', []);

app.controller('AppCtrl', ['$scope', function ($scope) {
	$scope.arr = [{name: 1}, {name: 1}, {name: 1}, {name: 1}, {name: 1}];

	$scope.$watchCollection('arr', function (v) {
		console.log(v);
	});

	$scope.changeArr = function () {
		console.log('change arr');
		$scope.arr = [{name: 2}, {name: 2}, {name: 2}, {name: 2}];
	};

	$scope.obj = {
		team: {
			persons: [
				{name: "tom", addr: null}
			]
		}
	};

	$scope.$watchCollection('obj', function (v) {
		console.log(v);
	});

	$scope.changeObj = function () {
		console.log('change obj');
		$scope.obj.team.persons[0].addr = [{a:'a'}];
	};
}]);
