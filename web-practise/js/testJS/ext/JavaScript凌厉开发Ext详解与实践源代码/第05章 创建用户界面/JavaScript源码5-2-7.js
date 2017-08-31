var navHandler = function(direction){
    // 每当切换卡片时就会执行这个函数。
    // 这里可按照实际情况调用setActiveItem方法，处理任何有分支的判断，包括一些可能的动作包括“取消”或“完结卡片”等等。
    // 一个真实的向导根据其设计的情况，可能很复杂，最好就是创建一个子类的完成其设计。
}
var card = new Ext.Panel({
    title: '向导的演示',
    layout:'card',
    activeItem: 0, // 激活的item不能缺少
    bodyStyle: 'padding:15px',
    defaults: {
        // 每个子组件都有效
        border:false
    },
    // 简单的导航按钮，可以扩展更多
    bbar: [
        {
            id: 'move-prev',
            text: '后退',
            handler: navHandler.createDelegate(this, [-1]),
            disabled: true
        },
        '->', // 表示会占据所有空白的区域
        {
            id: 'move-next',
            text: '前进',
            handler: navHandler.createDelegate(this, [1])
        }
    ],
    // 内面的面板，就是“卡片”
    items: [{
        id: 'card-0',
        html: '<h1>欢迎来到向导！</h1><p>Step 1 of 3</p>'
    },{
        id: 'card-1',
        html: '<p>Step 2 of 3</p>'
    },{
        id: 'card-2',
        html: '<h1>祝贺！</h1><p>Step 3 of 3 - 完成！</p>'
    }]
});