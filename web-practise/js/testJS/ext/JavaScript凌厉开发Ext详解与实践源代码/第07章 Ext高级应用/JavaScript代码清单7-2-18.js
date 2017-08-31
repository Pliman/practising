//JavaScript代码清单7-2-18
NJS.OO = {
    //constant
    oc: Object.prototype.constructor,
    testSuperReg: /\b_super\b/    /**
     修改自Ext.extend方法
     */
    ,
    extend: function(sb, sp, overrides){
        if (typeof sp == 'object') {
            overrides = sp;
            sp = sb;
            sb = overrides.constructor != NJS.OO.oc ? overrides.constructor : function(){
                sp.apply(this, arguments);
            };
        }
        var F = function(){
        }, sbp, spp = sp.prototype;
        F.prototype = spp;
        sbp = sb.prototype = new F();
        sbp.constructor = sb;
        sb.superclass = spp;
        if (spp.constructor == NJS.OO.oc) {
            spp.constructor = sp;
        }
        sb.override = function(o){
            override(sb, o);
        };
        // 这里是关键点。 以实现通过this.super关键字调用父类
        NJS.OO.override(sb, sp, overrides || NJS.emptyObject); /*NJS.emptyObject可使得能够用户不传入类型为Object的第三个参数*/
        sb.extend = function(o){
            NJS.OO.extend(sb, o);
        };
        return sb;
    }    /**
     * @private
     * @param {Function} origclass  子类，由上面extend处理后而成。
     * @param {Function} superClass 父类。不过你亦可以从origclass.superclass访问到，因为
     * 									origclass.superclass === superClass //true
     * @param {Object}   overrides  重写的成员（方法、属性）
     */
    ,
    override: function(origclass, superClass, overrides){
    
        /**
         * 内置函数，这是为子类函数“加壳”的工厂。
         * 子类被继承后，若有重载方法，那么该方法会改写为下面return返回的函数。这一过程我们这里暂称“加壳”。
         * @param  {String}    name   方法的名称
         * @param  {Function}  fn     子类的方法，即重写的方法
         * @return {Function} “加壳”后新生成的函数， 换一种写法，
         *                  可以是 return new Function(arg,arg_1,...,FunctionBody);
         */
        function superFnFactory(name, fn){
            return function(){
                // 实际上这是一个简单的交换算法
                var temp = this._super;
                // Add a new ._super() method that is the same method
                // but on the super-class
                this._super = superClass.prototype[name]; //父类原型
                // The method only need to be bound temporarily, so we
                // remove it when we're done executing
                // 执行完毕后移除
                var ret = fn.apply(this, arguments);
                this._super = temp;
                return ret; // 保证fn执行后的返回值被传递
            };
        }
        // p是子类的意思。类型是对象（Object）
        var p = origclass.prototype;
        var keyValue // Hash哈希结构中的键值。迭代overrides的值。由下面for...in中的 
        // keyValue = overrides[name]赋值。类型是函数值（Function）。
        
        , isOverwrited // 检测子类、父类是否都有相同名字的方法。类型是布尔值（Boolean）。
, hasSuper; // 有包含super的字眼。类型是布尔值（Boolean）。
        if (!overrides) 
            return; // 没有重写，表示父类直接赋值给子类，退出继承。
        for (var name in overrides) {
        
            // keyValue是父类的成员
            keyValue = overrides[name];
            // 判断keyValue值是否为funcion类型。非方法的成员忽略。重载、重写的概念只存在方法（函数）中。
            isOverwrited = (typeof keyValue == "function") && (typeof p[name] == "function");
            
            // NJS.OO.constant.testSuperReg此值是常量，类型为RegExp（JavaScript正则表达式）
            // test()方法返回布尔值，速度较快。
            // hasSuper为true时表示此方法（keyValue值的内容）是包含有"_super"的关键字。
            // 即表示keyValue是一个重载、重写后的方法，需要经过superFnFactory进一步加工处理。
            hasSuper = NJS.OO.testSuperReg.test(keyValue);
            
            // 分配父类的成员到子类，实现“继承”
            p[name] = isOverwrited && hasSuper            // 如果方法是重载的话（isOverwrited与hasSuper两者同时成立），
            // 就进行函数加壳，加多一层闭包。
            // 见上面superFnFactory函数的简介
            ? superFnFactory(name, keyValue) //superFnFactory方法返回Function类型的值
            // 不存在重载，直接赋值到子类
            : keyValue;
        }
        
        // 补丁:IE 6不能用for..in..查找出constructor成员。
        // constructor、toString、valueOf在IE中这些为隐藏成员
        if (overrides['constructor']) {
            // 变量name、变量keyValue已在前面代码中声明。现在name特指'constructor'构造器
            name = 'constructor';
            keyValue = overrides[name];
            p[name] = superFnFactory(name, keyValue);
            // 补constructor到_super成员
            p._super = superClass.prototype.constructor;
        }
    }
};




















