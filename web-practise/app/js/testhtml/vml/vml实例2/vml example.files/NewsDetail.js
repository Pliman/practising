var currentpos,timer; 

function initialize() 
{ 
timer=setInterval("scrollwindow()",16); 
} 
function sc(){ 
clearInterval(timer); 
} 
function scrollwindow() 
{ 
currentpos=document.body.scrollTop; 
window.scroll(0,++currentpos); 
if (currentpos != document.body.scrollTop) 
sc(); 
} 
document.onmousedown=sc 
document.ondblclick=initialize

function runCode()  //定义一个运行代码的函数，
{
	if(1 == arguments.length)
		try{event = arguments[0];}catch(e){}
  var code=(event.target || event.srcElement).parentNode.childNodes[0].value;//即要运行的代码。
  var newwin=window.open('','','');  //打开一个窗口并赋给变量newwin。
  newwin.opener = null // 防止代码对论谈页面修改
  newwin.document.write(code);  //向这个打开的窗口中写入代码code，这样就实现了运行代码功能。
  newwin.document.close();
}

function writeTools(ICON, PostTime, url_struserName, struserName, bEmail, strHomePage, icq, OICQ, bFavor, url_subject, PostID, ParentID, strPosts, url_strGroupName, url_strSubject, admin, owner, intPage, vote)
{
	var SkinImageBaseURL = 'http://pic1.blueidea.com/bbs';
	document.write("<img align=absmiddle  border=0 src=" + SkinImageBaseURL + "/icon" + ICON + ".gif>&nbsp;");
	document.write("发表于 " + PostTime);
	document.write("&nbsp;&nbsp;");
	document.write("<a  href='viewuser.asp?username=" + url_struserName + "'target=_blank>");
	document.write("<img align=absmiddle alt='按此观看" + struserName + "的个人资料' border=0 src=" + SkinImageBaseURL + "/profile.gif ></a>&nbsp;");
	if(bEmail){
       	document.write("<a href=\"/common/contact.asp?username=" + url_struserName + "\" target=_blank><img alt='按此发邮件给" + struserName + "' border=0 src=" + SkinImageBaseURL + "/email.gif align=absmiddle></a>&nbsp;");
	}
	if(strHomePage){
		document.write("<a href=\"" + strHomePage + "\" target=_blank><img align=absmiddle src=" + SkinImageBaseURL + "/home.gif border=0 alt='访问" + struserName + "的主页'></a>&nbsp;");
	}
	if(icq){
	//	document.write("<a href=\"javascript:window.open('ubbmisc.asp?action=icqmessage&UIN=" + icq + "')\">");
	//	document.write("<img align=absmiddle src=\"http://online.mirabilis.com/scripts/online.dll?icq=" + icq + "&img=5\"  alt=\"");
	//	document.write(struserName + "的ICQ号码：" + icq + "\" border=0 ></a>&nbsp;");
	}
	if(OICQ){
		document.write("<a href=http://search.tencent.com/cgi-bin/friend/user_show_info?ln=" + OICQ + "><img align=absmiddle border=0 src=" + SkinImageBaseURL + "/oicq.gif  alt=\"" + struserName + " 的 oicq 是" + OICQ + ",查看 " + OICQ + " 的资料\"></a>&nbsp;");
	}
	if(bFavor){
		document.write("<a href=\"favor.asp?id=" + PostID + "&posts=" + strPosts + "\"><img border=0 align=absmiddle src=" + SkinImageBaseURL + "/favor.gif alt='收藏该主题供以后查看'></a>&nbsp;");
	}
	document.write("<a href='pm.asp?action=newPM&recipient=" + url_struserName + "&subject=" + url_subject + "'><img src=" + SkinImageBaseURL + "/pm.gif align=absmiddle alt='发送悄悄话给" + struserName + "' border=0></a>&nbsp;");
   	document.write("<a href=\"search.asp?action=searchuser&username=" + url_struserName + "\" target=_blank><img align=absmiddle src=" + SkinImageBaseURL + "/find.gif alt='搜索" + struserName + "的所有帖子' border=0></a>&nbsp;");

	if(admin || owner){
		document.write("<a  href='posting.asp?Forum=" + url_strGroupName + "&Topic=" + PostID + "&TopicSubject=" + url_subject + "&action=editpost'>");
		document.write("<img align=absmiddle border=0 alt='编辑/删除帖子'? src=" + SkinImageBaseURL + "/edit.gif ></a>&nbsp;");
	}

	if(admin){
		document.write("<a  href='ubbmisc.asp?action=deletepost&amp;Topic=" + PostID + "&amp;Forum=" + url_strGroupName + "'>");
		document.write("<img align=absmiddle border=0 alt='删除帖子'? src=" + SkinImageBaseURL + "/delete.gif ></a>&nbsp;");
	}

	document.write("<a href='posting.asp?quotenum=" + PostID + "&action=replywquote&forum=" + url_strGroupName + "&topic=" + ParentID + "&TopicSubject=" + url_strSubject + "'><img src=" + SkinImageBaseURL + "/quote.gif align=absmiddle alt='引用这个帖子回复' border=0 ></a>&nbsp;");

	if(admin){
		document.write("<a href=\"posting.asp?action=votepost&topic=" + PostID + "\"><img align=absmiddle border=0 src=" + SkinImageBaseURL + "/vote.gif alt='打分'></a>&nbsp;");
		document.write("<a href='ubbmisc.asp?forum=" + url_strGroupName + "&action=getip&topic=" + PostID + "'><img align=absmiddle src=" + SkinImageBaseURL + "/ip.gif border=0 alt=\"管理员查看" + struserName + "的IP\" ></a>&nbsp;");
	
	}
	document.write(" <a href=\"posting.asp?action=reply&topic=2215976&forum=%C0%B6%C9%AB%BE%AD%B5%E4%CA%C2%CE%F1%B9%DC%C0%ED&isubject=" + url_subject + "&iid=", ParentID?ParentID:PostID, "&ipage=" + intPage + "&ianchor=" + PostID + "\" target=_blank>举报不良信息</a>");
	document.write("<hr class=bordercolor>");
	document.write("<div align=right>");
	if(vote > 0){
		for(var x=1; x<=vote; x++){
			document.write("<img src=" + SkinImageBaseURL + "/ratings.gif>");
		}
	}
	document.write("</div>");
}
