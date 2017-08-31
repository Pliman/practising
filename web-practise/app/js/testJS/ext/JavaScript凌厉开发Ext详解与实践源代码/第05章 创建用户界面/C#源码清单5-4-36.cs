<%@ WebHandler Language="C#" Class="submit_action" %>

using System;
using System.Web;
using LitJson;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

public class submit_action : IHttpHandler {
    
  public void ProcessRequest (HttpContext context) {      
        string outputStr="";    
        int returnValue;
        int.TryParse(context.Request.Params["returnValue"],out returnValue);
        switch(returnValue){
            case 1:
                outputStr="{success:true,data:{sex:'女',postcode:20000,age:34,role2:'on',control:'on'}}";
                break;
            case 2:
                outputStr="{success:true,data:{sex:'男',postcode:20000,age:34,role1:'on',role3:'on',control:''}}";
                break;
            default:
            outputStr="";
                break;
        }
    context.Response.Write(outputStr);
  }
                                
  public bool IsReusable {
      get {
          return false;
      }
  }

  /// <summary>
  ///  生成指定格式返回数据
  /// 格式为：{success:'操作状态',data:'操作结果信息'}
  /// </summary>
  /// <param name="success">操作成功为“true”，操作出错为“false”</param>
  /// <param name="msg">操作结果信息</param>
  /// <returns></returns>
  private string WriteJsonResult(bool success,bool valid,string msg)
  {
    JsonWriter jw = new JsonWriter();
    jw.WriteObjectStart();
    jw.WritePropertyName("success");
    jw.Write(success);
    jw.WritePropertyName("valid");
    jw.Write(valid);
    jw.WritePropertyName("reason");
    jw.Write(msg);
    jw.WriteObjectEnd();
    return jw.ToString();
  }
}
