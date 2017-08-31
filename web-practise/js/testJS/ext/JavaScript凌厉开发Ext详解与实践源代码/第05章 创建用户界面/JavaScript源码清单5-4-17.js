change: function(){
    field = frm.form.findField('province');
    if (field.isValid()) {
        cityField = frm.form.findField('city');
        cityField.clearValue();
        var value = field.getValue();
        var index = localProvince.find('province', value);
        if (index >= 0) {
            var rec = localProvince.getAt(index);
            localCity.loadData(rec.data.city);
        }
    }
}
