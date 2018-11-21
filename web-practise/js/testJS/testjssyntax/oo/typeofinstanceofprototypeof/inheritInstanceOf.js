function inherit(Fn,obj) {
    function Child () {
        Fn.apply(this, arguments)
    }

    // let newFnObj = Object.create(Fn.prototype) //newFnObj.__proto__ === Fn.prototype
    // 不从原型链上来
    let newFnObj = {
        __proto__: {
            getName: getName
        }
    }
    console.log(newFnObj.__proto__)
    let createObj = Object.create(Fn.prototype);
    console.log(createObj)

    /////////////
    // object.create也将函数的prototype放到了对象的__proto__属性上
    // newFnObj.__proto__.constructor = Object // 替换构造函数，不起作用，因为newFnObj.__proto__和Fn.prototype指向同一个对象
    // console.log(newFnObj.__proto__ === Fn.prototype)
    /////////////
    Child.prototype = Object.assign(newFnObj, obj) // 不能使用新对象，因为__proto__不会被赋值到新对象上面去
    Child.prototype.constructor = Child

    return Child
}

let animalNum = 0;
function Animal(name) {
    animalNum ++;
    this.name = name;
}
Animal.prototype.getName = getName

function getName () {
    return this.name;
};

const CatLike = inherit(Animal, {
    haha() {
        return this.name + ' haha';
    }
});

const Cat = inherit(CatLike, {
    say() {
        console.log(`NO${animalNum}:${this.getName()}`);
    }
});

const cat1 = new Cat('小花');
cat1.say()

// console.log(cat1.__proto__.__proto__.__proto__ === Animal.prototype)
// console.log(cat1 instanceof Animal)
