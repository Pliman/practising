Ext.get(“foo”).addKeyListener({
key: (number or array), 
//key配置项数字或数组类型均可，常用使用方法举例如下：
/*
key: 13,  或系统常量Ext.EventObject.ENTER
　　　key: "a\r\n\t"
　　　key: [10,13],　　　　//回车键被按了
　　　key: "abc"　　　　　//按了a或b或c
　　　key: "\t"
*/
     shift: (true/false), 
     ctrl: (true/false), 
     alt: (true/false)
});