//JavaScript代码清单7-2-14
function createMyPanel(config){
    return new Ext.Window(Ext.apply({//在这里设定预配置的参数项
        width: 300,
        height: 300
    }, config));
};

var myfirstwindow = createMyPanel({
    title: '我的第一个窗体'
});

var mysecondwindow = createMyPanel({
    title: '我的第二个窗体'
});
















