var app = angular.module('phoneApp', []);

app.controller("AppCtrl", function ($scope) {
	$scope.leaveVoicemail = function (number, message) {
		console.log("Number: " + number + "Message: " + message);
		console.log($scope.network);
	};
});

app.directive("phone", function () {
	return {
		restrict: "E",
		scope: {
			number: "@",
			network: "=", // binding with parent
			makeCall: "&"
		},
		template: '<div class="panel">Number: {{number}} Network: <select ng-model="network"><option>Verizon</option><option>AT&T</option><option>Sprint</option></select></div>' +
			'<input type="text" ng-model="value">' +
			'<div class="button" ng-click="makeCall({number:number, message:value})">Call!</div>',

		link: function (scope) {
			scope.networks = ["Verizon", "AT&T", "Sprint"];
			scope.network = scope.networks[0];
		}
	}
});
