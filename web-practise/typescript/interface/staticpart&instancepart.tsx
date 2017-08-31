interface ClockConstructor {
    new (hour: number, minute: number);
}

class Clock implements ClockConstructor {
    currentTime: Date;
    new : (hour: number, minute: number) => {}
    constructor(h: number, m: number) { }
}