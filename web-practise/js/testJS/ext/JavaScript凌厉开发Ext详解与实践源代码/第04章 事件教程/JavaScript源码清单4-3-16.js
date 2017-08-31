		//常见于面板为基类（panel）的组件事件注册
		{
			...
			listeners: {
				'collapse':function(obj){
					alert("闭合");
				},
				'expand':function(obj){
					alert("展开");
	   			}
			}
			...
		}
		//可指定scope、option config等
		listeners:{
			'expand': {
				fn: function(obj){
					alert("展开");
				}, 
				scope:this
			}
		}
		//如果在一个元素上添加多个事件处理器可以这样一次设定
		el.on({
    			'click' : {
    				fn: this.onClick,
				scope: this,
				delay: 100
    			}, 
    			'mouseover' : {
    				fn: this.onMouseOver,
				scope: this
    			},
    			'mouseout' : {
    				fn: this.onMouseOut,
        			scope: this
    			}
		});
		//或者是以下简捷语法为：
		el.on({
    			'click' : this.onClick,
    			'mouseover' : this.onMouseOver,
    			'mouseout' : this.onMouseOut,
    			scope: this
		});