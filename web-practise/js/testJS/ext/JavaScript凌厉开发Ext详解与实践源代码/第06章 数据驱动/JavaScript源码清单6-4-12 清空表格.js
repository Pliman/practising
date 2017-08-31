function clearStoreEvent(store)	{
		var title = "触发 " 
					+　"<font color='#0033FF'>clear</font>" 
					+ " 事件";
		Ext.example.msg(title, "");
}
store.on('clear',clearStoreEvent);