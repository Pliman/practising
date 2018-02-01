setTimeout(function() {
    console.log("setTimeout");
}, 0);
Promise.resolve().then(function() {
    console.log("Promise");
});
