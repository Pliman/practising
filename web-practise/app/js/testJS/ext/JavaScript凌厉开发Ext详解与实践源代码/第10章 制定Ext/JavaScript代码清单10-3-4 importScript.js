//JavaScript代码清单10-3-4 importScript.js
/*
 导入相应的语言资源文件，并执行回调函数
 */
function importScript(src, callback){
    var script = document.createElement("script");
    
    if (script.addEventListener) 
        script.addEventListener("load", callback, false);
    else 
        if (script.attachEvent) 
            script.attachEvent("onreadystatechange", function(){
                importScript.callbackForIE(callback);
            });
    
    script.src = src;
    document.getElementsByTagName("head")[0].appendChild(script);
}

importScript.callbackForIE = function(callback){
    var target = window.event.srcElement;
    if (target.readyState == "loaded" || target.readyState == "complete") 
        callback.call(target);
};


