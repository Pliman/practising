//JavaScript代码清单7-1-5
createCallback: function(/*args...*/){
    // make args available, in function below
    var args = arguments; //局部变量
    var method = this; //局部变量
    return function(){ //内部函数，作为外部函数的返回值
        return method.apply(window, args);
    };
}






