private string jsonData(HttpContext context)
{
    string data = context.Request.Params["data"];
    string outputString ="<table>";
    outputString += string.Format("<tr><td>{0}</td><td>{1}</td><td>{2}</td>", "名称", "值", "类型");
    //转换成jsonData
    JsonData jsondata = JsonMapper.ToObject(data);
    outputString += string.Format("<tr><td>{0}</td><td>{1}</td><td>{2}</td>", "name", jsondata["name"].ToString(), jsondata["name"].GetJsonType());
    outputString += string.Format("<tr><td>{0}</td><td>{1}</td><td>{2}</td>", "age", jsondata["age"].ToString(), jsondata["age"].GetJsonType());
    outputString += string.Format("<tr><td>{0}</td><td>{1}</td><td>{2}</td>", "awake", jsondata["awake"].ToString(), jsondata["awake"].GetJsonType());
    outputString += string.Format("<tr><td>{0}</td><td>{1}</td><td>{2}</td>", "n", jsondata["n"].ToString(), jsondata["n"].GetJsonType());
    outputString += string.Format("<tr><td>{0}</td><td>{1}</td><td>{2}</td>", "note", jsondata["note"].ToString(), jsondata["note"].GetJsonType());
    for(int i=0;i<jsondata["note"].Count;i++)
    {
      outputString += string.Format("<tr><td>{0}</td><td>{1}</td><td>{2}</td>", i.ToString(), jsondata["note"][i].ToString(), jsondata["note"][i].GetJsonType());
    }
    return outputString+"</table>";     
}