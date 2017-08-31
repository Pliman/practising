// this.onClick是单击的处理函数的引用
el.on('click', this.onClick, this /*作用域指派为结合上下文的this引用*/, {
    single: true,
    delay: 200,
    stopEvent: true,
    userId: 2008
});
