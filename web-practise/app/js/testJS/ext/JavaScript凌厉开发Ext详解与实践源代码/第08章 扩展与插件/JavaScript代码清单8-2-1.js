
//JavaScript代码清单8-2-1
MyExtension = function(config){
    Ext.apply(this, config);  //可选，复制所有配置项属性到对象
    MyExtension.superclass.constructor.call(this); //可选，调用超类的构造函数
//其它的处理
}
Ext.extend(MyExtension, /*要扩展的类*/, {/*对象的新属性、新方法*/})
//接着，我们需要实例化对象：
var myExtension = new MyExtension({/* 可选的配置项 */});




