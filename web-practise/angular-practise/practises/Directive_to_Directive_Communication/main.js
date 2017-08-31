var superApp = angular.module('superApp', []);

superApp.controller("AppCtrl", function ($scope) {
	$scope.loadMoreTweets = function () {
		console.log("Loding tweets");
	}
});

superApp.directive("superhero", function () {
	return {
		restrict: "E",
		scope: {}, // separate scope for two elements, if now, will share root scope

		controller: function ($scope) {
			$scope.abilities = [];

			this.addStrength = function () {
				$scope.abilities.push("strength");
			};

			this.addSpeed = function () {
				$scope.abilities.push("speed");
			};

			this.addFlight = function () {
				$scope.abilities.push("flight");
			};
		},

		link: function (scope, element) {
			element.addClass("button");
			element.bind("mouseenter", function () {
				console.log(scope.abilities);
			});
		}
	}
});

superApp.directive("strength", function () {
	return {
		require: "superhero",
		link: function (scope, element, attrs, superheroCtrl) {
			superheroCtrl.addStrength();
		}
	}
});

superApp.directive("speed", function () {
	return {
		require: "superhero",
		link: function (scope, element, attrs, superheroCtrl) {
			superheroCtrl.addSpeed();
		}
	}
});

superApp.directive("flight", function () {
	return {
		require: "superhero",
		link: function (scope, element, attrs, superheroCtrl) {
			superheroCtrl.addFlight();
		}
	}
});