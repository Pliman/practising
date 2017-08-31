var app = angular.module('app', ['service']);

app.controller('AppCtrl', ["$rootScope", "$scope", "service", function ($rootScope, $scope, service) {
	$scope.count = 0;

	$rootScope.$on('countChange', function (e, data) {
		data && ($scope.count += data);
		console.log(data);
	});

	service.changeCount(function (err, msg) {
		console.log(err ? ('Error: ' + err) : msg);
	});
}]);