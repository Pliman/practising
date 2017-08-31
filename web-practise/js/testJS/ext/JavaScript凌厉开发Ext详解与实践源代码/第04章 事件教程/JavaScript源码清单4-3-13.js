Employee = function(name){
   //这里是Employee的构造函数
   this.name = name;
   this.addEvents([
      "fired",
      "quit" ,
      "init" ,
	 "beforeInit" 	
   ]);
   this.init(); //调用初始方法
}
Ext.extend(Employee, Ext.util.Observable, {
	init: function(){
		if(this.fireEvent("beforeInit", this.age)===false){ 
			//这里表示事件被beforeInit的处理函数取消
			alert('创建雇员时因某些条件不足而失败'); 
			return;
		}
		//....执行初始化过程
		this.fireEvent('quit', this.name);
	}
});

//创建Employee的实例
var jack = new Employee('jack');
jack.on("beforeInit", function(){
	if(!true){
		return true;
	}else{
		return false; //说明init方法不再执行
	}
});