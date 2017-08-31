//本地数据对象
var localData = [['Bloodroot', '', 'Shade', '2.44', '03/15/06', 'true']];
var store = new Ext.data.Store({
    proxy: new Ext.data.MemoryProxy(localData),
    reader: new Ext.data.ArrayReader({}, Plant),
    sortInfo: {
        field: 'common',
        direction: 'asc'
    }
});
