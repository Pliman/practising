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
        innerFunc();
    }
};
obj.func();
// 输出 "obj的范围内（作用域内）"
// 输出 "Window的一些相关内容..."
