Promise.resolve().then(function() {
    console.log("Promise");
});
process.nextTick(function() {
    console.log("nextTick");
});

