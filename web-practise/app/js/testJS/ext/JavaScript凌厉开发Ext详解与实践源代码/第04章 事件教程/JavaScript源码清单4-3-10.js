var obj = {
    toString: function(){
        return 'obj的范围内（作用域内）';
    }, //重写toString函数，方便执行console.log(this)时的输出
    func: function(){
        // 这里的函数直接从属与对象"object"
        console.log(this);
        var innerFunc = function(){
            //n这里的函数不是特定对象的直接成员，只是另外一个函数的变量而已
            console.log(this);
        };
        innerFunc = innerFunc.createDelegate(this); // 这里我们用委托的函数覆盖了原函数。
        innerFunc(); // 按照一般的写法调用函数
    }
};
obj.func();
