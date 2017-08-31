
//JavaScript代码清单11-6-2
var myArray = [1, 19, 3, 20, 18, 29, 40, 34, 13];
myArray.sort(function(x, y){
    if (parseInt(x) > parseInt(y)) 
        return 1
    if (parseInt(x) < parseInt(y)) 
        return -1
});
console.log(myArray);


