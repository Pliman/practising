function* inner() {
	yield 'hello!'
}

function* outer1() {
	yield 'open'
	yield inner()
	yield 'close'
}

var gen = outer1()
console.log(gen.next().value); // -> 'open'
console.log(gen.next()); // -> a generator
console.log(gen.next().value); // -> 'close'

function* outer2() {
	yield 'open'
	yield* inner()
	yield 'close'
}

var gen = outer2()
console.log(gen.next().value); // -> 'open'
console.log(gen.next()); // -> 'hello!'
console.log(gen.next().value); // -> 'close'