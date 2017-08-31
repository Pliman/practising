var simpleForm = new Ext.form.FormPanel({  
        bodyStyle: 'padding: 15px 0 0 10px;',  
        defaultType: 'textfield',  
        items:[{  
            fieldLabel: '帐号',  
            xtype: 'textfield'  
        },{  
            fieldLabel: '密码',  
            xtype: 'textfield'  
        }],  
        buttons:[{  
            text: '确定',  
            scope: this,  
            handler: confirmFn    
        },{  
            text: '取消',  
            scope: this,  
            handler: cancelFn  
        }],  
//用户通过配置项keys快捷键，下面登记了回车键为执行confirmFn的函数（提交表单）。 
        keys:[{  
            key : Ext.EventObject.ENTER,  
            fn : this.setOverTime,  
            scope : this  
        }]  
});