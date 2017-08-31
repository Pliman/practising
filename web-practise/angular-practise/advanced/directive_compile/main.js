var myApp = angular.module('behaviorApp', []);

myApp.directive("compile", function () {
	return {
		restrict: 'E',
		template: '<div ng-transclude>aaa</div>',
		transclude: true,
//		compile: function (element, attrs, transclude) {
//			console.log(element); // 是 <compile>元素
//			console.log(element[0].children); // 是<compile>元素的子元素集
//			console.log(element[0].children[0]); // 是<compile>元素的子元素集
//			console.log(element[0].children[0].children); // 有3个元素，但是由于HTMLCollection是live dom，应该是后来加进去的
//			console.log(element[0].children[0].children.length); // =0，说明此时，ng-transclude还没有起作用
//			//console.log(transclude); // 一个连接函数而已
//		},
		link: function (scope, element, attrs) {
			console.log(element); // 是 <compile>元素
			console.log(element[0].children[0].children.length); // =3，说明此时，ng-transclude已经执行完毕了
		}
	}
});
