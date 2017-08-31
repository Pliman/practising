describe("Hello world", function () {
	var element;
	var $scope;
	beforeEach(module("app"));

	beforeEach(inject(function (_$compile_, _$rootScope_) { // 感觉没什么意义...，就是能够在整个test中使用了
		var $compile = _$compile_;
		var $rootScope = _$rootScope_;
		$scope = _$rootScope_;
		element = angular.element("<div eh-simple>{{2+2}}</div>");
		$compile(element)(_$rootScope_);
	}));

	it("should equal 4", function () {
		$scope.$digest();
		expect(element.html()).toBe("4");
	});

	describe("ehSimple", function () {
		it("Should be a class of plain", function () {
			expect(element.hasClass("plain")).toBe(true);
		});

		it("Should respond to a click", function () {
			browserTrigger(element, "click");
			expect($scope.clicked).toBe(true);
		});
	});
});