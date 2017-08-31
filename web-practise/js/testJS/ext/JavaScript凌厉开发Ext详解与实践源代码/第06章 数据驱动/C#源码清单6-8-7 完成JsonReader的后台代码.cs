private string jsonReader(HttpContext context)
{
    string data = context.Request.Params["data"];
    string outputString = "<table>";
    outputString += string.Format("<tr><td>{0}</td><td>{1}</td><td>{2}</td>", "Token", "Value", "Type");
    //转换成jsonData
    JsonReader jsonreader = new JsonReader(data);
    while (jsonreader.Read())
    {
      if(jsonreader.Value==null)
        outputString += string.Format("<tr><td>{0}</td><td>{1}</td><td>{2}</td>", jsonreader.Token, "", "");
      else
        outputString += string.Format("<tr><td>{0}</td><td>{1}</td><td>{2}</td>", jsonreader.Token, jsonreader.Value.ToString(), jsonreader.Value.GetType().ToString());
    }
    return outputString + "</table>";
}