var testCustomTpl = new Ext.Template(
    '<div>User: {userName} 性别： {userSex:this.sexFormat}</div>'
);
testCustomTpl.sexNoFormat = function(userSex) {
	//userSex类型是Blooean
	return userSex ===true ? '男' : '女';
};		
testCustomTpl.append(document.body, {username: '小张', userSex: true});