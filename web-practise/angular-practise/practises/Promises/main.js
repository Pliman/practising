var app = angular.module('app', []);

app.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: "app.html",
			controller: "AppCtrl"
		});
});

app.controller("AppCtrl", function ($scope, $q) {
	var defer = $q.defer();

	defer.promise
		.then(function (weapon) {
			console.log("I promised I would show up! " + weapon);

			return "bow";
		})
		.then(function (weapon) {
			console.log("me too! " + weapon);

			return "axe";
		})
		.then(function (weapon) {
			console.log("and I! " + weapon);
		});

	defer.resolve("sword");

	$scope.model = {
		message: "This is my app!!!"
	};
});
