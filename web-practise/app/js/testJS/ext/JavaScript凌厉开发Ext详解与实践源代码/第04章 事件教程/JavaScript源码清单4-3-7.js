var i = 4;
var j = 5;
var k = 7;
var fn = function(){
    var i = 6;
    k = 8;//注意前面没有var 所以这句话的意思的把8赋予到变量k中去
    alert(i);//6
    alert(j);//5
    alert(k + '-1');//8-1
    x = 1;//这句的作用有两种情况，创建全部变量x或覆盖（overwrite）全部变量x
};
fn();
alert(k + '-2');//8-2 (注意不是7-2)
