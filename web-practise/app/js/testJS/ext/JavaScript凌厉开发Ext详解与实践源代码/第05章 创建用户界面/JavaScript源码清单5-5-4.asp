<%@LANGUAGE="JAVASCRIPT" CODEPAGE="65001" %>
<%Session.CodePage     = 65001;
Response.Charset     = "utf-8";
//设置ContentType。虽不是强制，但能更好地让浏览器辨认出格式。
Response.ContentType = "text/json";
//以下部分是纯文本的输出内容，注意不能加入其他HTML标签或字符，必须是一个合法的JSON格式字符串 %>
[{"text":"yui-ext.js","id":"\/yui-ext.js","leaf":true,"cls":"file"} ,{ "text":"yui-ext-1118.php","id":"\/yui-ext-1118.php","leaf":true,"cls":"file" } ,{"text":"yui-ext-1228.php","id":"\/yui-ext-1228.php","leaf":true,"cls":"file" } ,{"text":"build","id":"\/build","cls":"folder"} ,{"text":"source","id":"\/source","cls":"folder"} ,{"text":"yui-ext-1123.php","id":"\/yui-ext-1123.php","leaf":true,"cls":"file"} ,{"text":"yui-ext-1203.php","id":"\/yui-ext-1203.php","leaf":true,"cls":"file"} ]