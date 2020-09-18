var lodash = require('./lodash')()

lodash.filter([ 1, 2, 3, 4, 5, 6 ], (x) => {
    if (x > 3) {
        console.log(x)
    }
});
// console.log(lodash.filter([ 1, 2, 3, 4, 5, 6 ], (x) => x > 3))
