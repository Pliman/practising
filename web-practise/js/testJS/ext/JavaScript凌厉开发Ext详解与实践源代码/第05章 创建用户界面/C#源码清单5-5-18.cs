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
  /// 保存新节点
  /// </summary>
  /// <param name="context"></param>
  /// <returns></returns>
  private string Add(HttpContext context)
  {
    string name = context.Request.Form["name"];
    if (name == "") return WriteJsonResult("false", "节点名称不能为空");
    string description =context.Request.Form["description"];
    if (description == null) description = "";
    int parentid;
    int.TryParse(context.Request.Form["parentid"],out parentid);
    if (parentid >= 0)
    {
      string sql = "insert into t_tree ([name],description,parentid) values (@name,@description,@parentid)";
      string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["dbConnection"].ToString();
      SqlConnection conn = new SqlConnection(connectString);
      SqlCommand cmd = new SqlCommand(sql, conn);
      SqlParameter parameter = cmd.Parameters.Add("name", SqlDbType.NVarChar, 200);
      parameter.Value = name;
      parameter = cmd.Parameters.Add("description",SqlDbType.NVarChar,255);
      parameter.Value = description;
      parameter = cmd.Parameters.Add("parentid",SqlDbType.Int,32);
      parameter.Value = parentid;
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
      return WriteJsonResult("false","错误的父节点编号");
    }
}