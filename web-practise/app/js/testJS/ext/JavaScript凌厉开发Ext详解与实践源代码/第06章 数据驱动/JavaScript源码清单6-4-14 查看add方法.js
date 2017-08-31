add: function(records){
    records = [].concat(records);
    if (records.length < 1) {
        return;
    }
    for (var i = 0, len = records.length; i < len; i++) {
        records[i].join(this);
    }
    var index = this.data.length;
    this.data.addAll(records);
    if (this.snapshot) {
        this.snapshot.addAll(records);
    }
    this.fireEvent("add", this, records, index);
}
