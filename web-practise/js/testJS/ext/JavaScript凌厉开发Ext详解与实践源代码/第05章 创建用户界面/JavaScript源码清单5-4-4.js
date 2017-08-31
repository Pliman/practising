Ext.onReady(function(){
    Ext.form.Field.prototype.msgTarget = 'side';
    
    var frm = new Ext.form.FormPanel({
        applyTo: "form1",
        width: 250,
        height: 300,
        frame: true,
        labelWidth: 100,
        labelSeparator: "：",
        title: 'AnchorLayout的使用方法例子',
        items: [{
            xtype: 'textfield',
            fieldLabel: '没有使用anchor',
            allowBlank: false
        }, {
            xtype: 'textfield',
            fieldLabel: '使用anchor',
            allowBlank: false,
            anchor: '90%'
        }, {
            xtype: 'textfield',
            fieldLabel: 'anchor:"-50"',
            allowBlank: false,
            anchor: '-50'
        }, {
            xtype: 'panel',
            border: false,
            html: '内容：',
            bodyStyle: 'padding:0px 0px 5px 0px'
        }, {
            xtype: 'textarea',
            anchor: '100% 100%',
            hideLabel: true
        }]
    });
    
    var b = new Ext.Button({
        text: '调整FormPanel大小为(350,400)',
        handler: function(){
            if (frm.getSize().width == 250) {
                frm.setSize(350, 400);
            }
            else {
                frm.setSize(250, 300);
            }
        },
        renderTo: "button"
    });
});
