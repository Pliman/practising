function aa () {
	window.history.pushState('aa', '', '#/aa');
	// window.location = '#/aa';
}

// pushState就是新增状态
function bc () {
	window.history.pushState('bb', '', '#/bb');
	window.history.pushState('cc', '', '#/cc');
}

// 替换当前state，当前state就不存在了，按浏览器返回键时，就返回到替换之后的状态
function replace () {
	window.history.replaceState('replace', '', '#/replace');
}

window.onpopstate = function (evt) {
	console.log(aa);
};

// pushstate不会触发onhashchange
//window.onhashchange = function () {
//	console.log(arguments);
//};