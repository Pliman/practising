//JavaScript代码清单7-2-9
MyNewClass = function(arg1, arg2, etc){
    // 显式调用父类的构造函数
    MyNewClass.superclass.constructor.call(this, arg1, arg2, etc);
};

Ext.extend(MyNewClass, SomeBaseClass, {
    Id: 10001, // Id属性，类型是数字型Number
    theDocument: Ext.get(document), // theDocument属性 类型是Ext.element
    myNewFn1: function(){
        // etc.
    },
    myNewFn2: function(){
        // etc.
    }
});
//类体建立完成，我们实例化它
var obj = new MyNewClass();













