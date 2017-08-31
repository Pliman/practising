function showName(name) {
    var restNames = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        restNames[_i - 1] = arguments[_i];
    }
    console.log("name: " + name + ", restNames: " + restNames.join(" "));
}
showName("Tom", "Jerry", "Lily", "Lucy");
