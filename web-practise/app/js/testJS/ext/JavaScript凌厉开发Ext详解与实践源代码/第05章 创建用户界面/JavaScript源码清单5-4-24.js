Ext.apply(Ext.form.VTypes, {
    //ip验证函数
    ip: function(val, field){
        var ip = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/i;
        return ip.test(val);
    },
    //ip验证错误信息
    ipText: '错误的IP地址',
    //过滤ip输入
    ipMask: /[0-9.]/i
});
