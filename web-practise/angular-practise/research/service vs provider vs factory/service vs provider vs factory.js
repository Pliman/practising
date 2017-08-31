var app = angular.module('app', []);

//service style, probably the simplest one
app.service('helloWorldFromService', function () {
	this.sayHello = function () {
		return "Hello, World!"
	};
});

//factory style, more involved but more sophisticated
app.factory('helloWorldFromFactory', function () {
	return {
		sayHello: function () {
			return "Hello, World!"
		}
	};
});

//provider style, full blown, configurable version     
app.provider('helloWorld', function () {
	// In the provider function, you cannot inject any
	// service or factory. This can only be done at the
	// "$get" method.

	this.name = 'Default';

	this.$get = function () {
		var name = this.name;
		return {
			sayHello: function () {
				return "Hello, " + name + "!"
			}
		}
	};

	this.setName = function (name) {
		this.name = name;
	};
});

//hey, we can configure a provider!            
app.config(function (helloWorldProvider) {
	helloWorldProvider.setName('World');
});

function sayHello() {
	this.sayHello = function () {
		return "Hello, World!"
	};
};

function MyCtrl($scope, helloWorld, helloWorldFromFactory, helloWorldFromService) {
	console.log(helloWorldFromService); // 新的实例化函数
	console.log(helloWorldFromFactory); // 返回的对象
	console.log(helloWorld); // 返回的对象

	$scope.hellos = [
		helloWorld.sayHello(),
		helloWorldFromFactory.sayHello(),
		helloWorldFromService.sayHello()];
}
