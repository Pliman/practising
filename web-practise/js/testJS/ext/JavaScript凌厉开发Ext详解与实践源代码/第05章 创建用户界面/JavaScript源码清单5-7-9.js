var tpl = new Ext.XTemplate(
    '<p>{name}\'s favorite beverages:</p>',
    '<tpl for="drinks">',
       '<div> - {.}</div>',
    '</tpl>'
);
tpl.overwrite(panel.body, data);
