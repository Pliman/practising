change: function(){
    field = frm.form.findField('province1');
    if (field.isValid()) {
        cityField = frm.form.findField('city1');
        cityField.clearValue();
        var value = field.getValue();
        var index = remoteProvince.find('province', value);
        if (index >= 0) {
            remoteCity.baseParams.province = value;
            remoteCity.load();
        }
    }
}
