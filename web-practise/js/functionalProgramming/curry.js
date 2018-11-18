// 本人的实现
// 问题：第二次执行，会报错，因为参数重复累加了
// var fn = curry(function(a, b, c) {
//     console.log([a, b, c]);
// });
//
// function curry(func) {
//     let args = []
//
//     return function m() {
//         let argArray = Array.from(arguments)
//         args = args.concat(argArray)
//         if (args.length >= func.length) {
//             return func.apply(func, args)
//         }
//
//         return m
//     }
// }
//
// fn("a", "b")("c")
// fn("a")("b")("c")

// 实现改变下，试图修正问题 - 不行，参数没有递归传下去
// var fn = curry(function(a, b, c) {
//     console.log([a, b, c]);
// });
//
// function curry(func) {
//     let args = []
//
//     return function m() {
//         let argArray = args.concat(Array.from(arguments))
//
//         if (argArray.length >= func.length) {
//             return func.apply(func, argArray)
//         }
//
//         return m
//     }
// }
//
// fn("a", "b")("c")
// fn("a")("b")("c")

// 关键点 1. 可多次执行 2. 每个柯里化的实例函数参数要独立
// 解决方案 1. 将上次参数传入，实现备忘录模式 2. 新执行使用新初始化的变量来存储参数

var fn = curry(function(a, b, c) {
    console.log([a, b, c]);
});

function curry(func, args) {
    args = args || []

    return function() {
        let argArray = args.concat(Array.from(arguments))

        if (argArray.length >= func.length) {
            return func.apply(func, argArray)
        }

        return curry(func, argArray)
    }
}

fn("a", "b")("c")
fn("a")("b")("c")





// 网上标准实现
// var fn = curry(function(a, b, c) {
//     console.log([a, b, c]);
// });
//
// function curry(func, args) {
//     var length = func.length
//     args = args || []
//
//     return function() {
//         var newArgs = args.concat(Array.prototype.slice.call(arguments))
//
//         if (newArgs.length < length) {
//             return curry(func, newArgs)
//         } else {
//             return func.apply(this, newArgs)
//         }
//     }
// }
//
//
// fn("a", "b")("C")
// fn("a")("b")("c")
