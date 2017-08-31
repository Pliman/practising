//JavaScript代码清单8-7-2
var mySpinner = new Ext.ux.form.Spinner({
    value: new Date().format('Y-m-d'),
    name: 'date',
    strategy: new Ext.ux.form.Spinner.DateStrategy({
        minValue: '2001-1-1',
        maxValue: '2010-1-1'
    })
});
