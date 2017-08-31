<%@ WebHandler Language="C#" Class="tree_action" %>

using System;
using System.Web;
using LitJson;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

public class tree_action : IHttpHandler {
    
  public void ProcessRequest (HttpContext context) {
    //根据action进行不同操作
    string act = context.Request.Params["act"];
    if (act == null) act = "";
    switch (act.ToLower())
    {
      case "list":
        context.Response.Write(List(context));
        break;
      case "check":
        context.Response.Write(Check(context));
        break;
      case "edit":
        context.Response.Write(Edit(context));
        break;
      case "del":
        context.Response.Write(Del(context));
        break;
      default:
        context.Response.Write("错误！");
        break;
    }    
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
  private string WriteJsonResult(string success, string msg)
  {
    JsonWriter jw = new JsonWriter();
    jw.WriteObjectStart();
    jw.WritePropertyName("success");
    jw.Write(success);
    jw.WritePropertyName("data");
    jw.Write(msg);
    jw.WriteObjectEnd();
    return jw.ToString();
  }
  
  /// <summary>
  /// 更新排序信息
  /// </summary>
  /// <param name="context"></param>
  /// <returns></returns>
  private string Check(HttpContext context)
  {
    int id;
    int.TryParse(context.Request.Params["id"],out id);
    if (id > 0)
    {
          int sortOrder;
          int.TryParse(context.Request.Params["value"],out sortOrder);
      string sql = "update T_DataView set sortOrder=@sortOrder where id=@id";
      string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["dbConnection"].ToString();
      SqlConnection conn = new SqlConnection(connectString);
      SqlCommand cmd = new SqlCommand(sql, conn);
      SqlParameter parameter = cmd.Parameters.Add("sortOrder", SqlDbType.Int, 32);
      parameter.Value = sortOrder;
      parameter = cmd.Parameters.Add("id",SqlDbType.Int,32);
      parameter.Value = id;
      conn.Open();
      try
      {
        cmd.ExecuteNonQuery();
        return WriteJsonResult("true", "ok");
      }
      catch (Exception e)
      {
        return WriteJsonResult("false", e.Message);
      }
    }
    else
    {
      return WriteJsonResult("false","错误图片编号");
    }
  }

  private string List(HttpContext context)
  {
    int currentPage = 1;
    int pageSize = 10;
    int limit;
    int.TryParse(context.Request.Params["limit"], out limit);
    int start;
    int.TryParse(context.Request.Params["start"], out start);
    int classid;
    int.TryParse(context.Request.Params["classid"], out classid);
    string orderColumn = "createtime";
    string orderBy = "desc";
    if (classid == -1) classid = 0;
    string filter = (classid==-99)?"":("classid="+classid.ToString());
    currentPage = start / pageSize + 1;
    return MyPageList.PageList.getList("t_dataview","id",
      orderColumn + " " + orderBy, 
      " id, title, filename, sortorder,createtime, filesize, width, height, classid",
      pageSize, currentPage, filter);
  }

  private string Edit(HttpContext context)
  {
    int id;
    int.TryParse(context.Request.Params["id"], out id);
    string title = context.Request.Params["value"];
    if (title == null) title = "";
    if (title == "") return WriteJsonResult("false", "请输入图片标题！");
    if (id > 0)
    {
      string sql = "update T_DataView set title=@title where id=@id";
      string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["dbConnection"].ToString();
      SqlConnection conn = new SqlConnection(connectString);
      SqlCommand cmd = new SqlCommand(sql, conn);
      SqlParameter parameter = cmd.Parameters.Add("title", SqlDbType.NVarChar, 200);
      parameter.Value = title;
      parameter = cmd.Parameters.Add("id", SqlDbType.Int, 32);
      parameter.Value = id;
      conn.Open();
      try
      {
        cmd.ExecuteNonQuery();
        return WriteJsonResult("true", "ok");
      }
      catch (Exception e)
      {
        return WriteJsonResult("false", e.Message);
      }
    }
    else
    {
      return WriteJsonResult("false", "错误图片编号");
    }    
  }

  private string Del(HttpContext context)
  {
    string ids=context.Request.Params["value"];
    string idlist = ids.Replace(",","");
    int idtest;
    if (int.TryParse(idlist, out idtest))
    {
      string sql = "delete from t_dataview where id in (" + ids + ")";
      string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["dbConnection"].ToString();
      SqlConnection conn = new SqlConnection(connectString);
      SqlCommand cmd = new SqlCommand(sql, conn);
      conn.Open();
      try
      {
        cmd.ExecuteNonQuery();
        return WriteJsonResult("true", "ok");
      }
      catch (Exception e)
      {
        return WriteJsonResult("false", e.Message);
      }
    }
    else
    {
      return WriteJsonResult("false", "错误图片编号");
    }
  }
}