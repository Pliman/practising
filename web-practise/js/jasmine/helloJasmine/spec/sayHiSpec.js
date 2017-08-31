describe('sayHi', function () {
	var name = '';
	var fixture;

	// 每个测试之前都会执行
	beforeEach(function () {
		name = 'Jerry';

		loadFixtures('fixture1.html');
//		$('#fixture').remove();
//		$('body').append('<div id="fixture">some HTML code here</div>');
		fixture = $('#fixture');
	});

	// hello
	it('should say hi with name', function () {
		expect(sayHi() + ',' + name).toEqual('say hi,Jerry');
	});

	it('should use inline fixture', function () {
		console.log(fixture.height());
		expect(fixture.html()).toEqual('some HTML code here');
	});
});