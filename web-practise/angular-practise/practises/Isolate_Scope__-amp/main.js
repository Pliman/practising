var app = angular.module('phoneApp', []);

app.controller("AppCtrl", function ($scope) {
	// api
	$scope.callHome = function (message) {
		console.log(message + " called home. ");
	};
});

app.directive("phone", function () {
	return {
		scope: {
			dial: "&" // controller scope // pass an object with name value to controller
		},
		template: '<input type="text" ng-model="value">' +
			'<div class="button" ng-click="dial({message:value})">Call home!</div>'
	}
});

// 流程：模板获取controller中的ctrlFlavor值
// 将值作为flavor=的值传递给template: '<div>{{flavor}}</div>'
