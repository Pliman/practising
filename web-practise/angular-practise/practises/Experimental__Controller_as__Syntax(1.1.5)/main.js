var app = angular.module('app', []);

app.controller("RoomCtrl", function () {
	this.openDoor = function () {
		console.log("creak");
	};

	this.buttonTitle = "I'm a button";

	this.foo = "room";
	//$scope.room = this; //1.1.5内置该功能
});

app.controller("OtherCtrl", function ($scope) {
	this.foo = "other";
});