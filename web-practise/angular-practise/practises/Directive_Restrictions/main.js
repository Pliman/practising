var myApp = angular.module('superhero', []);

myApp.directive("superman", function () {
	return {
		restrict: "A",
		link: function () {
			alert("I'm here to save the day.");
		}
	}
});

myApp.directive("cSuperman", function () {
	return {
		restrict: "C",
		link: function () {
			alert("cSuperman here to save the day.");
		}
	}
});

myApp.directive("mSuperman", function () {
	return {
		restrict: "M",
		link: function () {
			alert("mSuperman here to save the day.");
		}
	}
});