var app = angular.module('app', []);

app.config(function ($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: "app.html",
		controller: "AppCtrl"
	});
});

app.controller("AppCtrl", function ($scope, $route) {
	// too late，配置需要在controller之前
//	$route.routes["/"] = {
//		templateUrl: "app.html",
//		controller: "AppCtrl"
//	};

	$scope.model = {
		message: "This is my app!!!"
	};
});
