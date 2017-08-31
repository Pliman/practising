var frm2 = new Ext.form.FormPanel({
    applyTo: "form2",
    autoHeight: true,
    width: 750,
    frame: true,
    labelWidth: 80,
    labelSeparator: "：",
    title: '只定义一个CoulumnLayout，每列中只有一个控件',
    items: [{
        layout: 'column',
        border: false,
        items: [{
            columnWidth: .3,
            layout: 'form',
            border: false,
            items: [{
                xtype: 'textfield',
                fieldLabel: '一行一列',
                name: 'text2-1-1',
                anchor: '90%'
            }]
        }, {
            columnWidth: .3,
            layout: 'form',
            border: false,
            items: [{
                xtype: 'textfield',
                fieldLabel: '一行二列',
                name: 'text2-1-2',
                anchor: '90%'
            }]
        }, {
            columnWidth: .3,
            layout: 'form',
            border: false,
            items: [{
                xtype: 'textfield',
                fieldLabel: '一行三列',
                name: 'text2-1-3',
                anchor: '90%'
            }]
        }, {
            columnWidth: .3,
            layout: 'form',
            border: false,
            items: [{
                xtype: 'textfield',
                fieldLabel: '二行一列',
                name: 'text2-2-1',
                anchor: '90%'
            }]
        }, {
            columnWidth: .3,
            layout: 'form',
            border: false,
            items: [{
                xtype: 'textfield',
                fieldLabel: '二行二列',
                name: 'text2-2-2',
                anchor: '90%'
            }]
        }, {
            columnWidth: .3,
            layout: 'form',
            border: false,
            items: [{
                xtype: 'panel',
                height: 26
            }]
        }, {
            columnWidth: .25,
            layout: 'form',
            border: false,
            items: [{
                xtype: 'checkbox',
                fieldLabel: '三行一列',
                boxLabel: '三行一列',
                name: 'text2-3-1',
                anchor: '90%'
            }]
        }, {
            columnWidth: .15,
            layout: 'form',
            border: false,
            items: [{
                xtype: 'checkbox',
                hideLabel: true,
                boxLabel: '三行二列',
                name: 'text2-3-2',
                anchor: '90%'
            }]
        }, {
            columnWidth: .15,
            layout: 'form',
            border: false,
            items: [{
                xtype: 'checkbox',
                hideLabel: true,
                boxLabel: '三行三列',
                name: 'text2-3-3',
                anchor: '90%'
            }]
        }]
    }]
});
