var app = angular.module('app', ["ngAnimate"]);

app.controller("AppCtrl", function () {
	this.toggle = true;
});

app.animation(".toggle", function () {
	return {
		leave: function (element, done) {
			TweenMax.fromTo(element, 1, {opacity: 1}, {opacity: 0, onComplete: done});
		},
		enter: function (element, done) {
			TweenMax.fromTo(element, 1, {opacity: 0}, {opacity: 1, onComplete: done});
		}
	}
});