//Java代码
boolean scriptTag = false;
String cb = request.getParameter("callback"); 
if (cb != null) {
    scriptTag = true;
    response.setContentType("text/javascript");
} else {
    response.setContentType("application/x-json");
}
Writer out = response.getWriter();
if (scriptTag) {
    out.write(cb + "(");
}
out.print(dataBlock.toJsonString()); //你构造好的业务数据对象
if (scriptTag) {
    out.write(");");
}