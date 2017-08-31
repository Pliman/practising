var store = new Ext.data.Store({
    //使用内存数据代理读取Json数据
    proxy: new Ext.data.MemoryProxy(localData),
    //创建JsonReader数据读取器
    reader: new Ext.data.JsonReader({
        totalProperty: 'totalCounts',
        successProperty: 'success',
        root: 'results',
        id: 'id'
    }, Plant),
    sortInfo: {
        field: 'common',
        direction: 'asc'
    }
});
