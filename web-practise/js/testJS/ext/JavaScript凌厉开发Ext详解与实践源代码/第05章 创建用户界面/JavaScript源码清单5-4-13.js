
if (frm.form.findField('field1').isValid()) {
    arrayDatas.push([id++, frm.form.findField('field1').getValue()]);
    frm.form.findField('field1').setValue('');
    frm.form.findField('field1').clearInvalid();
    frm.form.findField('education2').store.loadData(arrayDatas);
}

if (frm.form.findField('field2').isValid()) {
    arrayDatas2.push([id++, frm.form.findField('field2').getValue()]);
    frm.form.findField('field2').setValue('');
    frm.form.findField('field2').clearInvalid();
    simpleStore.loadData(arrayDatas2);
}

if (frm.form.findField('field3').isValid()) {
    jsonDatas.rows.push({
        retrunValue: id++,
        displayText: frm.form.findField('field3').getValue()
    });
    frm.form.findField('field3').setValue('');
    frm.form.findField('field3').clearInvalid();
    jsonStore.loadData(jsonDatas);
}
