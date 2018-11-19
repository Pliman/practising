function inherit(Fn,obj) {
    function Child () {
        Fn.apply(this, arguments)
    }

    let newFnObj = Object.create(Fn.prototype)

    Child.prototype = Object.assign(newFnObj, obj) // 不能使用新对象，因为__proto__不会被赋值到新对象上面去
    Child.prototype.constructor = Child

    return Child
}

let animalNum = 0;
function Animal(name) {
    animalNum ++;
    this.name = name;
}
Animal.prototype.getName = function() {
    return this.name;
};
const Cat = inherit(Animal, {
    say() {
        console.log(`NO${animalNum}:${this.getName()}`);
    }
});
const cat1 = new Cat('小花');
cat1.say(); //NO1:小花

