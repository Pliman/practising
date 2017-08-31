/*
 取得选择记录的详细信息
*/   
function onGetSingleSelectRowInfo(){
    var recordId = grid.selModel.selections.keys;
    if (recordId == '' || recordId == null) {
        Ext.MessageBox.alert("提示", "请选择数据记录");
        return;
    }
    var recordInfo = gridStore.getById(recordId);
    var common = recordInfo.get('common');
    var botanical = recordInfo.get('botanical');
    var light = recordInfo.get('light');
    var price = recordInfo.get('price');
    var availDate = recordInfo.get('availDate');
    var indoor = recordInfo.get('indoor');
	
	Ext.MessageBox.alert(
		"提示","您选择的数据记录为<br />" 
		+ "<br /><font color='#0033FF'>Common Name：</font>" 
		+　common 
		+ "<br /><font color='#0033FF'>Light：</font>" 
		+　light 
		+"<br /><font color='#0033FF'>Price：</font>" 
		+　price 
		+ "<br /><font color='#0033FF'>Available：</font>" 
		+　availDate 
		+"<br /><font color='#0033FF'>indoor：</font>" 
		+　indoor
	);
}
	
/*
	选择全部记录并设置每条记录common与light列字段的内容为newCommon，newLight
*/ 
function onGetMultiSelectRowInfo(){
    grid.getSelectionModel().selectAll();
    var recordId = grid.selModel.selections.keys;
    if (recordId == '' || recordId == null) {
        Ext.MessageBox.alert("提示", "请选择数据记录");
        return;
    }
    
    for (var i = 0; i < recordId.length; i++) {
        var recordInfo = gridStore.getById(recordId[i]);
        recordInfo.beginEdit();
        recordInfo.set('common', 'newCommon');
        recordInfo.set('light', ' newLight ');
        recordInfo.endEdit();
    }
}
	
function onGetCount(){
    Ext.MessageBox.alert("提示","当前表格共 " + gridStore.getCount() + " 行记录"); 
}

function onGetTotalCount(){
    Ext.MessageBox.alert("提示","检索总记录数为　" + gridStore.getTotalCount()); 
}

function onGetSortState(){
    Ext.MessageBox.alert("提示","当前排序信息 " + Ext.encode(gridStore.getSortState())); 
}