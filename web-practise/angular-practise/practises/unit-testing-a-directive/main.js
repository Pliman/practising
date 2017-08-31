var app = angular.module('app', []);

app.directive("ehSimple", function () {
	return function (scope, element) {
		element.addClass("plain");
	};
});
