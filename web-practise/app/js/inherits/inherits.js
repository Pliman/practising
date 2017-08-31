function extend(dest, src) {
	var temp = function () {};
	temp.prototype = src;

	var tempInst = new temp();
	dest = tempInst;
}

var a = {a : 1};

var b = {b : 2};

extend(b, a);

a.c = 3;

//console.log(b.a);
//console.log(b.c);

// -----------------------------
var x = function () {};

x.prototype.a = 1;

var y = function () {};

y.prototype = new x();

y.constructor = y;

//console.log(new y().a);

// -----------------------------
function object(obj) {
	function F() {};
	F.prototype = obj;
	return new F();
}

var c = object(a);

a.d = 4;

console.log(c.d);