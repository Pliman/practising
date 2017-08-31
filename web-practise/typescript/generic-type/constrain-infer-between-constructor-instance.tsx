class BeeKeeper {
    hasMask: boolean;
}

class ZooKeeper {
    nametag: string;
}

class Animal {
    constructor(){
        return new Animal();
    }
    numLegs: number;
}

class Bee extends Animal {
    constructor(){
        super();
        return new Bee();
    }

    keeper: BeeKeeper;
}

class Lion extends Animal {
    keeper: ZooKeeper;
}

// function createInstance<A extends Animal>(c: A): A { // c is a A, but A can not new //Cannot use 'new' with an expression whose type lacks a call or construct signature.
function createInstance<A extends Animal>(c: A): A {    
    return new c();
}

createInstance(Lion).keeper.nametag;  // typechecks!
createInstance(Bee).keeper.hasMask;   // typechecks!