/*
 * Circle.js 2011-5-10
 * 数码物联
 */
(function(){
	/**
	 * 圆的表示 2011-5-10
	 * @author Pliman
	 */
	Circle = function(center,r){
		this.center = center;
		this.r = r;
	};
	
	Circle.prototype.center = null;
	
	Circle.prototype.r = 0;
	
	Circle.prototype.getCenter = function(){
		return {
			x : this.center.x,
			y : this.center.y
		};
	};
	
	Circle.prototype.getR = function(){
		return this.r;
	};
})();