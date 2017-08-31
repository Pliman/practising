<!--  AD rotator script written entirely in JavaScript  -->
<!--  Written by WenWei, 2002/03/03. E-mail: wenwei#blueidea.com  -->
<!--  ASP 2 JS Written by 小荷, 2003/05/28. E-mail: aston314#sohu.com  -->
<!--  Member Of Blueidea Web Team. -->
<!--  Welcome to www.blueidea.com. -->
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

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_showHideLayers() { //v3.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v='hide')?'hidden':v; }
    obj.visibility=v; }
}

// AD Banner object
function ADBanner(){
  this.htmlcode  = "";// Non image banner's html code
  this.href      = "";// Link's href attrib
  this.imgsrc    = "";// Image's src attrib
  this.imgwidth  = "";// Image's width attrib
  this.imgheight = "";// Image's height attrib
  this.imgalt    = "";// Image's alt attrib
  this.imgborder = "";// Image's border attrib
  this.weight    = 1;// Banner's show weight
  this.place     = 1// Banner's place
  this.type      = 1;// Banner's type
}

// Make Banner objects array
function CreatBanners(aBanners, aNum){
  for( var i=0; i<aNum; i++ ){
    aBanners[i] = new ADBanner();
  }
}

// Show banner
function showbanner(aPlace, aType, aBannerID)
{
  var amount = ADBanners.length;
  var includeList = new Array(amount);

  if (!document.usedBanners){
    document.usedBanners = new Array(amount);
for (var i=0; i<amount; i++)
      document.usedBanners[i] = -1;
  }
 
  var usedList = document.usedBanners;

  if (arguments.length == 2){
    var j = 0;
    var sum = 0;
for(var i=0; i<amount; i++){
if (ADBanners[i].place == aPlace && ADBanners[i].type == aType){
if (usedList[i] != i){
  includeList[j] = i;
      j++;
          sum = sum + ADBanners[i].weight;
    }
  }
 }
    if (sum <= 0)
  return;
    var rndNum = Math.round(Math.random() * sum);

    i = 0;
    j = 0;
    while (true) {
      j = j + ADBanners[includeList[i]].weight;
      if (j >= rndNum)
        break;
      i++;
    }

    i = includeList[i];
  }
  else{
if (aBannerID >= 0 && aBannerID < amount)
      i = aBannerID;
else
  return;
  }

  usedList[i] = i;

  if (ADBanners[i].htmlcode == "")
    document.write('<A HREF="'+ ADBanners[i].href +'" target=_blank><IMG SRC="'+ ADBanners[i].imgsrc +'" WIDTH="'+ ADBanners[i].imgwidth +'" HEIGHT="'+ ADBanners[i].imgheight +'" ALT="'+ ADBanners[i].imgalt +'" BORDER="'+ ADBanners[i].imgborder +'"></A>');
  else
    document.write(ADBanners[i].htmlcode);
}

var ADBanners = new Array();

CreatBanners(ADBanners, 11);

ADBanners[0].htmlcode  = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0" width="533" height="104"><param name=movie value="http://gg.blueidea.com/2005/www/533-104.swf"><PARAM NAME=wmode VALUE=opaque><param name=quality value=autolow><embed src="http://gg.blueidea.com/2005/www/533-104.swf" quality=autolow pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" width="533" height="104"></embed> </object>';
ADBanners[0].weight    = 10;
ADBanners[0].place= 2;
ADBanners[0].type = 2;

ADBanners[1].imgsrc    = "http://gg.blueidea.com/2005/e2/e2.gif";
ADBanners[1].href = "http://www.yourthink.com/miimoo/store/";
ADBanners[1].imgwidth  = "120";
ADBanners[1].imgheight = "60";
ADBanners[1].imgalt    = "米墨乐品";
ADBanners[1].weight    = 1;
ADBanners[1].place= 3;
ADBanners[1].type = 3;

