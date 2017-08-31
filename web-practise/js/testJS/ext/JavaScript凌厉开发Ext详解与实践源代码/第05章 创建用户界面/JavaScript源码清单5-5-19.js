app.tree = new Ext.tree.TreePanel({
    el: 'tree-div',
    useArrows: true,
    autoScroll: true,
    animate: true,
    enableDD: false,
    containerScroll: true,
    loader: new Ext.tree.TreeLoader({
        dataUrl: 'tree_action.ashx?act=list'
    }),
    listeners: {
        click: function(node, e){
            console.log(node);
            var obj = app.form.form.findField("parentid");
            if (obj) 
                obj.setValue(node.id);
        }
    }
});
