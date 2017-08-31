var app = angular.module('app', []);

// 好像新版本里面没有了
//app.config(function ($logProvider) {
//	$logProvider.debugEnabled(false);
//});

app.run(function ($rootScope, $log) {
	$rootScope.$log = $log;
});

app.controller("foo", function ($scope) {
	$scope.myFunc = function (ev) {
		console.log(ev);
	}
});