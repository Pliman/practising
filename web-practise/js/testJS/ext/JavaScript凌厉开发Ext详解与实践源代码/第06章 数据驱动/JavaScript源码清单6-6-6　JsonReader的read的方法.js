read: function(response){
    var json = response.responseText;
    var o = eval("(" + json + ")");
    if (!o) {
        throw {
            message: "JsonReader.read: Json object not found"
        };
    }
    if (o.metaData) {
        delete this.ef;
        this.meta = o.metaData;
        this.recordType = Ext.data.Record.create(o.metaData.fields);
        this.onMetaChange(this.meta, this.recordType, o);
    }
    return this.readRecords(o);
}
