var app = angular.module('app', []);

app.controller('AppCtrl', ['$scope', function ($scope) {
	$scope.a = 'a';
}]);

app.directive('parent', [function () {
	return {
		restrict: 'E',
		scope: true,
		template: '11111<child></child>',
		link: function (pscope, elements, attrs) {
			pscope.$broadcast('paa', 'paa');

			pscope.$on('caa', function (e, v) {
				console.log(v);
			});
		}
	};
}]);

app.directive('child', [function () {
	return {
		restrict: 'E',
		scope: true,
		link: function (cscope, elements, attrs) {
			cscope.$on('paa', function (e, v) {
				console.log(v);
			});

			cscope.$broadcast('caa', 'caa');
		}
	};
}]);

app.directive('other', [function () {
	return {
		restrict: 'E',
		scope: true,
		link: function (oscope, elements, attrs) {
			oscope.$on('paa', function (v) {
				console.log(v);
			});
		}
	};
}]);