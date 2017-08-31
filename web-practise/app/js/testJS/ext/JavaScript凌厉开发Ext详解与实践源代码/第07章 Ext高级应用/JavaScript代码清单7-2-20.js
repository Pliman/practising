//JavaScript代码清单7-2-20
/* Ext.namespace会创建下列对象，若不存在的话 */
Ext.namespace('App', 'App.panel', 'App.data');

/*定义App.form包内部的新类SamplePanel */
App.panel.SamplePanel = Ext.extend(Ext.Panel, {
    initComponent: function(){
        /*component configuration code here! */
        App.form.SamplePanel.superclass.call(this);
    }
});

/* 定义App.data包内部的单列*/
App.data.MySingleton = function(){
    return {
        sampleStaticMethod: Ext.emptyFn
    };
}();

