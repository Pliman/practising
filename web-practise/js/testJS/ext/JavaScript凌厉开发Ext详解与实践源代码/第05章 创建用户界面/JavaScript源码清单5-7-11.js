var tpl = new Ext.XTemplate(
    '<p>Name: {name}</p>',
    '<p>Company: {[company.toUpperCase() + ', ' + title]}</p>',
    '<p>Kids: ',
    '<tpl for="kids">',
       '<div class="{[xindex % 2 === 0 ? "even" : "odd"]}">',
        '{name}',
        '</div>',
    '</tpl></p>'
);
tpl.overwrite(panel.body, data); 
