// 判断是否选中
function isTextSelected() {
	var selecttxt = '';
	if (window.getSelection) {
		selecttxt = window.getSelection();
	} else if (document.getSelection) {
		selecttxt = document.getSelection();
	} else if (document.selection) {
		selecttxt = document.selection.createRange().text;
	}

//	console.log(selecttxt);
//	console.log(selecttxt.anchorNode);
//	console.log(selecttxt.focusNode);
	console.log(selecttxt.focusNode.tagName);
	return selecttxt;
}

function show() {
	// 直接打印是一个对象
//	console.log(isTextSelected());
	// toString 是文字
//	console.log(isTextSelected().toString());
	// 直接调用了toString
	console.log(123);
	$('#dd').val(isTextSelected());
}
