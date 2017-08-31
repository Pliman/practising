onSelect: function(record, index){
    this.setValue('./images/' + record.data.filename);
    this.collapse();
    this.fireEvent('select', this, record, index);
}
