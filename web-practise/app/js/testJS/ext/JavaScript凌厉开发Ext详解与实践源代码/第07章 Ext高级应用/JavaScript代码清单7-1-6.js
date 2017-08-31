//JavaScript代码清单7-1-6
function show(x, y){
    Ext.MessageBox.alert("提示", 'x = ' + x +
    '<br/>' +
    'y = ' +
    y);
}

var f1 = show.createCallback(1, 2);
f1();






