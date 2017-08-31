var app = angular.module('app', []);

app.controller('AppCtrl', ['$scope', function ($scope) {
	$scope.$watch('aa', function (n, o) {
    console.log(n);
    console.log(n == ' ');
    n && console.log(n.length);
  });
}]);