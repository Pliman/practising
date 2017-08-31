var httpis=false
function window.onload(){
if(location.protocol=="http:")httpis=true;else httpis=false
bk1.fill.type='gradient';bk1.fill.color='white';bk1.fill.angle=50;
bk1.fill.method='any';bk1.fill.colors.value='50% #f1f0c7';
var temp1=location.href;
temp1=temp1.substr(temp1.lastIndexOf('/')+1).replace('.htm','');
for(i=0;i<parent.document.all.tags('LI').length;i++){
var tempobj=parent.document.all.tags('LI')[i];
if(tempobj.s==temp1){
menudiv1.innerHTML='《VML极道教程》<font style=font-size:12px;font-family:宋体>原著:沐缘华</font><br><font color=black>'+tempobj.s.replace('_','章')+'节:'+tempobj.innerText+'</font>';tempobj.style.color='red'
};else if(tempobj.style.color!='navy')tempobj.style.color='navy';}

var textlen=document.all.tags("textarea").length
var nextis=-1
for(i=0;i<textlen;i++){
nextis++
var temp1=document.all.tags("textarea")[i]
if(temp1.no==null)var tempcolor1="blue";else var tempcolor1="navy"
var temp1html="<div design=true id=code"+nextis+" style='cursor:text;letter-Spacing:0.9;color:"+tempcolor1+"'>"+temp1.value.replace(/</g,'&lt;').replace(/\r/g,'<BR>').replace(/<BR>\n<BR>/g,'<br>&nbsp;<br>').replace(/ \/\/(.*?)\n/g,'<font color=green>//$1</font>\n')+"</div>"
if(temp1.no==null)temp1html+="<center><input type=button value=快速运行以上VML代码在浏览器看效果 style='width:240;cursor:hand' onclick=openvmlwin(code"+nextis+")><input type=button value=临时编辑以上代码 style='width:120;cursor:hand' onclick=code"+nextis+".contentEditable=true></center>"
temp1.outerHTML=temp1html
i--;textlen--
}
}
function openvmlwin(whatobj){
var win1=window.open("","win1");win1.document.open();win1.document.write(whatobj.innerText);win1.document.close()
win1.moveTo(0,0);win1.resizeTo(screen.availWidth,screen.availHeight);win1.focus()
}
function document.onkeypress(){ 
if(event.keyCode==13&&event.srcElement.tagName=="DIV"){
var txtobj=document.selection.createRange()
txtobj.text==""?txtobj.text="\n":(document.selection.clear())&(txtobj.text="\n")
document.selection.createRange().select()
return false
}}