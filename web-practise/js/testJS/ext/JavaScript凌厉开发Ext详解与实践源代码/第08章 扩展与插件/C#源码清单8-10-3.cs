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
      System.Drawing.Image original_image = null;
      HttpPostedFile jpeg_image_upload = context.Request.Files["Filedata"];
      string original_fielname = jpeg_image_upload.FileName.ToLower();
      string extname=original_fielname.Substring(original_fielname.LastIndexOf(".")+1,3);
      if (extname == "gif" | extname == "jpg")
      {
        try
        {
          string path = context.Server.MapPath("./upload");
          jpeg_image_upload.SaveAs(path+"\\"+jpeg_image_upload.FileName);
          outputStr = "{success:true,data:''}";
        }
        catch(Exception e)
        {
          outputStr = string.Format("{{success:false,data:'{0}'}}",e.Message);
        }
        finally
        {
          if (original_image != null) original_image.Dispose();
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
