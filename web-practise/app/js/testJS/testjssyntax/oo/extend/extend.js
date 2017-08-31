function extendByNew() {

}

/**
 * c1从父类c2继承
 * 
 * @param {Class}
 *            c1
 * @param {Class}
 *            c2
 */
// e2
function extendByEmptyFunction(c1, c2) {
	var Temp = function() {
		c2.apply(this);
	};

	Temp.prototype = c2.prototype;

	c1.prototype = new Temp();
	c1.prototype.constructor = c1;
}

// 拷贝继承--没有实现构造函数中的属性拷贝？
// e3
function extend3(Child, Parent) {
	var p = Parent.prototype;
	var c = Child.prototype;

	for (var i in p) {
		c[i] = p[i];
	}
	c.uber = p;
}

// 全属性拷贝 子类的会被父类的覆盖--不好
// e4
function extendCopy(p) {
	var c = {};

	for (var i in p) {
		c[i] = p[i];
	}
	c.uber = p;

	return c;
}
