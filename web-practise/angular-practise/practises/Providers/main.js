var app = angular.module('app', []);

//app.factory("game", function () {
//	return {
//		title: "StarCraft"
//	}
//});

//app.config(function ($provide) {
//	$provide.provider("game", function () {
//		return {
//			$get: function () {
//				return {
//					title: "StarCraft"
//				}
//			}
//		}
//	});
//});

app.provider("game", function () {
	return {
		setType: function (value) {
			type = value;
		},

		$get: function () {
			return {
				title: type + "Craft"
			}
		}
	}
});

app.config(function (gameProvider) {
	gameProvider.setType("Puzzle");
});

app.controller("AppCtrl", function ($scope, game) {
	$scope.title = game.title;
});
