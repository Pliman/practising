var app = angular.module('app', []);

app.directive("country", function () {
	return {
		restrict: "E",
		controller: function () {
			this.makeAnnouncement = function (message) {
				console.log("Country says: " + message);
			};
		}
	}
});

app.directive("state", function () {
	return {
		restrict: "E",
		require: "^country",
		controller: function () {
			this.makeLaw = function (law) {
				console.log("law: " + law);
			};
		},
		link: function (scope, element, attrs, countryCtrl) {
			countryCtrl.makeAnnouncement("from state.");
		}
	}
});

app.directive("city", function () {
	return {
		restrict: "E",
		require: ["^country", "^state"],
		link: function (scope, element, attrs, stateCtrl) {
			//countryCtrl.makeAnnouncement("This city rocks");
			//stateCtrl.makeLaw("Jump higher");
			stateCtrl[0].makeAnnouncement("This city rocks");
			stateCtrl[1].makeLaw("Jump higher");
		}
	}
});
