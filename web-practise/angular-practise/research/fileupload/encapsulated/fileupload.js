'use strict';

var module = angular.module('fileUploader', ['ngFileUpload']);

module.directive('uploader', ['$parse', 'Upload', function ($parse, Upload) {
	return {
		templateUrl: 'uploader/uploader.html',
		link: function (scope, element, attrs, transclude) {
			scope.percentageCb = attrs.onPercentage && $parse(attrs.onPercentage)();
			scope.successCb = attrs.successCb && $parse(attrs.successCb)();

			element.bind('click', function () {
				element.find('input')[0].click();
			});

			scope.onFileSelect = function ($files) {
				for (var i = 0; i < $files.length; i++) {
					var file = $files[i];
					scope.upload = Upload.upload({
						url: '/api/upload',
						file: file
					}).progress(function (evt) {
						var percentage = scope.percentage = Math.round((evt.loaded / evt.total) * 10000) / 100 + '%';
						scope.percentageCb && scope.percentageCb(percentage);
					}).success(function (data, status, headers, config) {
						console.log(data);
					});
				}
			};
		}
	};
}]);