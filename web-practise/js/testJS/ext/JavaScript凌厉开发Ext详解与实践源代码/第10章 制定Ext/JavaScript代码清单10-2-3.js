//JavaScript代码清单10-2-3
swapStyleSheet: function(id, url){
    this.removeStyleSheet(id); //删除传入ID的样式
    var ss = doc.createElement("link");//创建标签
    ss.setAttribute("rel", "stylesheet");//设置引用
    ss.setAttribute("type", "text/css");//设置类型为css
    ss.setAttribute("id", id);
    ss.setAttribute("href", url);//设置URL
    doc.getElementsByTagName("head")[0].appendChild(ss);//增加到head的最后面
}