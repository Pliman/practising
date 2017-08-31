var app = angular.module('phoneApp', []);

var phoneAppStuff = {};

phoneAppStuff.controllers = {};
phoneAppStuff.controllers.AppCtrl = function ($scope) {
	this.sayHi = function () {
		console.log("Hi!!");
	}

	return $scope.AppCtrl = this;
}

phoneAppStuff.directives = {};
phoneAppStuff.directives.panel = function () {
	return {
		restrict: "E",
		template: "<div>Hello</div>"
	}
};
//app.filter(xxxx);
app.controller(phoneAppStuff.controllers);
app.directive(phoneAppStuff.directives);