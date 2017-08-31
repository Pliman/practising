Ext.addBehaviors({
    // 为id为foo的锚点元素增加onclick事件监听
    '#foo a@click': function(e, t){
        // 处理函数的逻辑过程
    },
    
    // 为多个元素增加mouseover事件监听 (用,分隔多个选择器，事件名以@附加在结尾)
    '#foo a, #bar span.some-class@mouseover': function(){
        //处理函数的逻辑过程
    }
});
