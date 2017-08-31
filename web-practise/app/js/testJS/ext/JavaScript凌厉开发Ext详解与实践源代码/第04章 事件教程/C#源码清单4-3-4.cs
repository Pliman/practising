//C#代码 源自开源项目ExtSharp，一个可以让你以C#的语言编写EXT的界面的项目。
var win = new Ext.Window{   
     Title = "OrderViewer", Layout = Layout.Border,   
     Width = 100, Height = 200,   
     Modal = true, Resizable = false, Closable = false, Draggable = false,   
     Items = new [] { frm, lst }   
};   
    
win.Render += delegate {   
     load(5);   
};   
win.show();