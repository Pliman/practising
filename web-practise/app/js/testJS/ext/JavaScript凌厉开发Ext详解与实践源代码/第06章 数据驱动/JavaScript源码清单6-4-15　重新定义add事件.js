/*
 增加PlantObj类
 */
function PlantObj(){
    this.common = "";
    this.botanical = "";
    this.light = "";
    this.price = "";
    this.availDate = "";
    this.indoor = "";
}
    
function addStoreEvent(store,records,index){
	/*
		第一种组织向服务端组织数据的方式
	*/
	var jsonData = '';
	for(var i = 0 ,ilen = records.length; i <　ilen; i++){
		var plantObj = new PlantObj();
		plantObj.common = records[i].get('common');
		plantObj.botanical = records[i].get('botanical');
		plantObj.light = records[i].get('light');
		plantObj.price = records[i].get('price');
		plantObj.availDate = records[i].get('availDate');
		plantObj.indoor = records[i].get('indoor');
		jsonData = jsonData + Ext.encode(plantObj);
		if(i+1 != ilen) jsonData = jsonData +　",";
	}		
	/*
		第二种组织向服务端组织数据的方式
	*/
	var fields = Plant.prototype.fields;
	var jsonData = '';
	for(var i = 0 ,ilen = records.length; i <　ilen; i++){
		jsonData = jsonData+ '{';
		for(var j = 0, jlen = fields.length; j < jlen; j++){
            var f = fields.items[j].name;
            var v = records[i].get(f);
            jsonData = jsonData +　f +　":" + v;
            if(j+1 != jlen) jsonData = jsonData+ ",";
     	}
     	jsonData = jsonData + '}';
    }	
    
    Ext.Ajax.request({
        url: '/ExtApp/jsonSubmit.do ',
        params: {
            first: "first_test"
        },
        jsonData: jsonData,
        success: function(response, options){
            //获取响应内容   
            var responseData = Ext.decode(response.responseText);
            if (responseData.success == true) {
                Ext.example.msg('提示', '服务端响应添加成功！');
            }
            else {
                Ext.example.msg('提示', '服务端响应添加失败！');
            }
        }
    }); 
}