var tpl = new Ext.XTemplate(
    '<p>Name: {name}</p>',
    '<p>Kids: ',
    '<tpl for="kids">',
        '<tpl if="age &gt; 1">',  // <-- 注意>要被编码
            '<p>{name}</p>',
        '</tpl>',
    '</tpl></p>'
);
tpl.overwrite(panel.body, data); 
