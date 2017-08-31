var myApp = angular.module('twitterApp', []);

myApp.controller("AppCtrl", function ($scope) {
	$scope.loadMoreTweets = function () {
		console.log("Loding tweets");
	}
});

myApp.directive("enter", function () {
	return function (scope, element, attrs) {
		element.bind("mouseenter", function () {
			//scope[attrs.enter]();
			//scope.$apply("loadMoreTweets()");
			scope.$apply(attrs.enter);
		});
	}
});
