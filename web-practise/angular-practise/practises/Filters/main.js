var myApp = angular.module('myApp', []);

myApp.factory('Data', function () {
	return {message: "I'm a data service"};
});

myApp.filter('reverse', function (Data) {
	return function (text) {
		return text.split("").reverse().join("") + Data.message;
	}
});

function firstCtrl($scope, Data) {
	$scope.data = Data;
}
function secondCtrl($scope, Data) {
	$scope.data = Data;
}
