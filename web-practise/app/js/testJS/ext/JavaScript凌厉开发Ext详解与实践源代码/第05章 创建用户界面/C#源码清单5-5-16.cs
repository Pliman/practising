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

  private string List(HttpContext context)
  {
    //从node参数中获取父编号
    int id;
    int.TryParse(context.Request.Params["node"],out id);
    //通过LitJson来组织要返回固定格式的Josn数组
    JsonWriter jw = new JsonWriter();
    jw.WriteArrayStart();
    //判断是否正确的编号，如果不是直接返回
    if(id>=0)
    {
      string sql = "select id,name as text,description,parentid from t_tree where parentid=@id";
      string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["dbConnection"].ToString();
      SqlConnection conn = new SqlConnection(connectString);
      SqlCommand cmd = new SqlCommand(sql, conn);
      SqlParameter parameter=cmd.Parameters.Add("id",SqlDbType.Int,32);
      parameter.Value = id;
      conn.Open();
      //从数据库中查询子节点数据
      using (SqlDataReader reader = cmd.ExecuteReader())
      {
        while (reader.Read())
        {
          //写节点
          jw.WriteObjectStart();
          for (int i = 0; i < reader.FieldCount; i++)
          {
            jw.WritePropertyName(reader.GetName(i).ToString());
            jw.Write(reader.GetValue(i).ToString());
          }
          jw.WriteObjectEnd();
        }
      }
      
    }
    jw.WriteArrayEnd();
    return jw.ToString();
  }
}