var obj = {
    a: {
        b: {
            c: 1,
            d: {dOne: 'd1'},
            e: 3
        },
        f: 4
    },
    g: {
        h: {
            i: 5
        }
    }
}

// to a:{abc: 1, abd: 2, abe: 3, af: 4}

var resultObj = {}

function objectFlat(obj) {
    for (var k in obj) {
        resultObj[k] = {}

        objectWalker(resultObj[k], obj[k], k)
    }

    console.log(resultObj)
}

function objectWalker(root, obj, parentString) {
    for (var k in obj) {
        var subObj = obj[k]

        if (typeof subObj === 'object') {
            objectWalker(root, subObj, parentString + k)
        } else {
            root[parentString + k] = subObj
        }
    }
}

objectFlat(obj)

// 问题：
// function objectWalker(obj, parentString) {
//     for (var k in obj) {
//         var subObj = obj[k]
//
//         if (typeof subObj === 'object') {
//             return objectWalker(subObj, parentString + k)
//         }
//
//         console.log([parentString + k], subObj)
//     }
// }
// 1. 没有转为对象
// 2. typeof 值为 object，o小写
// 3. return了，没有执行后面的属性


new Promise(function (resolve, reject) {
    throw new TypeError('出错啦')
})
    .then(function () {
        console.log(1)
    }, function () {
        console.log(2)
    })
    .then(function () {
        console.log(3)
    }, function () {
        console.log(4)
    })
