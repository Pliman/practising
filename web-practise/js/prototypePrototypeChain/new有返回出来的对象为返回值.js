function A(){
    this.valueOf = function () {
        console.log(123)
    }

    return function () {
        console.log(234)
    }
}

A.prototype.a = function () {
    console.log('a')
}

var obj = new A(); // obj为返回的function
// obj.valueOf 不是this.valueOf
console.log(obj.a)
obj()


var obj1 = Object.create(A.prototype)
console.log(obj1.a)
console.log(obj1.valueOf()) // object.create没有执行构造器
