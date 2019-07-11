const Nightwatch = require('nightwatch')

Nightwatch.runTests('./tests/google.js', {
// various settings
}).then(function() {
// Tests finished
}).catch(function(err) {
// An error occurred
})
