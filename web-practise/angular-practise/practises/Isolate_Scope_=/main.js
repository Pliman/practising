var app = angular.module('drinkApp', []);

app.controller("AppCtrl", function ($scope) {
	$scope.ctrlFlavor = "blackberry";
});

app.directive("drink", function () {
	return {
		scope: {
			flavor: "=" // pass it as a object into scope // 可以双向绑定(因为是对象)
		},
		template: '<input type="text" ng-model="flavor">'
		// 和 flavor: "="一样
//		link: function (scope, element, attrs) {
//			scope.flavor = attrs.flavor;
//		}
	}
});

// 流程：模板获取controller中的ctrlFlavor值
// 将值作为flavor=的值传递给template: '<div>{{flavor}}</div>'
