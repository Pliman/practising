private string Grid()
{
      //网格数据
      string[,] grid ={
                       {"1","行一","2008-3-1"},
                       {"2","行二","2008-3-4"},
                       {"3","行三","2008-3-5"},
                     };

      //创建JsonWriter对象
      JsonWriter jsonwrite = new JsonWriter();
      
      //创建JSON对象（外层）
      jsonwrite.WriteObjectStart();
      
      //写标签results与值
      jsonwrite.WritePropertyName("results");
      jsonwrite.Write(grid.GetLength(0));
      
      //写行数据
      jsonwrite.WritePropertyName("rows");
      //创建行数组
      jsonwrite.WriteArrayStart();

      for (int i = 0; i < grid.GetLength(0); i++)
      {
        //创建一个JSON对象（数据行）
        jsonwrite.WriteObjectStart();

        //写标签id与值
        jsonwrite.WritePropertyName("id");
        jsonwrite.Write(grid[i, 0]);

        //写标签title与值
        jsonwrite.WritePropertyName("title");
        jsonwrite.Write(grid[i, 1]);

        //写标签date与值
        jsonwrite.WritePropertyName("date");
        jsonwrite.Write(grid[i, 2]);

        
        //结束一个JSON对象（数据行）
        jsonwrite.WriteObjectEnd();
      }
      
      //结束行数组      
      jsonwrite.WriteArrayEnd();
      //结束JSON对象（外层）     
      jsonwrite.WriteObjectEnd();
      //返回JSON格式文本      
      return jsonwrite.ToString();
}