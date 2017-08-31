var app = angular.module('app', []);

app.directive("dumbPassword", function () {
	var  validElement = angular.element('<div>{{model.input}}</div>');

	this.link = function (scope, element) {
		scope.$watch("model.input", function (value) {
			if (value === "password") {
				//element.children(1).toggleClass("alert-box alert");
				validElement.toggleClass("alert-box alert");
			}
		});
	}

	return {
		restrict: "E",
		replace: true,
		template: '<div><input type="text" ng-model="model.input"></div>',
		compile: function (tElem) { // tElem编译过的template元素
			tElem.append(validElement);

			return link;
		}
//		,
//		link: function (scope, element) {
//			scope.$watch("model.input", function (value) {
//				if (value === "password") {
//					//console.log("change it.");
//					element.children(1).toggleClass("alert-box alert");
//				}
//			});
//		}
	}
});