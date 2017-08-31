interface Animal {
    run(speed: number);
}

class Dog implements Animal {
    run (speed: number) {
        console.log(`run at ${speed}`);
    }
}

let aDog = new Dog();
aDog.run(3);