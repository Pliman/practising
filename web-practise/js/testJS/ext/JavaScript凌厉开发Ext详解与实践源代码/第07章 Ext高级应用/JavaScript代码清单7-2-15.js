//JavaScript代码清单7-2-15
// 创建命名空间。将所有变量和方法都划分到一个全局对象下管理，这样的好处是避免了变量名冲突和由不同函数干扰了全局变量的值
Ext.namespace('myNameSpace');
// 创建应用程序
myNameSpace.app = function(){
    //这里可放置私有函数 
    //这里可放置私有函数
    // return后面的是公共空间
    //该部分的代码请参考本节的“注意”部分内容
    return {
        //这里可放置公共的属性
        //这里可放置公共方法
        init: function(){
            alert('应用程序初始化成功。');
        }
    };
}();
//网页加载后便执行
Ext.onReady(myNameSpace.app.init, myNameSpace.app);


















