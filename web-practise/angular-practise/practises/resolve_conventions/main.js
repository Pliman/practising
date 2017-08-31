var app = angular.module('app', []);

app.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: "app.html",
			controller: "AppCtrl",
			resolve: {
				loadData: appCtrl.loadData,
				preData: appCtrl.preData
			}
		});
});

var appCtrl = app.controller("AppCtrl", function ($scope, $route) {
	console.log($route);
	$scope.model = {
		message: "I'm a great app!!!"
	};
});

appCtrl.loadData = function ($q, $timeout) {
	var defer = $q.defer();

	$timeout(function () {
		defer.resolve("loadData");
	}, 2000);

	return defer.promise;
};

appCtrl.preData = function ($q, $timeout) {
	var defer = $q.defer();

	$timeout(function () {
		defer.resolve("preData");
	}, 2000);

	return defer.promise;
};