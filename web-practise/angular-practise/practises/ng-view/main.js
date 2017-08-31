var app = angular.module('app', []);

app.config(function ($routeProvider) {
	$routeProvider.when('/aa', {
		templateUrl: "app.html",
		controller: "AppCtrl"
	}).when('/bb', {
			templateUrl: "app1.html",
			controller: "AppCtrl"
		});
});

app.controller("AppCtrl", function ($scope) {
	$scope.aa = 'aa';
	$scope.model = {
		message: "This is my app!!!"
	};
});