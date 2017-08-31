//这里的tplstr字符串用“单引号”表示，正好可以让HTML继续使用“双引号”
var tplStr = '<div class="userName">{template:userName}</div><div class="country">{template:country}</div>';

//使用字符串对象的replace方法进行替换，第一个参数是欲查找的目标内容，第二参数是替换后的新内容
//这里我们分别把{template:userName}替换为“小张”，{template: country }替换为“中国”
tplStr = tplStr.replace("{template:userName}", "小张");
tplStr = tplStr.replace("{template: country }", "中国");
