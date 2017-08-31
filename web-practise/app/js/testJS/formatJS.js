var xmldoc;
    try {
        xmldoc = new ActiveXObject("Microsoft.XMLDOM");
        if(!xmldoc) xmldoc = new ActiveXObject("MSXML2.DOMDocument.3.0");
    } catch(e){}
    if(!xmldoc){
        return null;
    } else{
        xmldoc.async = "false";
        xmldoc.loadXML(xmlString);
        if(xmldoc.parseError.errorCode == 0 ){
            return xmldoc;
        } else{
            return null;
        }
    }