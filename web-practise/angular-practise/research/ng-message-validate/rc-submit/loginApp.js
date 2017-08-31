// create a module to make it easier to include in the app module
angular.module('rcForm', [])
	.directive(rcSubmitDirective);

// define module for app
angular.module('LoginApp', ['rcForm']).controller('LoginController', ['$scope',
	function ($scope) {

		$scope.session = {};

		$scope.login = function () {
			// process $scope.session
			alert('logged in!');
		};
	}]);
