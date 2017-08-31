//假设已有一个名为'my-object'的Ext组件，我们用Ext.getCmp返回该对象
Ext.util.Observable.capture(Ext.getCmp('my-object'), function(e){
    console.info(e);
});
