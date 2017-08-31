mapclass = {
	rowInfos : [],
	element0 : '1',
	element1 : '2',
	element2 : '3',
	addElement : function(){
		this.rowInfos.push(this.element0);
		this.rowInfos.push(this.element1);
		this.rowInfos.push(this.element2);
		alert(this.rowInfos.length);
		
		alert(this.rowInfos[0]);
	}
}