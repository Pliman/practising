const Nightwatch = require('nightwatch')

Nightwatch.runTests('/path/to/tests_folder', {
// various settings
}).then(function() {
// Tests finished
}).catch(function(err) {
// An error occurred
})
