var app = angular.module('app', []);

app.controller("MyCtrl", ["$scope", function (aaa) {
	// $scope不能使$scop 使用了DI，如果使用了数组，在前面查找，后面就可以是其他名字
	console.log(aaa);
}]);

app.directive("myDirective", function () {
	return {
		//scope: {}, // 没创建的话，就是controller中的$scope
		link: function (scope, element, attrs) { // 参数名无所谓
			//console.log(scope);
			// element [div, ready: function, toString: function, eq: function, push: function, sort: function…]
			//console.log(element);
		}
	}
});