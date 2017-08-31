var arrayDatas = [[1, '小学'], [2, '初中'], [3, '高中'], [4, '中专'], [5, '大专'], [6, '大学']];

var arrayDatas2 = [[1, '小学'], [2, '初中'], [3, '高中'], [4, '中专'], [5, '大专'], [6, '大学']];

var jsonDatas = {
    results: 6,
    rows: [{
        retrunValue: 1,
        displayText: '小学'
    }, {
        retrunValue: 2,
        displayText: '初中'
    }, {
        retrunValue: 3,
        displayText: '高中'
    }, {
        retrunValue: 4,
        displayText: '中专'
    }, {
        retrunValue: 5,
        displayText: '大专'
    }, {
        retrunValue: 6,
        displayText: '大学'
    }]
};

var simpleStore = new Ext.data.SimpleStore({
    fields: ["retrunValue", "displayText"],
    data: arrayDatas2
});

var jsonStore = new Ext.data.Store({
    data: jsonDatas,
    reader: new Ext.data.JsonReader({
        totalProperty: "results",
        root: "rows",
        id: "id"
    }, [{
        name: 'retrunValue'
    }, {
        name: 'displayText'
    }])
});
