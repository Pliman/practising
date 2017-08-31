private string Tree()
{
      //节点数据
      string[,] tree ={
                        {"1","节点一"},
                        {"2","节点二"},
                        {"3","节点三"}
                     };
      //创建JsonWriter对象
      JsonWriter jsonwrite = new JsonWriter();
      
      //创建一个数组
      jsonwrite.WriteArrayStart();
      for (int i = 0; i < tree.GetLength(0); i++)
      {
        //创建一个JSON对象
        jsonwrite.WriteObjectStart();
        
        //写标签id与值
        jsonwrite.WritePropertyName("id");
        jsonwrite.Write(tree[i,0]);
        
        //写标签text与值
        jsonwrite.WritePropertyName("text");
        jsonwrite.Write(tree[i,1]);
        
        //结束一个JSON对象
        jsonwrite.WriteObjectEnd();
      }
      //结束写数组
      jsonwrite.WriteArrayEnd();
      //返回JSON格式文本
      return jsonwrite.ToString();   
}