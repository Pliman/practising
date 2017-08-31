var myApp = angular.module('behaviorApp', []);

myApp.directive("enter", function () {
	return {
		link: function (scope, element) {
			element.bind("mouseenter", function () {
				console.log("got inside");
			});
		}
	}
});


myApp.directive("leave", function () {
	return {
		link: function (scope, element) {
			element.bind("mouseleave", function () {
				console.log("I'm leaving");
			});
		}
	}
});