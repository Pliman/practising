using System;
using System.Web;
using LitJson;

//定义一个对象
public class Person
{
  public string Name;
  public int Age;
  public DateTime Birthday;  
}


public class GenericHandler1 : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
      string act = context.Request.Params["act"];
      string outputString = "";
      //根据不同action执行相应操作
      switch (act)
      {
        case "ObjectToJSON":
          outputString = ObjectToJSON();
          break;
        case "JSONToObject":
          outputString = JSONToObject();
          break;
        default:
          outputString = "错误";
          break;
      }
      context.Response.Write(outputString);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

    private string ObjectToJSON()
    {
      Person bill = new Person();

      bill.Name = "测试用户";
      bill.Age = 51;
      bill.Birthday = new DateTime(1564, 4, 26);
      string json_bill = JsonMapper.ToJson(bill);

      return json_bill;
    }

    private string JSONToObject()
    {
      string json = @"
            {
                ""Name""     : ""测试用户"",
                ""Age""      : 57,
                ""Birthday"" : ""02/07/1478 00:00:00""
            }";

      Person thomas = JsonMapper.ToObject<Person>(json);

      return string.Format("测试用户的年龄： {0}",thomas.Age);
    }
}