// 实现一个函数sum， 运算结果可以满足如下预期结果：
// sum(1, 2, 3).valueOf(); //6
// sum(2, 3)(2).valueOf(); //7
// sum(1)(2)(3)(4).valueOf(); //10
// sum(2)(4, 1)(2).valueOf(); //9

// 本质是备忘录模式
function sum(args){
    let currentArgs = Array.isArray(args) ? args : Array.from(arguments)

    function innerSum() {
        let newArgs = currentArgs.concat(Array.from(arguments))

        return sum(newArgs)
    }

    innerSum.valueOf = function() {
        let sum = 0

        currentArgs.forEach(function(arg) {
            sum += arg
        })

        console.log(sum)
    }

    return innerSum
}

sum(1, 2, 3).valueOf(); //6
sum(2, 3)(2).valueOf(); //7
sum(1)(2)(3)(4).valueOf(); //10
sum(2)(4, 1)(2).valueOf(); //9
