//JavaScript代码清单7-1-1
function makePowerFn(power){
    function powerFn(base){
        return Math.pow(base, power);
    }
    return powerFn;
}

var square = makePowerFn(2);
alert(square(3)); //返回9






