var myFormPanel=new Ext.form.FormPanel({
    /* FormPanel的定义参数*/
});
var myWin = new Ext.Window({
    /*window的定义参数*/,
   items: myFormPanel,
   listeners:{
       scope:this,
       render:function(win){
           myFormPanel.form.waitMsgTarget = win.getEl();
       }
   }
});