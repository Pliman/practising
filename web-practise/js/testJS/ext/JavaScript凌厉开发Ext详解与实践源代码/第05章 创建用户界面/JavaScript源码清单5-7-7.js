var tpl = new Ext.XTemplate(
    '<p>Name: {name}</p>',
    '<p>Kids: ',
    '<tpl for="kids">',
        '<tpl if="age > 1">',
            '<p>{name}</p>',
            '<p>Dad: {parent.name}</p>',
        '</tpl>',
    '</tpl></p>'
);
tpl.overwrite(panel.body, data);
