function quitHandler(empolyee){ //... 
}

function fireHandler(empolyee){ //... 
}

//实例化Empolyee对象为Mike
var Mike = new Empolyee('Mike');
Mike.on("quit", quitHandler);
Mike.on("fire", quitHandler);
Mike.on("fire", fireHandler);
