var myApp = angular.module('behaviorApp', []);

myApp.directive("enter", function () {
	return function (scope, element, attrs) {
		element.bind("mouseenter", function () {
			element.addClass("panel");
		})
	}
});


myApp.directive("leave", function () {
	return {
		link: function (scope, element) {
			element.bind("mouseleave", function () {
				element.removeClass("panel");
			});
		}
	}
});

// 错误，不能使用attrsEnter作为directive的第一个参数
myApp.directive("attrsEnter", function () {
	return function (scope, element, attrs) {
		element.bind("mouseenter", function () {
			element.addClass("panel");
		})
	}
});
