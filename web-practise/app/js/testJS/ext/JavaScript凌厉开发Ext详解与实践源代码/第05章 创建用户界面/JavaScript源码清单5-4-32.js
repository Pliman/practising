var myFormPanel=new Ext.form.FormPanel({
   /* FormPanel的定义参数*/
   listeners:{
       scope:this,
       render:function(fp){
           fp.form.waitMsgTarget = fp.getEl();
       }
   }
});
