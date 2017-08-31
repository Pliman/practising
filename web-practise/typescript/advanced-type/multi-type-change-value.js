function changeValue(input) {
    return input + 'aaa';
}
console.log(changeValue('a'));
var snsoidjf = {
    s: "TOM",
    n: 222
};
function changeObjValue(input) {
    for (var p in input) {
        var v = input[p];
        if (typeof v === 'string') {
            input[p] = v + 'aaa';
        }
    }
    return input;
}
console.log('---------------------');
console.log(changeObjValue(snsoidjf));
