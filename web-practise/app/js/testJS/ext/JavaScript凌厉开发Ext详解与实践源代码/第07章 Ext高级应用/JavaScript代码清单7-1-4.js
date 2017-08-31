//JavaScript代码清单7-1-4
function makeIncrementer(){
    var n = 0;
    function increment(){
        return n++;
    }
    n++;
    return increment;
}

var inc1 = makeIncrementer();
alert(inc1()); //return 2






