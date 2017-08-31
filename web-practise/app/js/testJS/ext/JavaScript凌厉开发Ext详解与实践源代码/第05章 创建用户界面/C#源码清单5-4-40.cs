<%@ WebHandler Language="C#" Class="upload" %>

using System;
using System.Web;
using System.Collections;
using System.IO;
using System.Data.Common;
using System.Data;

public class upload : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
      string outputStr = "{success:false,data:''}";
      HttpPostedFile jpeg_image_upload = context.Request.Files["Filedata"];
      string title= context.Request.Form["title"];
      string original_fielname = jpeg_image_upload.FileName.ToLower();
      string extname=original_fielname.Substring(original_fielname.LastIndexOf(".")+1,3);
      if (extname == "gif" | extname == "jpg")
      {
        try
        {
            string path = context.Server.MapPath("./upload");
          DateTime dt = DateTime.Now;
          string newFilename = dt.ToString("yyyyMMddHHmmssfff")+"."+extname;
          jpeg_image_upload.SaveAs(path+"\\"+newFilename);
          outputStr = string.Format("{{success:true,data:'文件“{0}”上传成功，文件名：{1}',file:'{1}'}}",title,newFilename);
        }
        catch(Exception e)
        {
          outputStr = string.Format("{{success:false,data:'{0}'}}",e.Message);
        }
      }
      else
      {
        outputStr = "{success:false,data:'错误的文件类型！'}";
      }
      context.Response.Write(outputStr);
      
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }
}