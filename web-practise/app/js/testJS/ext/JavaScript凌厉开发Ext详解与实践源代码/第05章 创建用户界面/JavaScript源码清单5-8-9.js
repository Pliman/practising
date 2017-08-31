/**
 * 通知DropZone源已经在Zone上方的函数。
 * 默认的实现返回this.dropNotAllowed，一般说只有登记的落下节点可以处理拖放操作。
 * 欲将DropZone本身也可接收落下的行为，应提供一个自定义的实现，重写该方法，
 * @param {Ext.dd.DragSource} source 处于落下目标上方的拖动源
 * @param {Event} e 事件对象
 * @param {Object} data 由拖动源规定格式的数据对象
 * @return {String} status 由落下状态反馈到源的CSS class,使得所在的{@link Ext.dd.StatusProxy}可被更新。
 */
function notifyDrop(dd, e, data){
    this.el.removeClass(this.overClass);
    this.el.appendChild(data.item);
    return true;
}

//投下（置下）的区域所需的常量
config = {
    ddGroup: 'group',
    overClass: 'dd-over',
    notifyDrop: notifyDrop
}
//建立DropZone实例
new Ext.dd.DropTarget('dd1-ct', config);
new Ext.dd.DropTarget('dd2-ct', config);
