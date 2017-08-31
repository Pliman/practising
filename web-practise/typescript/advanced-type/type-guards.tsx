interface Fish {
    swim();
}

interface Bird {
    fly();
}

function isFish(pet: Fish | Bird): pet is Fish {
    return (<Fish>pet).swim !== undefined;
}
