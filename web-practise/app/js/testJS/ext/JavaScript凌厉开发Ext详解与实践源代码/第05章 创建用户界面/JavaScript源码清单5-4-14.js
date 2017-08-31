
if (frm.form.findField('education2').isValid()) {
    var value = frm.form.findField('education2').getValue();
    var removeIndex = -1;
    for (var i = 0; i < arrayDatas.length; i++) {
        if (arrayDatas[i][0] == value) {
            removeIndex = i;
            break;
        }
    }
    if (removeIndex > 0) 
        arrayDatas.splice(removeIndex, 1);
    frm.form.findField('education2').clearValue();
    frm.form.findField('education2').store.loadData(arrayDatas);
}

if (frm.form.findField('education4').isValid()) {
    var value = frm.form.findField('education4').getValue();
    var removeIndex = -1;
    for (var i = 0; i < arrayDatas2.length; i++) {
        if (arrayDatas2[i][0] == value) {
            removeIndex = i;
            break;
        }
    }
    if (removeIndex > 0) 
        arrayDatas2.splice(removeIndex, 1);
    frm.form.findField('education4').clearValue();
    simpleStore.loadData(arrayDatas2);
}

if (frm.form.findField('education6').isValid()) {
    var value = frm.form.findField('education6').getValue();
    var removeIndex = -1;
    for (var i = 0; i < jsonDatas.rows.length; i++) {
        if (jsonDatas.rows[i].retrunValue == value) {
            removeIndex = i;
            break;
        }
    }
    if (removeIndex > 0) 
        jsonDatas.rows.splice(removeIndex, 1);
    frm.form.findField('education6').clearValue();
    jsonStore.loadData(jsonDatas);
}
