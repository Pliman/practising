var app = angular.module('app', []);

app.controller("AppCtrl", function ($scope) {
	// 别名使用时:app.random，就要用this来声明
	this.random = Math.random();
});

app.directive("app", function () {
	return {
		// 将controller作为class，这样在dom中就不用写ng-controller
		restrict: "C",
		// 这里世界写"AppCtrl" 也是可以的
		// 如果前端用的是app.random，就必须写app了
		controller: "AppCtrl as app"
	};
});

angular.bootstrap(document.getElementById("container"), ["app"]);