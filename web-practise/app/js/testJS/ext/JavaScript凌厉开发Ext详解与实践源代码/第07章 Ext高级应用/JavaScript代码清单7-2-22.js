//JavaScript代码清单7-2-22
namespace = function(){
    var a = arguments, o = null, i, j, d, rt;
    //遍历所传入的参数。JavaScript的参数具有参数个数不确定性
    for (i = 0; i < a.length; ++i) {
        d = a[i].split("."); //返回数组，每个字符串以.分割开后，成为数组的元素
        rt = d[0];//第一个元素是因子
        eval('if (typeof ' + rt + ' == "undefined"){' + rt + ' = {};} o = ' + rt + ';');
        for (j = 1; j < d.length; ++j) {
            o[d[j]] = o[d[j]] ||
            {};//跳过当前已经存在的对象
            o = o[d[j]];//移位到数组的下一个元素
        }
    }
}
