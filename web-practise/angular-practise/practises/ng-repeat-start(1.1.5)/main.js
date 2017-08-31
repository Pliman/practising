// prepare angular code for minification
// 是一个命令行工具

var app = angular.module('app', []);

app.service("Store" , '$window', function () {
	this.products = [{item: "apple"}];
});

//app.controller("AppCtrl", ["$scope", "Store", function ($scope, Store) {
//	$scope.products = Store.products;
//	this.products = Store.products;
//}]);
function AppCtrl ($scope, Store) {
	$scope.products = Store.products;
	this.products = Store.products;
}