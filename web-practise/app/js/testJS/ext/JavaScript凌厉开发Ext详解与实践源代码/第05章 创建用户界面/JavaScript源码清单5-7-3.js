tpl.append('blog-roll', {
    id: 'link1',
    url: 'http://www.extjs.com/',
    text: "Ext官方站点"
});
tpl.append('blog-roll', {
    id: 'link2',
    url: 'http://www.ajaxjs.com/',
    text: "Ext中文网"
});
//生成的DOM结构如下：
//<a id="link1" href="http://www.extjs.com/">Ext官方站点</a><br />
//<a id="link2" href="http://www.ajaxjs.com/">Ext中文网</a><br />
