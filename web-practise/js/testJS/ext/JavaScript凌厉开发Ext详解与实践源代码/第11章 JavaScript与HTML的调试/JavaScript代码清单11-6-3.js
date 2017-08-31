
//JavaScript代码清单11-6-3
function test(){
    console.time('test');
    for (var i = 0; i < 200; i++) {
        console.log('当前的参数是：%d', i);
    }
    console.timeEnd('test');
}

test();



