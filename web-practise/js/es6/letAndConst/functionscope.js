'use strict';

let foo = 'outer';

function bar(func = x => foo) {
	let foo = 'inner';
	console.log(func()); // outer
}

bar();