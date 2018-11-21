var protoObj = null

function inherit(Fn, obj) {
    function Child() {
        Fn.apply(this, arguments)
    }

    let newFnObj = Object.create(Fn.prototype) //newFnObj.__proto__ === Fn.prototype
    protoObj = newFnObj

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
    animalNum++;
    this.name = name;
}

Animal.prototype.getName = getName

function getName() {
    return this.name;
};


const Cat = inherit(Animal, {
    say() {
        console.log(`NO${animalNum}:${this.getName()}`);
    }
});

const cat1 = new Cat('小花');
cat1.say()

var protoLikeObj = {
    __proto__: {
        getName: getName
    },
    say() {
        console.log(`NO${animalNum}:${this.getName()}`);
    }
}

console.log(protoLikeObj.isPrototypeOf(cat1))
console.log(protoObj.isPrototypeOf(cat1))
