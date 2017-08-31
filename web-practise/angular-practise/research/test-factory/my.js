define(['angular'], function (angular) {
	angular.module('myModule', []).factory('myService', function (myDependency) {
		return {
			useDependency: function () {
				return myDependency.getSomething();
			}
		};
	});
});
