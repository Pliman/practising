var myApp = angular.module('myApp', []);

myApp.factory('Data', function () {
	return {message: "I'm a data service"};
});

function firstCtrl($scope, Data) {
	$scope.data = Data;
}
function secondCtrl($scope, Data) {
	$scope.data = Data;

	$scope.reversedMsg = function (msg) {
		return msg.split("").reverse().join("");
	};
}
