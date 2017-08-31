var app = angular.module('drinkApp', []);

app.controller("AppCtrl", function ($scope) {
	$scope.ctrlFlavor = "blackberry";
});

app.directive("drink", function () {
	return {
		scope: {
			flavor: "@" // pass it as a string into scope
		},
		template: '<div>{{flavor}}</div>' // 作为子元素
		// 和 flavor: "@"一样
//		link: function (scope, element, attrs) {
//			scope.flavor = attrs.flavor;
//		}
	}
});

// 流程：模板获取controller中的ctrlFlavor值
// 将值作为flavor=的值传递给template: '<div>{{flavor}}</div>'
