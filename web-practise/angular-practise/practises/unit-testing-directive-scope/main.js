var app = angular.module('app', []);

app.directive("ehSimple", function () {
	return {
		link: function (scope, element) {
			element.addClass("plain");

			element.bind("click", function () {
				scope.clicked = true;
			});
		}
	}
});
