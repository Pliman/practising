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
      case "move":
        context.Response.Write(Move(context));
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
  /// 返回图片数据
  /// </summary>
  /// <param name="context"></param>
  /// <returns></returns>
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
    if(classid==0)classid=-99;
    string orderColumn=context.Request.Params["sort"];
    string orderBy = context.Request.Params["dir"]=="ASC"?"asc":"desc";    
    switch(orderColumn){
        case "id" :
            orderColumn = "id";
            break;
        case "title" :
            orderColumn = "title";
            break;
        case "filename" :
            orderColumn = "filename";
            break;
        case "filesize" :
            orderColumn = "filesize";
            break;
        default:
            orderColumn = "createtime";
            break;
    }
    string filter = context.Request.Params["query"];
    if(filter==null)filter="";
    if(filter=="")
    {
        if (classid == -1) classid = 0;
        filter = (classid==-99)?"":("classid="+classid.ToString());
      }
      else
      {
          filter = filter.Replace("'","''");
          filter = String.Format("title like '%{0}%' or filename like '%{0}%'",filter);
      }
    currentPage = start / pageSize + 1;
    return MyPageList.PageList.getList("t_dataview","id",
      orderColumn + " " + orderBy, 
      " id, title, filename, sortorder,createtime, filesize, width, height, classid",
      pageSize, currentPage, filter);
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
  /// 保存排序信息
  /// </summary>
  /// <param name="context"></param>
  /// <returns></returns>
  private string Move(HttpContext context)
  {
      int classid;
    int.TryParse(context.Request.Params["classid"], out classid);
    if(classid==-1 | classid>0)
    {
        if(classid==-1)classid=0;
        string ids=context.Request.Params["value"];
        if ( ids == null) ids="";
        if ( ids == "") return WriteJsonResult("false","错误的编号");
        string[] idlist = ids.Split(new Char[] { ',' });
        string outputStr="";
        string sql="";
        int i=1;
        foreach (string id in idlist)
        {
          int idd;
          int.TryParse(id.Trim(), out idd);
          if(idd > 0){
              sql+=String.Format("update T_DataView set classid={0} where id={1}\n",classid,idd);
              i++;
          }
          else
          {
                outputStr="false";
                break;          
          }
        }
        if(outputStr=="")
        {
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
            return WriteJsonResult("false","错误的编号");
        }
      }
    else
    {
        return WriteJsonResult("false","错误的类别编号");
    }
  }
}