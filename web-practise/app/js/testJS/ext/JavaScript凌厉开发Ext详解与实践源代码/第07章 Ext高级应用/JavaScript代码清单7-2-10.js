//JavaScript代码清单7-2-10
// 构造器函数
var MyWindow = function(config){
    Ext.apply(this, {
        // 在这里设定预配置的参数项
        width: 300,
        height: 300
    });
    MyWindow.superclass.constructor.apply(this, arguments);
};
// MyWindow继承了Ext.Window
Ext.extend(MyWindow, Ext.Window, {});

var myfirstpanel = new MyWindow({
    title: '我的第一个窗体'
});

var mysecondpanel = new MyWindow({
    title: '我的第二个窗体'
});














