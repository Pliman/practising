//先定义一个二维数组
var localData = [["0", "Bloodroot", "", "Shade", "2.44", "03/15/06", "true"], ["1", "Columbine", "", "Mostly Shady", "9.37", "03/06/06", "true"], ["2", "Ginger, Wild", "", "Shade", "2.44", "03/15/06", "true"], ["3", "Hepatica", "", "Shade", "2.44", "03/15/06", "true"], ["4", "Hepatica", "", "Shade", "2.44", "03/15/06", "true"], ["5", "Liverleaf", "", "Shade", "2.44", "03/15/06", "true"], ["6", "Marsh Marigold", "", "Shade", "2.44", "03/15/06", "true"]];
//重新定义Store的构造
var store = new Ext.data.Store({
    //使用内存数据代理读取二维数组
    proxy: new Ext.data.MemoryProxy(localData),
    //创建ArrayReader数据读取器
    reader: new Ext.data.ArrayReader({
        id: 0
    }, Plant),
    sortInfo: {
        field: 'common',
        direction: 'asc'
    }
});
