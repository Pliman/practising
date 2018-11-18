// var fn = curry(function(a, b, c) {
//     console.log([a, b, c]);
// });
//
// function curry(func, args) {
//     var args = args || []
//
//     return function() {
//         args = args.concat(Array.prototype.slice.call(arguments))
//
//         if (args.length >= func.length) {
//             return func.apply(func, args)
//         }
//
//         return curry(func, args)
//     }
// }
//
// fn("a", "b")("c")
// fn("a")("b")("c")


































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

var fn = curry(function(a, b, c) {
    console.log([a, b, c]);
});

function curry(func, args) {
    var length = func.length
    args = args || []

    return function() {
        var newArgs = args.concat(Array.prototype.slice.call(arguments))

        if (newArgs.length < length) {
            return curry(func, newArgs)
        } else {
            return func.apply(this, newArgs)
        }
    }
}

// function curry(func,args){
//     var length = func.length;
//     args = args||[];
//
//     return function(){
//         var newArgs = args.concat([].slice.call(arguments));
//
//         if(newArgs.length < length){
//             return curry(func,newArgs);
//         }else{
//             return func.apply(this,newArgs);
//         }
//     }
//
// }

fn("a", "b")("C")
fn("a")("b")("c")