ADBanners[2].htmlcode  = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0" width="766" height="60"><param name=movie value="http://gg.blueidea.com/2005/alipay/770.swf"><PARAM NAME=wmode VALUE=opaque><param name=quality value=auto><embed src="http://gg.blueidea.com/2005/alipay/770.swf" quality=high pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" width="766" height="60"></embed> </object>';
ADBanners[2].weight    = 10;
ADBanners[2].place= 1;
ADBanners[2].type = 6;

ADBanners[3].imgsrc    = "http://gg.blueidea.com/2006/chinaok/208x32.gif";
ADBanners[3].href = "http://www.chinaok.net.cn";
ADBanners[3].imgwidth  = "208";
ADBanners[3].imgheight = "32";
ADBanners[3].imgalt    = "欧科动力给朋友们拜年了！";
ADBanners[3].weight    = 10;
ADBanners[3].place= 4;
ADBanners[3].type = 4;

ADBanners[4].htmlcode  = '<script type="text/javascript">google_ad_client = "pub-5841412030047197";google_alternate_color = "CCCCD4";google_ad_width = 728;google_ad_height = 90;google_ad_format = "728x90_as";google_ad_channel ="7977407778";google_ad_type = "text_image";google_color_border = "6699CC";google_color_bg = "003366";google_color_link = "FFFFFF";google_color_url = "AECCEB";google_color_text = "AECCEB";</script><script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></script>';
ADBanners[4].weight    = 20;
ADBanners[4].place= 6;
ADBanners[4].type = 6;

ADBanners[5].htmlcode  = '<A target=_blank href=http://www.hongxiu.com/><b><font color=red>红袖添香夜读书</font></b></a><br><a href=http://www.jietusoft.com/case_tw.html target=_blank><b>杰图软件虚拟现实漫游欣赏</b></a><br><A target=_blank href="http://dsp.blueidea.com">DSP专业资讯网<a><br>';
ADBanners[5].weight    = 10;
ADBanners[5].place= 10;
ADBanners[5].type = 7;

ADBanners[6].imgsrc    = "http://gg.blueidea.com/2006/chinaok/468x60.gif";
ADBanners[6].href = "http://www.chinaok.net.cn";
ADBanners[6].imgwidth  = "468";
ADBanners[6].imgheight = "60";
ADBanners[6].imgalt    = "欧科动力给朋友们拜年了！";
ADBanners[6].weight    = 30;
ADBanners[6].place= 5;
ADBanners[6].type = 5;

ADBanners[7].imgsrc    = "http://gg.blueidea.com/2006/kijiji/208x32.gif";
ADBanners[7].href = "http://www.linktoad.com/adclick.php?aid=4702ef&cid=2144&url=http://bbs.kijiji.com.cn/jobs.vx";
ADBanners[7].imgwidth  = "208";
ADBanners[7].imgheight = "32";
ADBanners[7].imgalt    = "支付宝开发联盟";
ADBanners[7].weight    = 20;
ADBanners[7].place= 4;
ADBanners[7].type = 4;

ADBanners[8].htmlcode  = '<script type="text/javascript">google_ad_client = "pub-5841412030047197";google_ad_width = 728;google_ad_height = 90;google_alternate_ad_url = "http://www.blueidea.com/js/google_adsense_script.html";google_ad_format = "728x90_as";google_ad_channel ="7977407778";google_ad_type = "text_image";google_color_border = "6699CC";google_color_bg = "003366";google_color_link = "FFFFFF";google_color_url = "AECCEB";google_color_text = "AECCEB";</script><script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></script>';
ADBanners[8].weight    = 10;
ADBanners[8].place= 1;
ADBanners[8].type = 1;

ADBanners[9].htmlcode  = '<a href=http://blog.blueidea.com target=_blank><b>经典BLOG群</b></a> <a href=http://www.idc2008.com target=_blank><b><font color=red>数字引擎，双机房，1500M 空间仅399元</font></b></a>';
ADBanners[9].weight    = 10;
ADBanners[9].place= 7;
ADBanners[9].type = 7;

ADBanners[10].htmlcode  = '<br>';
ADBanners[10].weight    = 10;
ADBanners[10].place= 9;
ADBanners[10].type = 6;

