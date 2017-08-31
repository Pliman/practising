var app = angular.module('app', []);

app.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: "app.html",
			controller: "AppCtrl"
		})
		.when("/pizza/:crust/:toppings", {
			redirectTo: function (routeParams, path, search) {
				console.log(routeParams);
				console.log(path);
				console.log(search);
				return "/" + routeParams.crust
			}
		})
		.when('/:deep', {
			template: 'deep dish'
		})
		.otherwise({
			redirectTo: "/"
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
