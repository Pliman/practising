var store = new Ext.data.Store({
    url: 'plants.xml',
    reader: new Ext.data.XmlReader({
        record: 'plant'
    }, Plant),
    sortInfo: {
        field: 'common',
        direction: 'asc'
    }
});
store.load();
