var tree = new Ext.tree.TreePanel({
    el: 'tree-div',
    useArrows: true,
    autoScroll: true,
    animate: true, //表示激活展开、闭合的动画（默认为Ext.enableFx的值）
    enableDD: true, //表示允许拖放
    containerScroll: true,
    rootVisible: true,//是否显示根节点
    root: rootNode//我们会在下面定义
});
