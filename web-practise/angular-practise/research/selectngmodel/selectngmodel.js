var app = angular.module('app', []);

app.controller('MyCtrl', function ($scope) {
	$scope.fonts = [
		{title: "Arial" , text: 'Url for Arial' },
		{title: "Helvetica" , text: 'Url for Helvetica' }
	];

	$scope.$watch('opt', function (n, o) {
		console.log(n);
	});

	$scope.change= function(option){
		alert(option.title);
	};
});
