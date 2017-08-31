class Animal {
    height: number;
    run() {
        console.log('Animal run');
    }
}

class Cat extends Animal {
    height = 12;
    private color: string;

    constructor (color: string) {
        super();
        this.color = color;
    }
    
    describe() {
        console.log(`this cat is ${this.height} height, with ${this.color} color`);
    }
}

let cat1 = new Cat('brown');
cat1.describe();
