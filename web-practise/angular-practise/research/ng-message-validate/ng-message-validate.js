(function(angular) {
	'use strict';
	var module = angular.module('ngMessagesExample', ['ngMessages']);

	module.controller('ngMessagesCtrl', [function (scope) {
	}]);

	module.directive('mobileValid', function () {
		return {
			require: 'ngModel',
			link: function (scope, elm, attrs, ctrl) {
				ctrl.$parsers.push(function (viewValue) {
					if (/^((13[0-9])|(15[^4,\D])|(18[0-9])|(14[0-9])|(17[0,6-8]))\d{8}$/.test(viewValue)) {
						ctrl.$setValidity('mobileValid', true);
						return viewValue;
					} else {
						ctrl.$setValidity('mobileValid', false);
						return viewValue;
					}
				});
			}
		};
	});

	module.directive('hasError', function ($parse) {
		return {
			link: function (scope, elm, attrs) {
				var formControl = attrs.hasError;
				var form = $parse(formControl)(scope).$$parentForm.$name;

				scope.$watch(formControl + '.$invalid && (' + formControl + '.$touched || ' + form + '.$submitted)', function (n) {
					n ? elm.addClass('has-error') : elm.removeClass('has-error');
				});
			}
		};
	});

	var defaultTemplateUrl = "validate/validate-msg-tpl.html";

	module.directive('validateField', ['$templateCache', '$http', '$compile', function ($templateCache, $http, $compile) {
		return {
			require:['^?form'],
			link:function (scope, element, attrs, ctrls) {
				var ngForm = ctrls[0];
				var vf =  attrs.validateField;
				if (!vf) {
					vf = ngForm.$name+'.'+attrs.name;
				}
				var segs = vf.split('.');
				segs.pop();
				var form = segs.join('.');
				if (ngForm) {
					form = ngForm.$name;
				}

				(function (showWhen, message) {
					$http.get(defaultTemplateUrl, {cache: $templateCache})
						.success(function (templateContent) {
							templateContent = templateContent.replace('ng-show=""', 'ng-show="' + showWhen + '"');
							templateContent = templateContent.replace('ng-messages=""', 'ng-messages="' + message + '"');
							var template = $compile(templateContent)(scope);
							element.after(angular.element(template[0]));
						});
				})(vf + '.$invalid && (' + vf + '.$dirty || ' + form + '.$submitted)', vf + '.$error');
			}
		};
	}]);
})(window.angular);

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */