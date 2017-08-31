//JavaScript代码清单8-2-2
//插件的基本写法是：
MyPlugin = function(){
    this.init = function(f){
        /*插件的新属性、新方法*/
    }
};
//插件的使用方法如下：
var myPanel = new Ext.Panel({
    plugins: [new MyPlugin({/* 可选的配置项 */})],
    // 其它myPanel的配置项
});
