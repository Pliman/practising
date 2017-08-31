var app = angular.module('app', ['ui.router']);

app.config(['$stateProvider', function ($stateProvider) {
	var layout = {
		name: 'layout',
		url: '/layout',
		templateUrl: 'layout.html'
	};

	var frame = {
		name: 'layout.frame',
		parent: layout,
		url: '/frame',
		views:{
			header: {
				controller: 'FrameCtrl',
				templateUrl: 'header.html'
			},
			footer: {
				templateUrl: 'footer.html'
			}
		}
	};

	var content = {
		name: 'layout.frame.content',
		parent: frame,
		url: '/content',
		views:{
			'aa': {
				templateUrl: 'header1.html'
			},
			'container@': {
				controller: 'ContentCtrl',
				templateUrl: 'container.html'
			}
		}
	};

	$stateProvider.state(layout).state(frame).state(content);
//		.state("layout", {
//			url: '',
//			templateUrl: 'layout.html'
//		})
//		.state("layout.frame", {
//			url: '/layout',
//			views:{
//				header: {
//					controller: 'FrameCtrl',
//					templateUrl: 'header.html'
//				},
//				footer: {
//					templateUrl: 'footer.html'
//				}
//			}
//		}).state("layout.frame.content", {
//			url: '/content',
//			views:{
//				header: {
//					templateUrl: 'header.html'
//				},
//				footer: {
//					templateUrl: 'footer.html'
//				},
//				'container': {
//					controller: 'ContentCtrl',
//					templateUrl: 'container.html'
//				}
//			}
//		}).state("layout.frame.notify", {
//			url: '/notify',
//			views:{
//				'notification': {
//					templateUrl: 'notification.html'
//				}
//			}
//		});
}]);

app.controller('FrameCtrl', ['$scope' , function ($scope) {
	console.log(3211111);
}]);

app.controller('ContentCtrl', ['$scope' , function ($scope) {
	console.log(123);
}]);
