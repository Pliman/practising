//当treePanel每次添加新节点时都会修改节点的文本和图标
tree.on("append", function(node){
    var linkObj = node.getUI(); //节点的getUI方法返回Ext.tree.TreeNodeUI的实例
    linkObj.getTextEl().innerHTML = "点击后"; //<a>标签对象
    linkObj.getIconEl().src = "newPic.gif"; //<img>标签对象
});
