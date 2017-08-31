var rootNode = new Ext.tree.TreeNode({
    text: '根节点',
});
rootNode.appendChild(new Ext.tree.TreeNode({
    iconCls: 'oa-tree-common-World',
    listeners: {
        'click': function(){
            alert('此处理函数有' + arguments.length + '参数');
        }
    },
    text: '打开外网博客'
}));

rootNode.appendChild(new Ext.tree.TreeNode({
    iconCls: 'oa-tree-common-World',
    listeners: {
        'click': function(){
            alert('打开留言板管理');
        }
    },
    text: '打开留言板管理'
}));
