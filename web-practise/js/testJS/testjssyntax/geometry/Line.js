/*
 * Line.js 2011-5-10
 * 数码物联
 */
(function(){
	/**
	 * 直线的表示 2011-5-10
	 * @author Pliman
	 */
	Line = function(point1,point2){
		if(point1.x == point2.x){
			this.k = NaN;
			this.b = point1.x;
		}else if(point1.y == point2.y){
			this.k = 0;
			this.b = point1.y;
		}else{
			this.k = (point1.y-point2.y)/(point1.x-point2.x);
			this.b = point1.y - (point1.y-point2.y)/(point1.x-point2.x)*point1.x
		}
	};
	
	Line.prototype.k = 0;
	
	Line.prototype.b = 0;
	
	/**
	 * 获取斜率
	 */
	Line.prototype.getK = function(){
		return this.k;
	};
	
	/**
	 * 获取偏移
	 */
	Line.prototype.getB = function(){
		return this.b;
	};
})();