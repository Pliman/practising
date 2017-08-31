var tpl = new Ext.XTemplate(
    '<p>Name: {name}</p>',
    '<p>Kids: ',
    '<tpl for="kids">',
        '<tpl if="age > 1">',
            '<p>{#}: {name}</p>',  // <-- 每一项都加上序号
            '<p>In 5 Years: {age+5}</p>',  // <-- 简单的运算
            '<p>Dad: {parent.name}</p>',
        '</tpl>',
    '</tpl></p>'
);
tpl.overwrite(panel.body, data);
