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

function runCode()  //����һ�����д���ĺ�����
{
	if(1 == arguments.length)
		try{event = arguments[0];}catch(e){}
  var code=(event.target || event.srcElement).parentNode.childNodes[0].value;//��Ҫ���еĴ��롣
  var newwin=window.open('','','');  //��һ�����ڲ���������newwin��
  newwin.opener = null // ��ֹ�������̸ҳ���޸�
  newwin.document.write(code);  //������򿪵Ĵ�����д�����code��������ʵ�������д��빦�ܡ�
  newwin.document.close();
}

function writeTools(ICON, PostTime, url_struserName, struserName, bEmail, strHomePage, icq, OICQ, bFavor, url_subject, PostID, ParentID, strPosts, url_strGroupName, url_strSubject, admin, owner, intPage, vote)
{
	var SkinImageBaseURL = 'http://pic1.blueidea.com/bbs';
	document.write("<img align=absmiddle  border=0 src=" + SkinImageBaseURL + "/icon" + ICON + ".gif>&nbsp;");
	document.write("������ " + PostTime);
	document.write("&nbsp;&nbsp;");
	document.write("<a  href='viewuser.asp?username=" + url_struserName + "'target=_blank>");
	document.write("<img align=absmiddle alt='���˹ۿ�" + struserName + "�ĸ�������' border=0 src=" + SkinImageBaseURL + "/profile.gif ></a>&nbsp;");
	if(bEmail){
       	document.write("<a href=\"/common/contact.asp?username=" + url_struserName + "\" target=_blank><img alt='���˷��ʼ���" + struserName + "' border=0 src=" + SkinImageBaseURL + "/email.gif align=absmiddle></a>&nbsp;");
	}
	if(strHomePage){
		document.write("<a href=\"" + strHomePage + "\" target=_blank><img align=absmiddle src=" + SkinImageBaseURL + "/home.gif border=0 alt='����" + struserName + "����ҳ'></a>&nbsp;");
	}
	if(icq){
	//	document.write("<a href=\"javascript:window.open('ubbmisc.asp?action=icqmessage&UIN=" + icq + "')\">");
	//	document.write("<img align=absmiddle src=\"http://online.mirabilis.com/scripts/online.dll?icq=" + icq + "&img=5\"  alt=\"");
	//	document.write(struserName + "��ICQ���룺" + icq + "\" border=0 ></a>&nbsp;");
	}
	if(OICQ){
		document.write("<a href=http://search.tencent.com/cgi-bin/friend/user_show_info?ln=" + OICQ + "><img align=absmiddle border=0 src=" + SkinImageBaseURL + "/oicq.gif  alt=\"" + struserName + " �� oicq ��" + OICQ + ",�鿴 " + OICQ + " ������\"></a>&nbsp;");
	}
	if(bFavor){
		document.write("<a href=\"favor.asp?id=" + PostID + "&posts=" + strPosts + "\"><img border=0 align=absmiddle src=" + SkinImageBaseURL + "/favor.gif alt='�ղظ����⹩�Ժ�鿴'></a>&nbsp;");
	}
	document.write("<a href='pm.asp?action=newPM&recipient=" + url_struserName + "&subject=" + url_subject + "'><img src=" + SkinImageBaseURL + "/pm.gif align=absmiddle alt='�������Ļ���" + struserName + "' border=0></a>&nbsp;");
   	document.write("<a href=\"search.asp?action=searchuser&username=" + url_struserName + "\" target=_blank><img align=absmiddle src=" + SkinImageBaseURL + "/find.gif alt='����" + struserName + "����������' border=0></a>&nbsp;");

	if(admin || owner){
		document.write("<a  href='posting.asp?Forum=" + url_strGroupName + "&Topic=" + PostID + "&TopicSubject=" + url_subject + "&action=editpost'>");
		document.write("<img align=absmiddle border=0 alt='�༭/ɾ������'? src=" + SkinImageBaseURL + "/edit.gif ></a>&nbsp;");
	}

	if(admin){
		document.write("<a  href='ubbmisc.asp?action=deletepost&amp;Topic=" + PostID + "&amp;Forum=" + url_strGroupName + "'>");
		document.write("<img align=absmiddle border=0 alt='ɾ������'? src=" + SkinImageBaseURL + "/delete.gif ></a>&nbsp;");
	}

	document.write("<a href='posting.asp?quotenum=" + PostID + "&action=replywquote&forum=" + url_strGroupName + "&topic=" + ParentID + "&TopicSubject=" + url_strSubject + "'><img src=" + SkinImageBaseURL + "/quote.gif align=absmiddle alt='����������ӻظ�' border=0 ></a>&nbsp;");

	if(admin){
		document.write("<a href=\"posting.asp?action=votepost&topic=" + PostID + "\"><img align=absmiddle border=0 src=" + SkinImageBaseURL + "/vote.gif alt='���'></a>&nbsp;");
		document.write("<a href='ubbmisc.asp?forum=" + url_strGroupName + "&action=getip&topic=" + PostID + "'><img align=absmiddle src=" + SkinImageBaseURL + "/ip.gif border=0 alt=\"����Ա�鿴" + struserName + "��IP\" ></a>&nbsp;");
	
	}
	document.write(" <a href=\"posting.asp?action=reply&topic=2215976&forum=%C0%B6%C9%AB%BE%AD%B5%E4%CA%C2%CE%F1%B9%DC%C0%ED&isubject=" + url_subject + "&iid=", ParentID?ParentID:PostID, "&ipage=" + intPage + "&ianchor=" + PostID + "\" target=_blank>�ٱ�������Ϣ</a>");
	document.write("<hr class=bordercolor>");
	document.write("<div align=right>");
	if(vote > 0){
		for(var x=1; x<=vote; x++){
			document.write("<img src=" + SkinImageBaseURL + "/ratings.gif>");
		}
	}
	document.write("</div>");
}
