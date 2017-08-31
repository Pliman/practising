var Dog = (function () {
    function Dog() {
    }
    Dog.prototype.run = function (speed) {
        console.log("run at " + speed);
    };
    return Dog;
}());
var aDog = new Dog();
aDog.run(3);
