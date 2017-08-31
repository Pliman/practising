var app = angular.module('app', []);

app.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: "app.html",
			controller: "ViewCtrl"
		}).when('/new', {
			templateUrl: "new.html",
			controller: "NewCtrl",
			resolve: {
				loadData: viewCtrl.loadData
			}
		});
});

app.controller("AppCtrl", function ($scope, $rootScope, $route, $location) {
	$rootScope.$on("$routeChangeStart", function (event, current, previous, rejection) {
		console.log($scope, $rootScope, $route, $location);
	});
	$rootScope.$on("$routeChangeSuccess", function (event, current, previous, rejection) {
		console.log($scope, $rootScope, $route, $location);
	});
});

var viewCtrl = app.controller("ViewCtrl", function ($scope, $route, $location) {
	$scope.changeRoute = function () {
		console.log($scope);
		$location.path("/new");
	};
});

app.controller("NewCtrl", function ($scope, loadData, $template) {
	console.log($scope, loadData, $template);
});

viewCtrl.loadData = function ($q, $timeout) {
	var defer = $q.defer();

	$timeout(function () {
		defer.resolve("Your network is done");
	}, 2000);

	return defer.promise;
};
