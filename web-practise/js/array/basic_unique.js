let arr = [
    {a: 'a', b: 'b'},
    3,
    '3',
    2,
    6,
    9,
    {a: 'a', b: 'b'},
    9
];

console.log(arr[0] == arr[6]);

function unique(arr) {
    let set = new Set();

    arr.forEach(function (item) {
        set.add(item);
    })

    return Array.from(set.values());
}

console.log(unique(arr));
let _ = require('./lodash');
console.log(_.uniq(arr));
