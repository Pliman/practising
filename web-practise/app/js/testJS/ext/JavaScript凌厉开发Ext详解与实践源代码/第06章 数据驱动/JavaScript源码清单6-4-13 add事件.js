function addStoreEvent(store, records, index){
    var title = "触发 " + "<font color='#0033FF'>add</font>" + "事件";
    var info = "您在记录行号" +
    "<font color='#0033FF'>(" +
    (index + 1) +
    ")add</font>" +
    "了ID为<font color='#0033FF'>" +
    records[0].id +
    "</font>的记录";
    Ext.example.msg(title, info);
}
