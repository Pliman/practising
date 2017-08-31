function *gen() {
	yield 1;
	yield 2;
	yield 3;
	yield 4;
	return 5;
}

for (var a of gen()) {
	console.log(a);
}
//1
//2
//3
//4