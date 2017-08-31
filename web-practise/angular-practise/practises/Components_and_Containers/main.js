var app = angular.module('app', []);

app.directive("clock", function () {
	return {
		restrict: "E",
		scope: {
			timezone: "@"
		},
		template: '<div>12:pm {{timezone}}</div>'
	}
});

app.directive("panel", function () {
	return {
		restrict: "E",
		transclude: true,
		scope: {
			title: "@"
		},
		template: '<div style="border:3px solid #000000">' +
			'<div class="alert-box alert">{{title}}</div>' +
			'<div ng-transclude></div>' +
			'</div>'
	}
});