var testvar = 'window属性';
var o1 = {
    testvar: '1',
    fun: function(){
        alert('o1: ' + this.testvar + '<<');
    }
};
var o2 = {
    testvar: '2',
    fun: function(){
        alert('o2: ' + this.testvar);
    }
};
o1.fun();
'1'
o2.fun();
'2'
o1.fun.call(o2);
'2'
