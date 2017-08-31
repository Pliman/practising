describe("service, provider, factory", function () {
	var service;
	var provider;
	var factory;

	// 就是在每个it之前的意思
	beforeEach(module("app"));

	beforeEach(inject(function (helloWorldFromService, helloWorldFromFactory, helloWorld) {
		service = helloWorldFromService;
		provider = helloWorldFromFactory;
		factory = helloWorld;

		console.log(service);
		console.log(provider);
		console.log(factory);
	}));

	it("Serivce should return a instance, so it is a function", function () {
		expect(service.__proto__ != null).toBe(true);
	});

	it("provider should return a object", function () {
		expect(typeof provider === "object").toBe(true);
	});
	it("factory should return a object", function () {
		expect(typeof factory === "object").toBe(true);
	});

});