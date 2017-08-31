function onSetDefaultSort(){
    gridStore.setDefaultSort("price", "desc");
}

function onSort(){
    gridStore.sort("common", "desc");
}

//添加排序菜单
var sortMenu = new Ext.menu.Menu({
    id: 'sortMenu',
    items: [{
        text: '<font size="2">设置默认排序</font>',
        handler: onSetDefaultSort
    }, {
        text: '<font size="2">执行排序</font>',
        handler: onSort
    }]
});
mytoolbar.add({
    text: '<font size="2">排序</font>',
    menu: sortMenu
}, '-');
