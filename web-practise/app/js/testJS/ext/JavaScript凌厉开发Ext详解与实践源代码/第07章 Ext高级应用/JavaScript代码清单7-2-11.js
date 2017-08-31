//JavaScript代码清单7-2-11
MyWindow = Ext.extend(Ext.Window, { 
constructor :function() {
    Ext.apply(this, { 
        // 在这里设定预配置的参数项
        width: 300,
        height: 300
    });
  	MyWindow.superclass.constructor.apply(this, arguments);
}
});
var myfirstpanel = new MyWindow({
    title: '我的第一个窗体'
});
 
var mysecondpanel = new MyWindow({
    title: '我的第二个窗体'
});















