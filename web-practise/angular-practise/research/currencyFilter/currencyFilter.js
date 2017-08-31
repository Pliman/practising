var app = angular.module('app', []);

app.controller('AppCtrl', ['$scope', function ($scope) {
	$scope.total = 123.555;
}]);

app.filter('nfcurrency', [ '$filter', '$locale', function ($filter, $locale) {
  var currency = $filter('currency'), formats = $locale.NUMBER_FORMATS;
  return function (amount, symbol) {
    var value = currency(amount, symbol);
    console.log(value);
    // new RegExp('\\' + formats.DECIMAL_SEP + '\\d{2}')
    return value.replace(/\.\d{1}/, '')
  }
}]);