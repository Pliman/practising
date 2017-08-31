Ext.onReady(function(){
    var frm = new Ext.form.FormPanel({
        applyTo: "form1",
        autoHeight: true,
        width: 750,
        frame: true,
        labelWidth: 80,
        labelSeparator: "：",
        title: '一行定义一个CoulumnLayout，每列中只有一个控件',
        items: [        //第一行
        {
            layout: 'column',
            border: false,
            items: [            //第一列
            {
                columnWidth: .3,
                layout: 'form',
                border: false,
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '一行一列',
                    name: 'text1-1-1',
                    anchor: '90%'
                }]
            },            //第二列
            {
                columnWidth: .3,
                layout: 'form',
                border: false,
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '一行二列',
                    name: 'text1-1-2',
                    anchor: '90%'
                }]
            },            //第三列
            {
                columnWidth: .3,
                layout: 'form',
                border: false,
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '一行三列',
                    name: 'text1-1-3',
                    anchor: '90%'
                }]
            }]
        },        //第二行
        {
            layout: 'column',
            border: false,
            items: [            //第一列
            {
                columnWidth: .3,
                layout: 'form',
                border: false,
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '二行一列',
                    name: 'text1-2-1',
                    anchor: '90%'
                }]
            },            //第二列
            {
                columnWidth: .3,
                layout: 'form',
                border: false,
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '二行二列',
                    name: 'text1-2-2',
                    anchor: '90%'
                }]
            }]
        },        //第三行
        {
            layout: 'column',
            border: false,
            items: [            //第一列
            {
                columnWidth: .25,
                layout: 'form',
                border: false,
                items: [{
                    xtype: 'checkbox',
                    fieldLabel: '三行一列',
                    boxLabel: '三行一列',
                    name: 'text1-3-1',
                    anchor: '90%'
                }]
            },            //第二列
            {
                columnWidth: .15,
                layout: 'form',
                border: false,
                items: [{
                    xtype: 'checkbox',
                    hideLabel: true,
                    boxLabel: '三行二列',
                    name: 'text1-3-2',
                    anchor: '90%'
                }]
            },            //第三列
            {
                columnWidth: .15,
                layout: 'form',
                border: false,
                items: [{
                    xtype: 'checkbox',
                    hideLabel: true,
                    boxLabel: '三行三列',
                    name: 'text1-3-3',
                    anchor: '90%'
                }]
            }]
        }]
    });
});
