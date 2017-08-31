function proxify(o) {
    var result = {};
    var _loop_1 = function (p) {
        var v = o[p];
        // 1. 如何在不确定类型的情况下，对值进行修改 - 使用typeof推断？
        // 2. 如何实例化Proxy<Person[keyof Person]>
        var pPxy = {
            get: function () {
                if (typeof v === 'string') {
                    return (v + 'aaa');
                }
                // throw new Error(`Expected string or number, got '${v}'.`);
                return v;
            },
            set: function (value) {
                return;
            }
        };
        result[p] = pPxy;
    };
    for (var p in o) {
        _loop_1(p);
    }
    return result;
}
var pPerson = {
    name: "aaa",
    age: 123
};
var proxyProps = proxify(pPerson);
console.log(proxyProps);
console.log('------------');
console.log(proxyProps.name.get());
function unproxify(t) {
    var result = {};
    for (var k in t) {
        result[k] = t[k].get();
    }
    return result;
}
var originalProps = unproxify(proxyProps);
console.log('------------');
console.log(originalProps);
