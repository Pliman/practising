var app = angular.module('app', []);

app.factory("game", function () {
	return {
		title: "StarCraft"
	}
});

//angular.injector(["app"]).invoke(function (game) {
//	console.log(game.title);
//});

app.controller("AppCtrl", function ($scope, game, $injector) {
	$injector.invoke(function (game) {
		console.log(game.title);
	});

	$scope.title = game.title;
});
