var myApp = angular.module('myApp', []);
myApp.controller('listCtrl', function ($scope) {
	$scope.logchore = function (aa) {
		alert('ok');
	};
});


myApp.directive('kid', function () {
	return {
		'restrict': 'E',
		scope: {
			flavor: "&"
		},
		link: function ($scope) {
			console.log($scope.flavor);
			$scope.flavor({a:'aa'});
		}
		//template: '<div ><button ng-click="flavor()"></button></div>'

	}
});