//JavaScript代码清单8-7-3
var simple = new Ext.FormPanel({
    labelWidth: 40, // label settings here cascade unless overridden
    url: 'save-form.php',
    frame: true,
    title: '表单',
    bodyStyle: 'padding:5px 5px 0',
    width: 210,
    defaults: {
        width: 135
    },
    defaultType: 'textfield',
    items: [{
        xtype: 'uxspinner',
        fieldLabel: "test",
        name: "test",
        value: new Date().format('H:i:s'),
        strategy: {
            xtype: 'time',
            format: 'H:i:s',
            incrementConstant: Date.SECOND
        }
    }],
    buttons: [{
        text: '保存'
    }, {
        text: '取消'
    }]
});

