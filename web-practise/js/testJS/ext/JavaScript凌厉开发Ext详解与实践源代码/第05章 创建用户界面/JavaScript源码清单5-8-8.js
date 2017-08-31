/**
 * 该方法在拖拽动作开始，初始化代理元素时调用，默认情况下，它克隆了this.dragData.ddel。
 * @param {Number} x  被点击的拖拽对象的X坐标
 * @param {Number} y  被点击的拖拽对象的y坐标
 * @return {Boolean} 该方法返回一个布尔常量，当返回true时，表示继续(保持)拖拽，返回false时，表示取消拖拽
 */
onInitDrag: function(e){
    //复制源对象this.dragData.item到this.ddel。this.ddel就是拖动过程中产生的主要代理元素。
    this.ddel.innerHTML = this.dragData.item.dom.innerHTML;
    this.ddel.className = this.dragData.item.dom.className;
    this.ddel.style.width = this.dragData.item.getWidth() + "px";
    this.proxy.update(this.ddel);//真正的代理元素是this.proxy，该语句是“填入”用户制定的内容（this.ddel）
}
