'use strict';

var module = angular.module('angularScroll', ['duScroll']);

module.controller('angularScrollCtrl', ['$scope', '$document', '$timeout', function ($scope, $document, $timeout) {
	$timeout(function () {
		$scope.$apply(function () {
			// 先有条目，再有区域，区域渲染出来带条目
			// $scope.items = ['a','b','c','d','e','f','g'];
			$scope.sections = ['a','b','c','d','e','f','g'];

			$timeout(function () {
				$scope.$apply(function () {
					$scope.items = ['a','b','c','d','e','f','g'];
				});
			}, 1000);
		});
	}, 1000);

	// container的dom变动会引发scroll
	$timeout(function () {
		$scope.$apply(function () {
			$scope.sections.push('h');
		});
	}, 5000);

	$scope.jumpToSection = function (section) {
		var element = document.querySelector('#' + section);
		$document.scrollToElementAnimated(angular.element(element));
	};
}]);