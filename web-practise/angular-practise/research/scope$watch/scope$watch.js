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
			pscope.paa = 'paa';

			pscope.$watch('caa', function (v) {
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
			cscope.$watch('paa', function (v) {
				console.log(v);
			});

			cscope.caa = 'caa';
		}
	};
}]);

app.directive('other', [function () {
	return {
		restrict: 'E',
		scope: true,
		link: function (oscope, elements, attrs) {
			oscope.$watch('paa', function (v) {
				console.log(v);
			});
		}
	};
}]);