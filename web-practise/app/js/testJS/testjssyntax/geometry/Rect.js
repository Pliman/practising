/*
 * Rect.js 2011-5-10
 * 数码物联
 */
(function(){
	/**
	 * 水平矩形的表示 2011-5-10
	 * @author Pliman
	 */
	Rect = function(center,width,height){
		this.center = center;
		this.width = width;
		this.height = height;
	};
	
	Rect.prototype.center = null;
	
	Rect.prototype.width = 0;
	
	Rect.prototype.height = 0;
	
	Rect.prototype.getCenter = function(){
		return {
			x : this.x,
			x : this.y
		};
	};
	
	Rect.prototype.width = function(){
		return this.width;
	};
	
	Rect.prototype.height = function(){
		return this.height;
	};
})();