function getProperty(obj, key) {
    return obj[key];
}
var x = { a: 1, b: 2, c: 3, 3: 2 };
getProperty(x, "a");
getProperty(x, "3");
// getProperty(x, "d"); error TS2345: Argument of type '"d"' is not assignable to parameter of type '"a" | "b" | "c"
// K extends keyof T 是关键 
