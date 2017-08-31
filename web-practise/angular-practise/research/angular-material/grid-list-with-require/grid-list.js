define(['angular', 'angular-material'], function (angular) {
	var module = angular.module('app', ['ngMaterial']);

	module.controller('AppCtrl', [function () {
	}]);

	var $html = angular.element(document);
	$html.ready(function () {
		angular.bootstrap($html, ['app']);
		$html.addClass('ng-app');
	});
});