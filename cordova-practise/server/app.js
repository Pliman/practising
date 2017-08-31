var koa = require('koa');
var router = require('koa-router');
var app = koa();

//app.use(function *(){
//	this.body = 'Hello World';
//});

app.use(router(app)).get('/do', function *(next) {
	this.body = 'Hello World!';
	console.log(123123);
});

app.listen(3000, function () {
	console.log('listening');
});