var tpl = new Ext.XTemplate('<p>Name: {name}</p>', '<p>Kids: ', '<tpl for="kids">', '<tpl if="this.isGirl(name)">', '<p>Girl: {name} - {age}</p>', '</tpl>', '<tpl if="this.isGirl(name) == false">', '<p>Boy: {name} - {age}</p>', '</tpl>', '<tpl if="this.isBaby(age)">', '<p>{name} is a baby!</p>', '</tpl>', '</tpl></p>', {
    isGirl: function(name){
        return name == 'Sara Grace';
    },
    isBaby: function(age){
        return age < 1;
    }
});
tpl.overwrite(panel.body, data);
