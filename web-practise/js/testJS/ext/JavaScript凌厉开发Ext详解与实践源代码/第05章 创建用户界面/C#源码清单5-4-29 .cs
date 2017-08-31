<%@ WebHandler Language="C#" Class="tree_action" %>

using System;
using System.Web;
using LitJson;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

public class tree_action : IHttpHandler {
    
  public void ProcessRequest (HttpContext context) {

		string outputStr="";    
    string field = context.Request.Params["field"];    
    if (field == null) field = "";
    switch (field.ToLower())
    {
      case "postcode":
      	int postcode;
      	int.TryParse(context.Request.Params["value"],out postcode);
      	if(postcode<100000 | postcode>999999)
      	{
	        outputStr=WriteJsonResult(true,false,"请输入正确的邮政编码");
      	}
      	else
      	{
  	      outputStr=WriteJsonResult(true,true,"");
      	}
        break;
      case "age":
      	int age;
      	int.TryParse(context.Request.Params["value"],out age);
      	if(age<20 | age>40)
      	{
	        outputStr=WriteJsonResult(true,false,"年龄的范围必须在20到40之间");
      	}
      	else
      	{
  	      outputStr=WriteJsonResult(true,true,"");
      	}
        break;
      default:
        outputStr=WriteJsonResult(true,false,String.Format("“{0}”不是验证字段",field));
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