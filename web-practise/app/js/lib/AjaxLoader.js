//hqm 2007-11-03
//异步加载类
/*
用法:
//GET方式提交,必须要配置服务器才支持中文
//var url = "/search.do?name="+name;
//var ajaxLoader = new AjaxLoader("GET",url);
//var xmlObj = ajaxLoader.getReturnXML();

//POST方式提交,不用配置服务器支持中文.
//注意参数编码格式,页面传递前必须先经过encodeURI
//后台request.setCharacterEncoding("UTF-8");
//String orgName = request.getParameter("orgName");
//orgName = java.net.URLDecoder.decode(orgName,"UTF-8");
//var url = "/search.do";
//var postVars = "orgName=" + orgName;
//postVars = encodeURI(postVars);//注意
//var ajaxLoader = new AjaxLoader("POST",url,postVars);
//var xmlObj = ajaxLoader.getReturnXML();
*/


function AjaxLoader(postMode,postURL,postVars){
	this.loader=null;//XMLHttpRequest对象
	this.postURL=(postURL==null||postURL=="")?"":postURL;//提交URL
	this.postMode=(postMode==null||postMode=="")?"GET":postMode;//提交模式
	this.postVars=(postVars==null||postVars=="")?"":postVars;//以POST模式提交时所放的参数
	this.returnXML=null;//返回的xml
	this.returnText = null;//返回的text
}

AjaxLoader.prototype.setPostMode = function (postMode){
	this.postMode = postMode;
}

AjaxLoader.prototype.setPostURL = function (postURL){
	this.postURL = postURL;
}

AjaxLoader.prototype.setPostVars = function (postVars){
	this.postVars = postVars;
}

AjaxLoader.prototype.getReturnXML = function (){
	if(this.returnXML==null){
		this.send();
	}
	return this.returnXML;
}

AjaxLoader.prototype.getReturnText = function (){
	if(this.returnText==null){
		this.send();
	}
	return this.returnText;
}

AjaxLoader.prototype.initLoader = function (){
	if ((!_isIE) && (window.XMLHttpRequest)) {
		this.loader = new XMLHttpRequest();
	}else {
		this.loader = new ActiveXObject("Microsoft.XMLHTTP");
	}
}

AjaxLoader.prototype.send = function (){
	this.initLoader();
	var mode = this.postMode==null?"GET":this.postMode.toUpperCase();
	this.loader.open(mode=="POST" ? "POST" : "GET", this.postURL, mode=="POST"  ? true : false);

	if(mode=="POST"){
		this.loader.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
	}
	
	this.loader.onreadystatechange = new this.waitLoadFunction(this);
	this.loader.send(null || this.postVars);
}

AjaxLoader.prototype.waitLoadFunction = function (_ajaxLoader){
	this.check = function () {
		if (_ajaxLoader.loader.readyState == 4) {
	       if (_ajaxLoader.loader.status == 200) {
	          var xmlObj = _ajaxLoader.loader.responseXML;
	          _ajaxLoader.returnXML = xmlObj;
	          var textObj = _ajaxLoader.loader.responseText;
	          _ajaxLoader.returnText = textObj;
	      }else if(_ajaxLoader.loader.status == 204){
	      		alert("AjaxLoader 错误，请联系开发人员。");
	      }
	   }
	};
	return this.check;
}

var _isFF = false;
var _isIE = false;
var _isOpera = false;
var _isKHTML = false;
var _isMacOS = false;
if (navigator.userAgent.indexOf("Macintosh") != -1) {
	_isMacOS = true;
}
if ((navigator.userAgent.indexOf("Safari") != -1) || (navigator.userAgent.indexOf("Konqueror") != -1)) {
	_isKHTML = true;
} else {
	if (navigator.userAgent.indexOf("Opera") != -1) {
		_isOpera = true;
		_OperaRv = parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf("Opera") + 6, 3));
	} else {
		if (navigator.appName.indexOf("Microsoft") != -1) {
			_isIE = true;
		} else {
			_isFF = true;
			var _FFrv = parseFloat(navigator.userAgent.split("rv:")[1]);
		}
	}
}
