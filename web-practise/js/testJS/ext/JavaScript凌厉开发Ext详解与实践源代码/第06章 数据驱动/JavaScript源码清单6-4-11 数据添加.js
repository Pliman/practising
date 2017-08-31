/*
 创建一个新的Record记录对象
 */
function createNewRecord(){
    return (new Plant({
        common: "info",
        light: 'Mostly Shade',
        price: 0,
        availDate: (new Date()).clearTime(),
        indoor: false
    }));
}

/*
 清空表格函数
 */
function clearGridInfo(){
    gridStore.removeAll();
}

/*
 添加记录函数
 */
function onAddClick(){
    gridStore.add([createNewRecord()]);
}

/*
 添加排序记录函数
 */
function onAddSortedClick(){
    gridStore.addSorted(createNewRecord());
}

/*
 插入记录函数
 */
function onInsertClick(){
    gridStore.insert(0, createNewRecord());
}

/*
 删除记录函数
 */
function onRemoveClick(){
    var recordId = grid.selModel.selections.keys;
    if (recordId == '' || recordId == null) {
        Ext.MessageBox.alert("提示", "请选择数据记录");
        return;
    }
    var recordInfo = gridStore.getById(recordId);
    gridStore.remove(recordInfo);
}

/*
 创建添加菜单
 */
var addMenu = new Ext.menu.Menu({
    id: 'addMenu',
    items: [{
        text: '<font size="2">清空表格</font>',
        handler: clearGridInfo
    }, {
        text: '<font size="2">添加</font>',
        handler: onAddClick
    }, {
        text: '<font size="2">添加排序数据</font>',
        handler: onAddSortedClick
    }, {
        text: '<font size="2">插入</font>',
        handler: onInsertClick
    }, {
        text: '<font size="2">删除</font>',
        handler: onRemoveClick
    }]
});

/*
 添加菜单到工具条
 */
mytoolbar.add({
    text: '<font size="2">数据添加与删除</font>',
    menu: addMenu
}, '-');
