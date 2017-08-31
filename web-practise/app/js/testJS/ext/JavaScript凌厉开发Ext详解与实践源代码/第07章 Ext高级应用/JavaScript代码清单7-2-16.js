//JavaScript代码清单7-2-16
/**
 * 复制所有参数config中的属性至参数obj（第一个参数为obj，第二个参数为config）
 * @param {Object} obj 接受方对象
 * @param {Object} config 源对象
 * @param {Object} defaults 默认对象，如果该参数存在，obj将会获取那些defaults有而config没有的属性
 * @return {Object} returns obj
 * @member Ext apply
 */
Ext.apply = function(o, c, defaults){
    if (defaults) {
        Ext.apply(o, defaults);
    }
    if (o && c && typeof c == 'object') {
        for (var p in c) {
            o[p] = c[p];
        }
    }
    return o;
};



















