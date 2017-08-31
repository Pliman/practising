//JavaScript代码清单7-1-3
function makeIncrementer(){
    var n = 0;
    function increment(){
        return ++n;
    }
}

var inc1 = makeIncrementer();
var inc2 = makeIncrementer();
inc1(); //return 1
inc1(); //return 2
inc1(); //return 3
inc2(); //return 1
inc2(); //return 2
inc2(); //return 3






