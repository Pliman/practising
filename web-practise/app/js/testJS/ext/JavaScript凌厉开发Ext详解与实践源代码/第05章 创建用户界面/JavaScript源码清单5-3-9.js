// private
sortData: function(f, direction){
    direction = direction || 'ASC';
    var st = this.fields.get(f).sortType;
    var fn = function(r1, r2){
        var v1 = st(r1.data[f]), v2 = st(r2.data[f]);
        return v1 > v2 ? 1 : (v1 < v2 ? -1 : 0);
    };
    this.data.sort(direction, fn);
    if (this.snapshot && this.snapshot != this.data) {
        this.snapshot.sort(direction, fn);
    }
}
