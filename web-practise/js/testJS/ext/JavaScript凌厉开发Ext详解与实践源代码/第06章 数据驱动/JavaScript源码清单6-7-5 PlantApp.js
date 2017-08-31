Ext.onReady(function(){
    Ext.QuickTips.init();
    function formatDate(value){
        return value ? value.dateFormat('M d, Y') : '';
    };
    var fm = Ext.form;
    var checkColumn = new Ext.grid.CheckColumn({
        header: "Indoor?",
        dataIndex: 'indoor',
        width: 55
    });
    var top = new Ext.FormPanel({
        labelAlign: 'top',
        frame: true,
        title: '<font size="2">Ext in Action>Ext-Dwr-Spring示例</font>',
        bodyStyle: 'padding:5px 5px 0',
        width: 750,
        items: [{
            layout: 'column',
            items: [{
                columnWidth: .12,
                items: [{
                    xtype: 'label',
                    text: 'Common Name:',
                    width: 100
                }]
            }, {
                columnWidth: .14,
                items: [{
                    xtype: 'textfield',
                    name: 'common',
                    width: 90
                }]
            }, {
                columnWidth: .05,
                items: [{
                    xtype: 'label',
                    text: 'Light:',
                    autoWidth: true
                }]
            }, {
                columnWidth: .1,
                items: [{
                    xtype: 'textfield',
                    name: 'light',
                    width: 60
                }]
            }, {
                columnWidth: .05,
                items: [{
                    xtype: 'label',
                    text: 'Price:',
                    autoWidth: true
                }]
            }, {
                columnWidth: .1,
                items: [{
                    xtype: 'textfield',
                    name: 'price',
                    width: 60
                }]
            }, {
                columnWidth: .07,
                items: [{
                    xtype: 'label',
                    text: 'Available:',
                    autoWidth: true
                }]
            }, {
                columnWidth: .15,
                items: [{
                    xtype: 'datefield',
                    name: 'availDate',
                    width: 100
                }]
            }, {
                columnWidth: .05,
                items: [{
                    xtype: 'label',
                    text: 'indoor:',
                    autoWidth: true
                }]
            }, {
                columnWidth: .06,
                items: [{
                    xtype: 'checkbox',
                    name: 'indoor'
                }]
            }, {
                columnWidth: .1,
                items: [{
                    xtype: 'button',
                    fieldLabel: 'Price',
                    text: 'Search',
                    handler: search
                }]
            }]
        }]
    
    });
    top.render("myform");
    var cm = new Ext.grid.ColumnModel([{
        id: 'common',
        header: "Common Name",
        dataIndex: 'common',
        width: 220,
        editor: new fm.TextField({
            allowBlank: false
        })
    }, {
        header: "Light",
        dataIndex: 'light',
        width: 130,
        editor: new Ext.form.ComboBox({
            typeAhead: true,
            triggerAction: 'all',
            transform: 'light',
            lazyRender: true,
            listClass: 'x-combo-list-small'
        })
    }, {
        header: "Price",
        dataIndex: 'price',
        width: 70,
        align: 'right',
        renderer: 'usMoney',
        editor: new fm.NumberField({
            allowBlank: false,
            allowNegative: false,
            maxValue: 100000
        })
    }, {
        header: "Available",
        dataIndex: 'availability',
        width: 95,
        renderer: formatDate,
        editor: new fm.DateField({
            format: 'm/d/y',
            minValue: '01/01/06',
            disabledDays: [0, 6],
            disabledDaysText: 'Plants are not available on the weekends'
        })
    }, checkColumn]);
    cm.defaultSortable = true;
    
    var Plant = Ext.data.Record.create([{
        name: 'common',
        type: 'string'
    }, {
        name: 'botanical',
        type: 'string'
    }, {
        name: 'light'
    }, {
        name: 'price',
        type: 'float'
    }, {
        name: 'availability',
        type: 'date',
        dateFormat: 'm/d/Y'
    }, {
        name: 'indoor',
        type: 'bool'
    }]);
    
    var myDwrProxy = new Ext.data.DwrProxy();
    
    var PlantObj = function(){
        this.setCommon = function(common){
            this.common = common;
        };
        
        this.getCommon = function(){
            return this.common;
        };
        
        this.setBotanical = function(botanical){
            this.botanical = botanical;
        };
        
        this.getBotanical = function(){
            return this.botanical;
        };
        
        this.setLight = function(light){
            this.light = light;
        };
        
        this.getLight = function(){
            return this.light;
        };
        
        this.setPrice = function(price){
            this.price = price;
        };
        
        this.getPrice = function(){
            return this.price;
        };
        
        this.setAvailability = function(availability){
            this.availability = availability;
        };
        
        this.getAvailability = function(){
            return this.availability;
        };
        
        this.setIndoor = function(indoor){
            this.indoor = indoor;
        };
        
        this.getindoor = function(){
            return this.indoor;
        };
    }
    
    function search(){
        var dwrArgs = top.getForm().getValues();
        myDwrProxy.setDwrArgs(dwrArgs);
        myDwrProxy.setDwrCall(PlantService.queryPlants);
        store.load({
            params: {
                start: 0,
                limit: 30
            }
        });
    }
    
    function savePlant(){
        var plant = new PlantObj();
        plant.setCommon(' Bloodroot');
        myDwrProxy.setDwrArgs(plant);
        myDwrProxy.setDwrCall(PlantService.savePlant);
        store.load();
    }
    
    var store = new Ext.data.Store({
        proxy: myDwrProxy,
        reader: new Ext.data.DwrReader({
            id: 'plantId',
            totalProperty: 'totalSize',
            root: 'results'
        }, Plant),
        sortInfo: {
            field: 'common',
            direction: 'asc'
        },
        remoteSort: true
    });
    
    var grid = new Ext.grid.EditorGridPanel({
        store: store,
        cm: cm,
        renderTo: 'mygrid',
        width: 750,
        height: 400,
        autoExpandColumn: 'common',
        title: '',
        frame: true,
        plugins: checkColumn,
        clicksToEdit: 2,
        sm: new Ext.grid.RowSelectionModel({
            singleSelect: false
        }),
        loadMask: true,
        bbar: new Ext.PagingToolbar({
            pageSize: 30,
            store: store
        })
    });
});

Ext.grid.CheckColumn = function(config){
    Ext.apply(this, config);
    if (!this.id) {
        this.id = Ext.id();
    }
    this.renderer = this.renderer.createDelegate(this);
};

Ext.grid.CheckColumn.prototype = {
    init: function(grid){
        this.grid = grid;
        this.grid.on('render', function(){
            var view = this.grid.getView();
            view.mainBody.on('mousedown', this.onMouseDown, this);
        }, this);
    },
    
    onMouseDown: function(e, t){
        if (t.className && t.className.indexOf('x-grid3-cc-' + this.id) != -1) {
            e.stopEvent();
            var index = this.grid.getView().findRowIndex(t);
            var record = this.grid.store.getAt(index);
            record.set(this.dataIndex, !record.data[this.dataIndex]);
        }
    },
    
    renderer: function(v, p, record){
        p.css += ' x-grid3-check-col-td';
        return '<div class="x-grid3-check-col' + (v ? '-on' : '') + ' x-grid3-cc-' + this.id + '">&#160;</div>';
    }
};
