var app = angular.module('choreApp', []);

app.controller("ChoreCtrl", function ($scope) {
	$scope.logChore = function (chore) {
		console.log(chore + " is done!");
	};
});

app.directive("kid", function () {
	return {
		restrict: "E",
		scope: { // limit scope from root
			done: "&" // 连接起ng-click和logChore?
		},
		template: '<input type="text" ng-model="chore"> {{chore}} ' +
			'<div class="button" ng-click="done({chore:chore})">done!</div>'
	}
});
