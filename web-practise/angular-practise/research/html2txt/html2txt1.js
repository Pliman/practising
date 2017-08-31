angular.module("html2txt-directive", []).directive('html2txt', function ( ) {
	return function(scope, elm, attrs) {
		scope.$watch(attrs, function() {
			var length = attrs.length;
			if (length === undefined) {
				length = 30;
			}
			var content = angular.element('<div>' + attrs.content + '</div>').text();
			elm.html('<p>' + content.substring(0, length) + '...' );
			$compile(elm.contents())(scope);
		});
	};
});