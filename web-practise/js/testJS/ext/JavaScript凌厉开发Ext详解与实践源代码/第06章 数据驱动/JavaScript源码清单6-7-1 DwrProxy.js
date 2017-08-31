Ext.data.DwrProxy = function(){
    this.setDwrCall = function(dwrCall){
        this.dwrCall = dwrCall;
    };
    this.getDwrCall = function(){
        return this.dwrCall;
    };
    
    this.setDwrArgs = function(dwrArgs){
        this.dwrArgs = dwrArgs;
    };
    
    this.getDwrArgs = function(){
        return this.dwrArgs;
    };
    
    Ext.data.DwrProxy.superclass.constructor.call(this);
};

Ext.extend(Ext.data.DwrProxy, Ext.data.DataProxy, {
    load: function(params, reader, callback, scope, arg){
        if (this.fireEvent("beforeload", this, params) !== false) {
        
            var delegate = this.loadResponse.createDelegate(this, [reader, callback, scope, arg], 1);
            
            var callParams = new Array();
            
            if (this.dwrArgs) {
                callParams.push(this.dwrArgs);
            }
            for (var name in params) {
                if (!Ext.isEmpty(params[name])) 
                    this.dwrArgs[name] = params[name];
            }
            
            callParams.push(delegate);
            this.dwrCall.apply(this, callParams);
        }
        else {
            callback.call(scope || this, null, arg, false);
        }
    },
    
    loadResponse: function(dwrData, reader, callback, scope, arg){
        var result;
        try {
            result = reader.read(dwrData);
        } 
        catch (e) {
            this.fireEvent("loadexception", this, null, response, e);
            callback.call(scope, null, arg, false);
            return;
        }
        callback.call(scope, result, arg, true);
    },
    update: function(dataSet){
    },
    
    updateResponse: function(dataSet){
    }
});
