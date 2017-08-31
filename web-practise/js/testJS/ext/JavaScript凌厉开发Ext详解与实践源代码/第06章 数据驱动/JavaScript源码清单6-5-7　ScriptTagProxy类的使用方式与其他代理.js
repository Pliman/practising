var store = new Ext.data.Store({
    proxy: new Ext.data.ScriptTagProxy({
        url: 'http://extjs.com/forum/topics-browse-remote.php'
    }),
    reader: new Ext.data.JsonReader({        //。。。。。。。。。。。。。。。。
    }),
    remoteSort: true
});
