//JavaScript代码清单7-2-13
MyWindow= Ext.extend(Ext.Window, { 
width: 300,
     height: 300,
    // 新添加的函数，显示标题
showTitle: function() {
		alert(this.title);
    },
    // 重写原有的渲染函数
onRender: function() { 
alert("窗体"+this.title+"正在被渲染生成。");
        MyPanel.superclass.onRender.apply(this, arguments);
    }
});
var myfirstpanel = new MyWindow({
    title: '我的第一个窗体'
});
 
var mysecondpanel = new MyWindow({
    title: '我的第二个窗体'
});















