//JavaScript代码清单8-6-1
Ext.namespace("Ext.ux.form");
Ext.ux.form.TreeComboBox = Ext.extend(Ext.form.ComboBox, {
    initComponent: function(ct, position){
        this.divId = 'tree-' + Ext.id();
        if (isNaN(this.maxHeight)) 
            this.maxHeight = 200;
        Ext.apply(this, {
            tpl: '<tpl>' +
            '<div style="height:' +
            this.maxHeight +
            'px;overflow:auto;">' +
            '<div id="' +
            this.divId +
            '"></div>' +
            '</div></tpl>'
        });
        
        var root = new Ext.tree.AsyncTreeNode({
            text: this.rootText,
            id: this.rootId,
            loader: new Ext.tree.TreeLoader({
                dataUrl: this.treeUrl,
                clearOnLoad: true
            })
        });
        
        this.tree = new Ext.tree.TreePanel({
            border: false,
            root: root,
            rootVisible: this.rootVisible,
            listeners: {
                scope: this,
                click: function(node){
                    this.setValue(node);
                    this.collapse();
                }
            }
        });
        
        Ext.ux.form.TreeComboBox.superclass.initComponent.call(this);
    },
    
    onRender: function(ct, position){
        Ext.ux.form.TreeComboBox.superclass.onRender.call(this, ct, position);
        
        this.on("expand", function(){
            if (!this.tree.rendered) {
                this.tree.render(this.divId);
            }
        }, this)
        
    },
    
    setValue: function(node){
        if (typeof node == "object") {
            this.setRawValue(node.text);
            if (this.hiddenField) {
                this.hiddenField.value = node.id;
            }
        }
        else {
            this.setRawValue(node);
        }
    }
});
Ext.reg('uxtreecombobox', Ext.ux.form.TreeComboBox);

