/*
 通过构造函数可以看出，直接在构造函数给MemoryProxy传入要读取的数据data
 */
Ext.data.MemoryProxy = function(data){
    Ext.data.MemoryProxy.superclass.constructor.call(this);
    this.data = data;
};
Ext.extend(Ext.data.MemoryProxy, Ext.data.DataProxy, {
    /*
     Load方法是被Store调用的，那么Store传入的params可见这里并没有使用到，
     MemoryProxy使用Store传入的DataReader读取构造函数中传入的数据对象，
     那么就说明传入的数据对象的格式必须可以被DataReader读取，例如要传入一个Array
     数组数据对象，那么DataReader就的是Ext.data.ArrayReader。如源码6-5-2:
     JavaScript源码清单6-5-2　传入一个Array数组数据对象
     */
    load: function(params, reader, callback, scope, arg){
        params = params ||
        {};
        var result;
        try {
            result = reader.readRecords(this.data);
        } 
        catch (e) {
            this.fireEvent("loadexception", this, arg, null, e);
            callback.call(scope, null, arg, false);
            return;
        }
        /*
         看到了吧，DataReader读取数据成功后会调用Load方法传入的回调函数，
         并将DataReader读取好的数据对象作为参数传入给回调函数，其实
         这个callback就是上个章节讲的Store类中的loadRecords方法，loadRecords方法要求的数据格式，就是（o, options, success），
         什么？忘了？忘了就回顾一下Store章节的内容吧:
         */
        callback.call(scope, result, arg, true);
    },
});
