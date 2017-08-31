var testvar = 'window属性';
var o3 = {
    testvar: '3',
    testvar2: '3**',
    fun: function(){
        alert('o3: ' + this.testvar);//'obj3'
        var inner = function(){
            alert('o3-inner: ' + this.testvar);//'window属性'
            alert('o3-inner: ' + this.testvar2);//undefined（未定义）
        };
        inner();
    }
};
o3.fun();
