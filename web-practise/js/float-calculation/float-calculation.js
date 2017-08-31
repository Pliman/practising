var addTimes = 100000;
var mulTimes = 100000;
var count;

function floatConfirm() {
	//console.log('math: ' + (math.multiply(7, 0.8) === 5.6));
	console.log('math: ' + (math.add(0.1, 0.2) === 0.3));
	console.log('acc: ' + (accMul(7, 0.8) === 5.6));
	console.log('numeric: ' + (numeric.mul(7, 0.8) === 5.6));
	console.log('bignumber: ' + (new BigNumber(7).times(0.8) === 5.6));
}
floatConfirm();

//console.time('test integer add for acc');
//count = 0;
//for (var i = 0; i < addTimes; i++) {
//	count = accAdd(count, i);
//}
//console.log(count);
//console.timeEnd('test integer add for acc');
//
//console.time('test integer add for Math.add');
//count = 0;
//for (var i = 0; i < addTimes; i++) {
//	count = math.add(count, i);
//}
//console.log(count);
//console.timeEnd('test integer add for Math.add');

// ------------------------------------------
console.time('test float plus for acc');
count = 0;
for (var i = 0; i < 100000; i++) {
	count = accAdd(0.1, 0.2);
}
console.log(count);
console.timeEnd('test float plus for acc');

console.time('test float plus for BigNumber');
count = 0;
for (var i = 0; i < 100000; i++) {
	count = new BigNumber(0.1).add(0.2);
	if (count.c.length > 1) {
		count = count.s * (count.c[0] + parseFloat('0.' + count.c[1]));
	} else {
		count = count.s * (parseFloat('0.' + count.c[0]));
	}
}
console.log(count);
console.timeEnd('test float plus for BigNumber');
// ------------------------------------------
console.time('test float minus for acc');
count = 0;
for (var i = 0; i < 100000; i++) {
	count = accSub(100.1, 97.3);
}
console.log(count);
console.timeEnd('test float minus for acc');

console.time('test float minus for BigNumber');
count = 0;
for (var i = 0; i < 100000; i++) {
	count = new BigNumber(100.1).sub(97.3);
	if (count.c.length > 1) {
		count = count.s * (count.c[0] + parseFloat('0.' + count.c[1]));
	} else {
		count = count.s * (parseFloat('0.' + count.c[0]));
	}
}
console.log(count);
console.timeEnd('test float minus for BigNumber');
// ------------------------------------------
console.time('test float multiply for acc');
count = 0;
for (var i = 0; i < 100000; i++) {
	count = accMul(7, 0.8);
}
console.log(count);
console.timeEnd('test float multiply for acc');

console.time('test float multiply for BigNumber');
count = 0;
for (var i = 0; i < 100000; i++) {
	count = new BigNumber(0.8).times(7);
	if (count.c.length > 1) {
		count = count.s * (count.c[0] + parseFloat('0.' + count.c[1]));
	} else {
		count = count.s * (parseFloat('0.' + count.c[0]));
	}
}
console.log(count);
console.timeEnd('test float multiply for BigNumber');
// ------------------------------------------
console.time('test float divide for acc');
count = 0;
for (var i = 0; i < 100000; i++) {
	count = accDiv(100.1, 97.3);
}
console.log(count);
console.timeEnd('test float divide for acc');

console.time('test float divide for BigNumber');
count = 0;
for (var i = 0; i < 100000; i++) {
	count = new BigNumber(100.1).div(97.3);
	if (count.c.length > 1) {
		count = count.s * (count.c[0] + parseFloat('0.' + count.c[1]));
	} else {
		count = count.s * (parseFloat('0.' + count.c[0]));
	}
}
console.log(count);
console.timeEnd('test float divide for BigNumber');
// ------------------------------------------