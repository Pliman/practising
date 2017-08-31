define(['angular', 'angular-mocks', './my'], function (angular) {
	describe('Service: myService', function () {
		var myService,
			mockDependency;

		beforeEach(module('myModule'));

		beforeEach(function () {
			mockDependency = {
				getSomething: function () {
					return 'mockReturnValue';
				}
			};

			module(function ($provide) {
				$provide.value('myDependency', mockDependency);
			});

		});

		it('should return value from mock dependency', inject(function (myService) {
			expect(myService.useDependency()).toBe('mockReturnValue');
		}));

	});
});
