<%@Language=VBScript  CodePage=65001%>
<%
dim temp
For Each x In Request.Form
  temp=temp& x & "：" & Request.Form(x) & ","
next
Response.Charset="utf-8"
Session.CodePage=65001
response.write "{success:true,data:'"&temp&"'}"
%>