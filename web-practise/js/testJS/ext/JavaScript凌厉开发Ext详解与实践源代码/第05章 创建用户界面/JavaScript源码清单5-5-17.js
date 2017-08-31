app.form = new Ext.FormPanel({
    labelWidth: 75,
    el: 'form-div',
    frame: true,
    title: '增加树节点',
    bodyStyle: 'padding:5px 5px 0',
    width: 350,
    defaults: {
        width: 230
    },
    defaultType: 'textfield',
    items: [{
        xtype: 'hidden',
        name: 'act',
        value: 'add'
    }, {
        xtype: 'hidden',
        name: 'parentid',
        value: '0'
    }, {
        fieldLabel: '名称',
        name: 'name',
        allowBlank: false,
        anchor: '90%'
    }, {
        xtype: 'textarea',
        height: 60,
        fieldLabel: '描述',
        name: 'description',
        anchor: '90%'
    }],
    
    buttons: [{
        text: '保存',
        handler: function(){
            if (app.form.form.isValid()) {
                app.form.form.doAction('submit', {
                    url: 'tree_action.ashx',
                    method: 'post',
                    params: '',
                    success: function(form, action){
                        var result = action.result.data;
                        if (result == 'ok') {
                            Ext.Msg.alert('信息', '树节点已保存！');
                        }
                        else {
                            Ext.Msg.alert('信息', action.result);
                        }
                    },
                    failure: function(form, action){
                        Ext.Msg.alert('信息', action.result);
                    }
                });
            }
        }
    }, {
        text: '重置',
        handler: function(){
            app.form.form.reset();
        }
    }]
});
