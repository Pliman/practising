var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Animal = (function () {
    function Animal() {
    }
    Animal.prototype.run = function () {
        console.log('Animal run');
    };
    return Animal;
}());
var Cat = (function (_super) {
    __extends(Cat, _super);
    function Cat(color) {
        var _this = _super.call(this) || this;
        _this.height = 12;
        _this.color = color;
        return _this;
    }
    Cat.prototype.describe = function () {
        console.log("this cat is " + this.height + " height, with " + this.color + " color");
    };
    return Cat;
}(Animal));
var cat1 = new Cat('brown');
cat1.describe();
