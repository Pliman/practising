var app = angular.module('app', []);

app.controller('MyCtrl', function ($scope) {
	$scope.hellos = '1111';
});

app.directive('aa', function ($log) {
	return {
//		replace: true,
//		template: '<span ng-transclude></span>',
		transclude: true,
//		link: function (scope) {
//			scope.name = 'aaaa';
//			console.log(scope);
//		}
		compile: function(element, attrs, transclude) {

//			$log.info("every instance element:", element);

			return function (scope, iElement, iAttrs) {

//				$log.info("this instance element:", element);

				transclude(scope, function(clone){

//					$log.info("clone:", clone);
					scope.name = 'aaaa';
					iElement.replaceWith(clone);
				});
			}
		}
	}
});
