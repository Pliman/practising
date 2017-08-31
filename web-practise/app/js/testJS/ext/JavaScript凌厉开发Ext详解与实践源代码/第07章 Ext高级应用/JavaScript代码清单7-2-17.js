//JavaScript代码清单7-2-17
Ext.applyIf(Array.prototype, {
    indexOf : function(o){
       for (var i = 0, len = this.length; i < len; i++){
 	      if(this[i] == o) return i;
       }
 	   return -1;
}
});
//以上语句与下列语句作用相同
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(el){
        for (var i = 0; i < this.length; i++) {
            if (this[i] == el) 
                return i;
        }
        return -1;
    };
}



















