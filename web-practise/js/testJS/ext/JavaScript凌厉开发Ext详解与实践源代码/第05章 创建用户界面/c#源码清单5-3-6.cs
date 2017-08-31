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
      case "save":
        context.Response.Write(Save(context));
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
    //通过LitJson来组织要返回固定格式的Josn数组
    JsonWriter jw = new JsonWriter();
    //判断是否正确的编号，如果不是直接返回
    string sql = @"SELECT id, title, filename, sortorder, 
        createtime, filesize, width, height, classid
            FROM T_DataView order by sortorder";
    string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["dbConnection"].ToString();
    SqlConnection conn = new SqlConnection(connectString);
    SqlCommand cmd = new SqlCommand(sql, conn);
    conn.Open();
    //从数据库中查询子节点数据
    int count=0;
    jw.WriteObjectStart();
    jw.WritePropertyName("rows");
    jw.WriteArrayStart();
    using (SqlDataReader reader = cmd.ExecuteReader())
    {    
      while (reader.Read())
      {
        //写节点
        jw.WriteObjectStart();
        for (int i = 0; i < reader.FieldCount; i++)
        {
            //字段名直接作为JSON标记，可以通过循环直接输出字段
          jw.WritePropertyName(reader.GetName(i));
          //判断字段类型，如果是bit类型需要处理成合适格式
          //如果不处理将返回True或False，JavaScript将不能根据bool类型进行处理
          //日期须以Store中定义格式返回，建议默认格式为"yyyy-MM-dd HH:mm:ss"
          //这样的好处是最后处理可以放到JavaScript中处理而不用频繁更改后台文件
          switch (reader.GetDataTypeName(i))
          {
              case "bit":
                if ((bool)reader.GetValue(i))
                  jw.Write(1);
                else
                  jw.Write(0);
                break;
              break;
            case "datetime":
              DateTime dt = (DateTime)reader.GetValue(i);
              jw.Write(dt.ToString("yyyy-MM-dd HH:mm:ss"));
              break;
            default:
              string s = reader.GetValue(i).ToString();
              jw.Write(s);
              break;
          }
        }
        count++;
        jw.WriteObjectEnd();
      }
    }
    jw.WriteArrayEnd();
    jw.WritePropertyName("results");
    jw.Write(count.ToString());
    jw.WriteObjectEnd();
    return jw.ToString();
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
  private string Save(HttpContext context)
  {
    string sortIndex=context.Request.Params["sortIndex"];
    if ( sortIndex == null) sortIndex="";
    if ( sortIndex == "") return WriteJsonResult("false","错误的顺序");
    string[] idlist = sortIndex.Split(new Char[] { ',' });
    string outputStr="";
    string sql="";
    int i=1;
    foreach (string id in idlist)
    {
      int idd;
      int.TryParse(id.Trim(), out idd);
      if(idd > 0){
          sql+=String.Format("update T_DataView set sortorder={0} where id={1}\n",i,idd);
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
}