module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine'],
		files: [
			'../lib/angular/angular1.2.0.js',
			'../lib/angular/angular-mocks.js',
			'../lib/jquery/jquery-1.10.2.js',
			'../lib/jasmine-jquery/jasmine-jquery.js',
			'service vs provider vs factory/*.js',
			'test/*.js',
			{pattern: 'test/*.html', watched: true, included: false, served: true}
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
