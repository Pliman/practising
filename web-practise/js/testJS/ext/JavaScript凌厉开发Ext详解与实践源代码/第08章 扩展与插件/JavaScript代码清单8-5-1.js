//JavaScript代码清单8-5-1
Ext.namespace('Ext.ux');
//Utility class
if (!Ext.ux.Utility) 
    Ext.ux.Utility = {
    
        isNullOrUndefined: function(obj){
            return (typeof obj == 'undefined' || obj == null);
        },
        isFunction: function(f){
            return typeof f == 'function';
        }
        
    };

Ext.ux.FieldReadOnlyPlugin = function(){

    this.init = function(f){
        f.setReadOnly = function(value){
            if (f.readOnly)//if setted readonly in the Ext way, like in cfg object, do not take any action.
                return;
            f._readOnly = value;
            if (f.rendered) {
                if (Ext.ux.Utility.isNullOrUndefined(f.editable) || f.editable === true) {
                    var el = f.getEl();
                    el.dom.setAttribute('readOnly', value);
                    el.dom.readOnly = value;
                }
            }
            else {
                f.readOnly = value;
            }
        };
        
        if (Ext.ux.Utility.isFunction(f.expand)) 
            f.expand = f.expand.createInterceptor(function(){
                return !f._readOnly;
            });
        if (Ext.ux.Utility.isFunction(f.onTriggerClick)) 
            f.onTriggerClick = f.onTriggerClick.createInterceptor(function(){
                return !f._readOnly;
            });
        if (Ext.ux.Utility.isFunction(f.onClick)) 
            f.onClick = f.onClick.createInterceptor(function(){
                if (f._readOnly) {
                    this.el.dom.checked = f.checked;
                }
                return !f._readOnly;
            });
        if (Ext.ux.Utility.isFunction(f.setValue) && f instanceof Ext.form.Checkbox) 
            f.setValue = f.setValue.createInterceptor(function(){
                return !f._readOnly;
            });
    }
}
