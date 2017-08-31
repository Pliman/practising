var module = angular.module('currencyExample', ['pascalprecht.translate']);

module.config(function ($translateProvider) {
	$translateProvider.translations('en', {
		TITLE: 'Hello',
		FOO: 'This is a paragraph.',
		BUTTON_LANG_EN: 'english',
		BUTTON_LANG_DE: 'german'
	});
	$translateProvider.translations('de', {
		TITLE: 'Hallo',
		FOO: 'Dies ist ein Paragraph.',
		BUTTON_LANG_EN: 'englisch',
		BUTTON_LANG_DE: 'deutsch'
	});
	$translateProvider.preferredLanguage('en');
});


module.controller('ExampleController', ['$scope', '$translate', function ($scope, $translate) {
	$scope.amount = 1234.56;

	$translate('TITLE').then(function (translation) {
		console.log(translation);
	});

	$scope.changeLanguage = function (key) {
		$translate.use(key);
	};
}]);