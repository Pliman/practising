// Javascript代码 
var win = new Ext.Window({
    title: 'Order Viewer',
    layout: 'border',
    width: 500,
    height: 500,
    modal: true,
    resizable: false,
    closable: false,
    draggable: false,
    items: [frm, lst]
});

win.on('render', function(){
    load(5);
});

win.show();

var win = new Ext.Window({
    title: 'Order Viewer',
    layout: 'border',
    width: 500,
    height: 500,
    modal: true,
    resizable: false,
    closable: false,
    draggable: false,
    items: [frm, lst]
});

win.on('render', function(){
    load(5);
});

win.show();
