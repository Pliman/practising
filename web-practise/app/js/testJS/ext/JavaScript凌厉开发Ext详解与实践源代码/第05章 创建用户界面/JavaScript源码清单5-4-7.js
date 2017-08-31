var store1 = new Ext.data.Store({
    url: 'dataview_action.ashx?act=gridlist',
    baseParams: {},
    reader: new Ext.data.JsonReader({
        totalProperty: "results",
        root: "rows",
        id: "id"
    }, [{
        name: 'id'
    }, {
        name: 'title'
    }, {
        name: 'filename'
    }, {
        name: 'classid'
    }, {
        name: 'filesize',
        type: 'int'
    }, {
        name: 'createtime'
    }, {
        name: 'width'
    }, {
        name: 'height'
    }, {
        name: 'sortorder',
        type: "int"
    }]),
    remoteSort: true
}); //store
