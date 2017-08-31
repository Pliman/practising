var app = angular.module('phoneApp', []);

app.controller("AppCtrl", function ($scope) {
	this.sayHi = function () {
		console.log("Hi!!");
	}

	return $scope.AppCtrl = this;
});
