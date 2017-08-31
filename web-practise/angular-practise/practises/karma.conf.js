module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine'],
		files: [
			'../lib/angular/angular1.2.0.js',
			'../lib/angular/angular-mocks.js',
			'../lib/browserTrigger.js',
//			'../lib/angular/angular-scenario.js',
//			'unit-testing-a-directive/main.js',
//			'unit-testing-a-directive/directive.spec.js'
//			'unit-testing-directive-scope/main.js',
//			'unit-testing-directive-scope/directive.spec.js'
			'testing-underscores/main.js',
			'testing-underscores/directive.spec.js'
		],
		exclude: [
		],
		reporters: ['progress'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ['Chrome'],
		captureTimeout: 60000,
		singleRun: false,
		junitReporter: {
			outputFile: 'test_out/unit.xml',
			suite: 'unit'
		}
	});
};
