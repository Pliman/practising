var app = angular.module('phoneApp', []);

app.controller("AppCtrl", function ($scope) {
});

app.directive("panel", function () {
	return {
		restrict: "E",
		transclude: true, // 显示出内部元素
		template: '<div class="panel" ng-transclude>This is a panel component</div>'
	}
});
