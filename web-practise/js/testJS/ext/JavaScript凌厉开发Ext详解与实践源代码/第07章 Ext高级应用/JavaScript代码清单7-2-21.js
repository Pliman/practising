//JavaScript代码清单7-2-21
if (!App) 
    App = {};
if (!App.form) 
    App.form = {};
if (!App.data) 
    App.data = {};

// 另外Ext.namespace支持同时声明多个命名空间，如Ext.js的某行源码：
Ext.ns("Ext", "Ext.util", "Ext.grid", "Ext.dd", "Ext.tree", "Ext.data", "Ext.form", "Ext.menu", "Ext.state", "Ext.lib", "Ext.layout", "Ext.app", "Ext.ux");

