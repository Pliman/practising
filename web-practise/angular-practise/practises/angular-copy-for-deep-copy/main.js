var app = angular.module('app', ["ngAnimate"]);

app.factory("contacts", function () {
	return [
		{"firstName": "Angelica", "lastName": "Britt", "phone": "513-0955"},
		{"firstName": "Amery", "lastName": "Compton", "phone": "1316568"},
		{"firstName": "Wendy", "lastName": "Morrow", "phone": "sdf1654"},
		{"firstName": "Mercedes", "lastName": "Merrill", "phone": "354561fdsf"},
		{"firstName": "Porter", "lastName": "Anderson", "phone": "56156sdf"},
		{"firstName": "Leah", "lastName": "Melendz", "phone": "vsd1f561"},
		{"firstName": "Olga", "lastName": "Mcgowan", "phone": "gds1g56"}
	];
});

app.controller("AppCtrl", function (contacts) {
	this.contacts = contacts;
	this.selectedContact = null;
	this.contactCopy = null;

	this.selectContact = function (contact) {
		this.selectedContact = contact;
		this.contactCopy = angular.copy(contact);
	};

	this.saveContact = function () {
		this.selectedContact.firstName = this.contactCopy.firstName;
	};
});

app.directive("hideMe", function ($animate) {
	return function (scope, element, attrs) {
		scope.$watch(attrs.hideMe, function (newVal) {
			if (newVal) {
				$animate.addClass(element, "fade");
			} else {
				$animate.removeClass(element, "fade");
			}
		});
	}
});

app.animation(".fade", function () {
	return {
		addClass: function (element, className) {
			TweenMax.to(element, 1, {opacity: 0});
		},
		removeClass: function (element, className) {
			TweenMax.to(element, 1, {opacity: 1});
		}
	};
});