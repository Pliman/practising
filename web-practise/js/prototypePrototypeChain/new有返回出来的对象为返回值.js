function A(){
    this.valueOf = function () {
        console.log(123)
    }

    return function () {
        console.log(234)
    }
}

var obj = new A(); // obj为返回的function
// obj.valueOf 不是this.valueOf
obj()
