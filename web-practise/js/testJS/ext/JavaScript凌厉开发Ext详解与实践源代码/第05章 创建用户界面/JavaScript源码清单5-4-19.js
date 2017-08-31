if (this.vtype) {
    var vt = Ext.form.VTypes;
    if (!vt[this.vtype](value, this)) {
        this.markInvalid(this.vtypeText || vt[this.vtype + 'Text']);
        return false;
    }
}
