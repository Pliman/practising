Employee = function(name){
    //这里是Employee的构造函数
    this.name = name;
    this.addEvents(["fired", "quit", "init", ]);
    this.init(); //调用初始方法
}
Ext.extend(Employee, Ext.util.Observable, {
    init: function(){
        //....执行初始化过程
        this.fireEvent('quit');
    }
});
