var app = angular.module('app', []);

app.directive("zippy", function () {
	return {
		restrict: "E",
		transclude: true,
		scope: {
			title: "@"
		},
		template: '<div><h3 ng-click="toggleContent()' +
			'">{{title}}</h3><div ng-show="isContentVisible"' +
			' ng-transclude>world</div></div>',
		link: function (scope) {
			scope.isContentVisible = true;

			scope.toggleContent = function () {
				scope.isContentVisible = !scope.isContentVisible;
			}
		}
	}
});