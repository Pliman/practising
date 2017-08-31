var app = angular.module('app', []);

app.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {
//  var get = $http.get('http://www.baidu.com').success(function () {console.log('aaa')});
	var get = $http.get('http://localhost:63343/angularPractise/angular-practise/research/angular-stop-ajax-req/angular-stop-ajax-req.js').success(function () {
		console.log('aaa')
	});
}]);
