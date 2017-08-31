Plant = Ext.data.Record.create([{
    name: 'id',
    mapping: '0',
    type: 'int'
}, {
    name: 'common',
    mapping: '3',
    type: 'string'
}, {
    name: 'botanical',
    mapping: '2',
    type: 'string'
}, {
    name: 'light',
    mapping: '1',
}, {
    name: 'price',
    type: 'float',
    defaultValue: '1.0'
}, {
    name: 'availDate',
    type: 'date',
    dateFormat: 'm/d/Y'
}, {
    name: 'indoor',
    type: 'bool'
}]);
